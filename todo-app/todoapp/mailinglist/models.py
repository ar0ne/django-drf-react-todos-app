import uuid

from django.db import models
from django.db.models import CASCADE

WEEKLY_NEWS = "WN"
CLOSEST_DEADLINES = "MD"


class Subscription(models.Model):
    SUBSCRIPTIONS = (
        (WEEKLY_NEWS, "Weekly News"),
        (CLOSEST_DEADLINES, "Closest Deadlines"),
    )

    name = models.CharField(primary_key=True,
                            max_length=2,
                            unique=True,
                            choices=SUBSCRIPTIONS,
                            default=CLOSEST_DEADLINES
    )

    def __str__(self):
        return self.get_name_display()


class Message(models.Model):
    id = models.UUIDField(primary_key=True,
                          default=uuid.uuid4,
                          editable=False,
                          unique=True)
    subject = models.CharField(max_length=140)
    body = models.TextField()
    created = models.DateTimeField(default=None, null=True)
    recipient = models.ForeignKey('user.Profile',
                                  on_delete=CASCADE,
                                  related_name="messages")
    sent = models.BooleanField(default=False)

    def __str__(self):
        return '%s-%s (%s)' % (
            self.subject, self.recipient, self.sent
        )

    class Meta:
        unique_together = ['id', 'created']
        ordering = ('created',)
