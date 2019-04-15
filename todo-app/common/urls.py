from django.urls import path
from . import views
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register('basket', views.BasketViewSet, base_name='basket')

urlpatterns = [
    path('basket/<int:pk>/add/', views.CreateTask.as_view(), name="add-task"),
    path('basket/<int:pk>/tasks/', views.TaskList.as_view(), name='task-list'),
    path('basket/<int:basket_id>/tasks/<int:pk>/', views.TaskDetails.as_view(), name='task-details'),
]

urlpatterns += router.urls
