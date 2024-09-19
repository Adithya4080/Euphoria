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
        product_id = request.data.get('product_id')
        quantity = int(request.data.get('quantity', 1))

        if quantity < 1:
            return Response({'error': 'Quantity must be at least 1'}, status=status.HTTP_400_BAD_REQUEST)

        product = Product.objects.get(id=product_id)
        cart, created = Cart.objects.get_or_create(user=user)

        cart_item, created = CartItem.objects.get_or_create(cart=cart, product=product)
        cart_item.quantity += quantity
        cart_item.save()

        return Response({'message': 'Item added to cart'}, status=status.HTTP_200_OK)
    
    except Product.DoesNotExist:
        return Response({'error': 'Product not found'}, status=status.HTTP_404_NOT_FOUND)


# View Cart
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def view_cart(request):
    user = request.user
    try:
        cart = Cart.objects.get(user=user)
        items = CartItem.objects.filter(cart=cart)

        cart_data = {
            'cart_items': [
                {
                    'product': item.product.name,
                    'quantity': item.quantity,
                    'price': item.product.price,
                    'image': item.product.featured_image.url if item.product.featured_image else None
                }
                for item in items
            ],
            'total_items': sum(item.quantity for item in items),
            'total_price': sum(item.product.price * item.quantity for item in items),  # Total cost
        }

        return Response(cart_data, status=status.HTTP_200_OK)
    except Cart.DoesNotExist:
        return Response({'message': 'Cart is empty'}, status=status.HTTP_404_NOT_FOUND)


# Buy Now / Checkout
from django.utils import timezone

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def checkout(request):
    user = request.user
    try:
        cart = Cart.objects.get(user=user)
        items = CartItem.objects.filter(cart=cart)

        if not items.exists():
            return Response({'error': 'Your cart is empty'}, status=status.HTTP_400_BAD_REQUEST)

        # Create the order
        order = Order.objects.create(user=user, cart=cart, created_at=timezone.now())
        
        # Optionally delete the cart if you want to
        # cart.delete()

        return Response({'message': 'Order placed successfully'}, status=status.HTTP_200_OK)
    except Cart.DoesNotExist:
        return Response({'error': 'Cart does not exist'}, status=status.HTTP_404_NOT_FOUND)



@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def remove_from_cart(request, product_id):
    try:
        # Get the cart for the authenticated user
        cart = Cart.objects.get(user=request.user)
        # Access the cart items using the related name 'cart_items'
        item = cart.cart_items.get(product__id=product_id)
        item.delete()  # Remove the item from the cart
        return Response({'message': 'Item removed from cart'}, status=status.HTTP_204_NO_CONTENT)
    except Cart.DoesNotExist:
        return Response({'error': 'Cart not found'}, status=status.HTTP_404_NOT_FOUND)
    except CartItem.DoesNotExist:
        return Response({'error': 'Item not found in cart'}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def clear_cart(request):
    user = request.user
    try:
        cart = Cart.objects.get(user=user)
        # Delete all cart items associated with this cart
        cart.cart_items.all().delete()
        # Delete the cart itself
        cart.delete()
        return Response({'message': 'Cart cleared successfully'}, status=status.HTTP_204_NO_CONTENT)
    except Cart.DoesNotExist:
        return Response({'error': 'Cart does not exist'}, status=status.HTTP_404_NOT_FOUND)