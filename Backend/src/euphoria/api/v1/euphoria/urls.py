from django.urls import path
from api.v1.euphoria import views

urlpatterns = [
    path('', views.category),
    path('view/<int:pk>', views.product),
    path('protected/<int:pk>', views.protected)
]