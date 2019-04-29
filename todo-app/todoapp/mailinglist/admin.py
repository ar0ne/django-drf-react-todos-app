from django.contrib import admin
from todoapp.mailinglist.models import (
    Subscription,
    Message
)

admin.site.register(Subscription)
admin.site.register(Message)
