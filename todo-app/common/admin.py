from django.contrib import admin

from .models import (
    Task,
    Basket,
)

admin.site.register(Task)
admin.site.register(Basket)
