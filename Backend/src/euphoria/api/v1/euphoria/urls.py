from django.urls import path
from api.v1.euphoria import views

urlpatterns = [
    path('', views.category),
    path('view/<int:pk>', views.product),
    path('protected/<int:pk>', views.protected),
    path('gender/<int:gender_id>', views.categories_by_gender), 
    path('products/category/<int:category_id>/', views.products_by_category),
    path('products/protected/<int:category_id>/', views.protected_category_products),
    path('products/<int:category_id>/', views.similar_products_by_category),
    path('cart/add/<int:product_id>/', views.add_to_cart, name='add_to_cart'),
    path('cart/remove/<int:product_id>/', views.remove_from_cart, name='remove_from_cart'),
    path('cart/', views.view_cart, name='view_cart'),
    path('orders/create/', views.create_order, name='create_order'),

]