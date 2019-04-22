from django.contrib import admin

from todoapp.basket.models import (
    Task,
    Basket,
)

admin.site.register(Task)
admin.site.register(Basket)
