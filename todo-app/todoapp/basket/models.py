from django.utils import timezone
from django.contrib.auth import get_user_model
from django.db import models


class BasketManager(models.Manager):
    def get_queryset(self):
        return super().get_queryset()\
            .prefetch_related('tasks')


class Basket(models.Model):
    title = models.CharField(max_length=50, null=False, blank=False)

    owner = models.ForeignKey(get_user_model(),
                              related_name="baskets",
                              blank=False,
                              null=False,
                              on_delete=models.CASCADE)

    objects = BasketManager()

    def is_owner(self, user):
        return user == self.owner

    class Meta:
        ordering = ('id',)

    def __str__(self):
        return "%s (%s)" % (
            self.title,
            ', '.join(t.message for t in self.tasks.all())
        )

    @staticmethod
    def get_tasks_for_user_with_deadline_until(user_id, until_date=None):
        """"
            Returns flat list of task ids from all baskets for appropriate user which are:
              - not completed
              - deadline date specified
              - deadline date before *until_date*
        """
        if not until_date:
            until_date = timezone.now()
        baskets = Basket.objects\
            .filter(owner=user_id)\
            .exclude(tasks__isnull=True)

        task_ids = set()
        for basket in baskets:
            filtered_tasks = basket.tasks\
                .exclude(completed=True)\
                .filter(deadline__lte=until_date)\
                .distinct()\
                .values_list('id', flat=True)
            task_ids.update(list(filtered_tasks))
        return list(task_ids)


class Task(models.Model):
    message = models.CharField(max_length=250, null=False, blank=False)
    created = models.DateField(auto_now_add=True)
    deadline = models.DateField(null=True, blank=True)
    completed = models.BooleanField(default=False)

    basket = models.ForeignKey(Basket,
                               related_name="tasks",
                               on_delete=models.CASCADE,
                               null=False)

    def __str__(self):
        return "%s | %s | %s" % (
            str(self.deadline),
            self.completed,
            self.message,
        )

    def is_owner(self, user):
        return self.basket.is_owner(user)

    class Meta:
        ordering = ('deadline', 'created',)
