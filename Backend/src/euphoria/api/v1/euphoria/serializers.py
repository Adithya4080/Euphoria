from rest_framework.serializers import ModelSerializer
from web.models import Category, Product, Gallery
from rest_framework import serializers


class CategorySerializer(ModelSerializer):
    class Meta:
        fields = ("id", "name", "image")
        model = Category

class GallerySerializer(ModelSerializer):
    class Meta:
        fields = ("id", "image")
        model = Gallery

class ProductSerializer(ModelSerializer):
    category = serializers.SerializerMethodField()
    size = serializers.SerializerMethodField()
    gallery = serializers.SerializerMethodField()

    class Meta:
        fields = ("id", "name", "featured_image", "description","brand", "price", "size","ratings", "category", "gallery", "quantity")
        model = Product

    def get_category(self, instance):
        return instance.category.name
    
    def get_size(self, instance):
        return list(instance.size.values_list('name', flat=True))
    
    def get_gallery(self, instance):
        request = self.context.get("request")
        images = Gallery.objects.filter(name=instance)
        serializers = GallerySerializer(images, many=True, context={"request":request})
        return serializers.data
    
    def to_representation(self, instance):
        representation = super().to_representation(instance)
        return representation

    def get_featured_image(self, obj):
        request = self.context.get('request')
        image_url = obj.featured_image.url
        return request.build_absolute_uri(image_url)
    

