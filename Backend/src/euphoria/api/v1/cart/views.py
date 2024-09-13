from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from web.models import Cart, CartItem, Order, Product

from rest_framework import status
from rest_framework.exceptions import NotFound

@api_view(['POST'])
def add_to_cart(request):
    try:
        user = request.user
        if not user.is_authenticated:
            return Response({'error': 'User not authenticated'}, status=status.HTTP_401_UNAUTHORIZED)
        
        product_id = request.data.get('product_id')
        quantity = request.data.get('quantity', 1)

        product = Product.objects.get(id=product_id)
        cart, created = Cart.objects.get_or_create(user=user)

        cart_item, created = CartItem.objects.get_or_create(cart=cart, product=product)
        cart_item.quantity += int(quantity)
        cart_item.save()

        return Response({'message': 'Item added to cart'}, status=status.HTTP_200_OK)
    
    except Product.DoesNotExist:
        return Response({'error': 'Product not found'}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        # Log the error or handle it appropriately
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


# View Cart
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def view_cart(request):
    user = request.user
    cart = Cart.objects.get(user=user)
    items = CartItem.objects.filter(cart=cart)
    
    cart_data = {
        'cart_items': [{'product': item.product.name, 'quantity': item.quantity} for item in items],
        'total_items': sum(item.quantity for item in items),
    }
    
    return Response(cart_data)

# Buy Now / Checkout
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def checkout(request):
    user = request.user
    cart = Cart.objects.get(user=user)
    order = Order.objects.create(user=user, cart=cart)
    
    # Clear the cart after ordering
    cart.delete()
    
    return Response({'message': 'Order placed successfully'})
