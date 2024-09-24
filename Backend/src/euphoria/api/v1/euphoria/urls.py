from django.urls import path
from api.v1.euphoria import views
from django.conf.urls.static import static
from django.conf import settings

urlpatterns = [
    path('', views.category),
    path('view/<int:pk>', views.product),
    path('protected/<int:pk>', views.protected),
    path('gender/<int:gender_id>', views.categories_by_gender), 
    path('products/category/<int:category_id>/', views.products_by_category),
    path('products/protected/<int:category_id>/', views.protected_category_products),
    path('similar/<int:category_id>/', views.similar_products_by_category),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)