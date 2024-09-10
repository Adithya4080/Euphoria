from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework import status


from django.shortcuts import get_object_or_404
from django.http import JsonResponse

from api.v1.euphoria.serializers import CategorySerializer, ProductSerializer, OrderSerializer
from web.models import Category, Product, Cart, CartItem, Order


@api_view(["GET"])
@permission_classes([AllowAny])
def category(request):
    instances = Category.objects.filter(is_deleted=False)

    context = {
        "request":request
    }

    serializer = CategorySerializer(instances, many=True, context=context)
    response_data = {
        "status_code" : 6000,
        "data" : serializer.data
    }

    return Response(response_data)


@api_view(["GET"])
@permission_classes([AllowAny])
def product(request, pk):
    if Product.objects.filter(pk=pk).exists():
        instance = Product.objects.get(pk=pk)

        context = {
            "request":request
        }

        serializer = ProductSerializer(instance, context=context)
        response_data = {
            "status_code" : 6000,
            "data" : serializer.data
        }

        return Response(response_data)
    
    else:
        response_data = {
            "status_code" : 6001,
            "message": "Does Not Exist"
        }

        return Response(response_data)
    

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def protected(request, pk):
    if Product.objects.filter(pk=pk).exists():
        instance = Product.objects.get(pk=pk)

        context = {
            "request":request
        }

        serializer = ProductSerializer(instance, context=context)
        response_data = {
            "status_code" : 6000,
            "data" : serializer.data
        }

        return Response(response_data)
    
    else:
        response_data = {
            "status_code" : 6001,
            "message": "Does Not Exist"
        }

        return Response(response_data)
    

@api_view(["GET"])
@permission_classes([AllowAny])
def categories_by_gender(request, gender_id):
    categories = Category.objects.filter(gender_id=gender_id, is_deleted=False)
    context = {
        "request": request
    }
    serializer = CategorySerializer(categories, context=context, many=True)
    response_data = {
        "status_code": 6000,
        "data": serializer.data
    }
    return Response(response_data)


@api_view(["GET"])
@permission_classes([AllowAny])
def products_by_category(request, category_id):
    try:
        category = Category.objects.get(id=category_id)
    except Category.DoesNotExist:
        return Response({
            "status_code": 6001,
            "message": "Category not found"
        })

    products = Product.objects.filter(category=category, is_deleted=False)
    context = {
        "request": request
    }
    
    serializer = ProductSerializer(products, context=context, many=True)

    response_data = {
        "status_code": 6000,
        "category_name": category.name,  
        "data": serializer.data
    }

    return Response(response_data)


@api_view(["GET"])
@permission_classes([AllowAny])
def similar_products_by_category(request, category_id, exclude_product_id):
    try:
        # Fetch products with the same category, excluding the current one
        products = Product.objects.filter(category_id=category_id, is_deleted=False).exclude(id=exclude_product_id)

        # Check if products exist
        if not products.exists():
            return Response({
                "status_code": 6001,
                "message": "No similar products found"
            }, status=status.HTTP_404_NOT_FOUND)

        # Serialize products
        serializer = ProductSerializer(products, many=True, context={"request": request})

        return Response({
            "status_code": 6000,
            "products": serializer.data
        }, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({
            "status_code": 6001,
            "error": str(e)
        }, status=status.HTTP_400_BAD_REQUEST)


@api_view(["GET"])
@permission_classes([IsAuthenticated])  # Ensure only logged-in users can access
def protected_category_products(request, category_id):
    try:
        category = Category.objects.get(id=category_id)
    except Category.DoesNotExist:
        return Response({
            "status_code": 6001,
            "message": "Category not found"
        })

    products = Product.objects.filter(category=category, is_deleted=False)
    context = {
        "request": request
    }

    serializer = ProductSerializer(products, context=context, many=True)

    response_data = {
        "status_code": 6000,
        "category_name": category.name,
        "data": serializer.data
    }

    return Response(response_data)


@api_view(['POST'])
@permission_classes([AllowAny])
def add_to_cart(request, product_id):
    product = get_object_or_404(Product, pk=product_id)
    cart, created = Cart.objects.get_or_create(user=request.user)
    
    # Check if the product is already in the cart
    cart_item, created = CartItem.objects.get_or_create(cart=cart, product=product)
    
    if not created:
        cart_item.quantity += 1  # Increment the quantity if the item already exists
    cart_item.save()
    
    return Response({"status_code": 6000, "message": "Product added to cart"})


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def remove_from_cart(request, product_id):
    cart = get_object_or_404(Cart, user=request.user)
    cart_item = get_object_or_404(CartItem, cart=cart, product_id=product_id)
    
    cart_item.delete()
    
    return Response({"status_code": 6000, "message": "Product removed from cart"})


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def view_cart(request):
    cart = get_object_or_404(Cart, user=request.user)
    cart_items = cart.items.all()

    cart_data = {
        "user": request.user.username,
        "items": [
            {
                "product": item.product.name,
                "quantity": item.quantity,
                "price": item.product.price,
                "total_price": item.total_price(),
            }
            for item in cart_items
        ],
        "total_price": sum(item.total_price() for item in cart_items),
    }
    
    return Response({"status_code": 6000, "cart": cart_data})

import logging

logger = logging.getLogger(__name__)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_order(request):
    user = request.user
    product_id = request.data.get('product_id')
    quantity = request.data.get('quantity')
    size = request.data.get('size')
    
    logger.info(f"Received order request: {request.data}")

    if not product_id or not quantity or not size:
        return Response({'status_code': 6001, 'message': 'Invalid data provided'}, status=status.HTTP_400_BAD_REQUEST)
    
    try:
        product = Product.objects.get(id=product_id)
        order = Order.objects.create(user=user, product=product, quantity=quantity, size=size)
        logger.info(f"Order created successfully: {order.id}")
        return Response({'status_code': 6000, 'message': 'Order created successfully', 'order_id': order.id}, status=status.HTTP_201_CREATED)
    except Product.DoesNotExist:
        logger.error("Product not found: %s", product_id)
        return Response({'status_code': 6002, 'message': 'Product not found'}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        logger.error("Error creating order: %s", str(e))
        return Response({'status_code': 6003, 'message': 'Internal server error'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
