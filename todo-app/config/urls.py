from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('todoapp.basket.urls')),
    path('api/', include('todoapp.user.urls')),
    path('', include('frontend.urls')),
]
