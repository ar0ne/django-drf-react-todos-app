from django.db import models

WEEKLY_NEWS = "WN"
CLOSEST_DEADLINES = "MD"


class Subscription(models.Model):
    SUBSCRIPTIONS = (
        (WEEKLY_NEWS, "Weekly News"),
        (CLOSEST_DEADLINES, "Closest Deadlines"),
    )

    name = models.CharField(max_length=2,
                            unique=True,
                            choices=SUBSCRIPTIONS,
                            default=CLOSEST_DEADLINES
    )

    def __str__(self):
        return self.get_name_display()

