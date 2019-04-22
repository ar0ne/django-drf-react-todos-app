from django.urls import path
from todoapp.frontend import views

urlpatterns = [
    path('', views.index)
]