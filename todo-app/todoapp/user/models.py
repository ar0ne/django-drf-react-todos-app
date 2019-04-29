from django.contrib.auth import get_user_model
from django.db import models
from django.db.models import CASCADE

user_model = get_user_model()


class ProfileManager(models.Manager):
    def get_queryset(self):
        return super().get_queryset()\
            .prefetch_related('subscriptions')

    def all_with_any_subscriptions(self):
        return self.get_queryset()\
            .exclude(subscriptions=None)

    def all_subscribed_to(self, subscription):
        return self.all_with_any_subscriptions()\
            .filter(subscriptions=subscription)

    def all_with_prefetch_baskets(self):
        return self.get_queryset()\
            .prefetch_related('baskets')


class Profile(models.Model):
    user = models.OneToOneField(user_model,
                                on_delete=CASCADE,
                                to_field='id',
                                related_name='profile',
                                primary_key=True)

    # extend user model by extra fields
    subscriptions = models.ManyToManyField('mailinglist.Subscription',
                                           related_name="subscribers",
                                           blank=True)
    objects = ProfileManager()

    def has_subscriptions(self):
        return self.subscriptions.count() > 0

    def __str__(self):
        return self.user.__str__()

    class Meta:
        ordering = ('user_id',)


