from django.db import models


class Basket(models.Model):
    title = models.CharField(max_length=50, null=False, blank=False)

    def __str__(self):
        return self.title


class Task(models.Model):
    message = models.CharField(max_length=250, null=False, blank=False)
    created = models.DateField(auto_now_add=True)
    deadline = models.DateField(null=True)
    completed = models.BooleanField(default=False)

    basket = models.ForeignKey(Basket, related_name="tasks", on_delete=models.CASCADE, null=False)

    def __str__(self):
        return self.message

    class Meta:
        ordering = ('created',)


