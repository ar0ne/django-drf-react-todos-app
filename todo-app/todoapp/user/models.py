from django.contrib.auth import get_user_model
from django.db import models
from django.db.models import CASCADE

from todoapp.mailinglist.models import Subscription

user_model = get_user_model()


class ProfileManager(models.Manager):
    def get_queryset(self):
        return super().get_queryset()

    def all_with_subscriptions(self):
        return self.get_queryset()\
            .exclude(subscriptions=None)

    def all_subscribed_to(self, subscription_id):
        return self.all_with_subscriptions()\
            .filter(subscriptions__id=subscription_id)


class Profile(models.Model):
    user = models.OneToOneField(user_model, on_delete=CASCADE)

    # extend user model by extra fields
    subscriptions = models.ManyToManyField(Subscription,
                                           related_name="subscriptions",
                                           null=True,
                                           blank=True)

    def has_subscriptions(self):
        return self.subscriptions.count() > 0

    def __str__(self):
        return self.user.__str__()

    objects = ProfileManager()

