from django.contrib.auth import get_user_model
from django.db import models


class Basket(models.Model):
    title = models.CharField(max_length=50, null=False, blank=False)

    owner = models.ForeignKey(get_user_model(),
                              related_name="owner",
                              blank=False,
                              null=False,
                              on_delete=models.CASCADE)

    def __str__(self):
        return self.title

    def is_owner(self, user):
        return user == self.owner

    class Meta:
        ordering = ('id',)


class Task(models.Model):
    message = models.CharField(max_length=250, null=False, blank=False)
    created = models.DateField(auto_now_add=True)
    deadline = models.DateField(null=True)
    completed = models.BooleanField(default=False)

    basket = models.ForeignKey(Basket, related_name="tasks", on_delete=models.CASCADE, null=False)

    def __str__(self):
        return self.message

    def is_owner(self, user):
        return self.basket.is_owner(user)

    class Meta:
        ordering = ('deadline', 'created',)
