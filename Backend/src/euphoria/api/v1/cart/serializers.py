from web.models import Order
from rest_framework import serializers


class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ('user', 'product_id', 'quantity', 'size', 'created_at')
        extra_kwargs = {
            'user': {'required': False},
            'created_at': {'required': False},
        }