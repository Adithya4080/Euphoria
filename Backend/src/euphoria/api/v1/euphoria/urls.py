from django.urls import path
from api.v1.euphoria import views

urlpatterns = [
    path('', views.category),
    path('view/<int:pk>', views.product),
    path('protected/<int:pk>', views.protected),
    path('gender/<int:gender_id>', views.categories_by_gender), 
    path('products/category/<int:category_id>/', views.products_by_category),
    path('products/<int:category_id>/', views.similar_products_by_category)
]