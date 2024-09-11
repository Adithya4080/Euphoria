from django.urls import path
from api.v1.cart import views    

urlpatterns = [
    path('add/<int:product_id>/', views.add_to_cart, name='add_to_cart'),
    path('remove/<int:product_id>/', views.remove_from_cart, name='remove_from_cart'),
    path('view/', views.view_cart, name='view_cart'),
    path('orders/create/', views.create_order, name='create_order'),
]
    