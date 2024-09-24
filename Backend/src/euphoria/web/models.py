from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone


class Gender(models.Model):
    name = models.CharField(max_length=50, unique=True)

    class Meta:
        db_table = "web_gender"
        verbose_name_plural = "gender"

    def __str__(self):
        return self.name
    

class Category(models.Model):
    name = models.CharField(max_length=200)
    image = models.ImageField(upload_to='category/images', null=True, blank=True)
    gender = models.ForeignKey(Gender, on_delete=models.CASCADE, related_name='categories', default=1)
    is_deleted = models.BooleanField(default=False)

    class Meta:
        db_table = "web_category"
        verbose_name_plural = "categories"

    def __str__(self):
        return self.name
    

class Size(models.Model):
    name = models.CharField(max_length=2)

    class Meta:
        db_table = "web_size"
        verbose_name_plural = "sizes"

    def __str__(self):
        return self.name
    

class Product(models.Model):
    name = models.CharField(max_length=200)
    brand = models.CharField(max_length=100)
    featured_image = models.ImageField(upload_to="product/images/")
    price = models.FloatField(default=0.0)
    ratings = models.FloatField(default=0.0)
    description = models.TextField()
    is_deleted = models.BooleanField(default=False)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    size = models.ManyToManyField(Size)
    quantity = models.IntegerField(default=1)

    class Meta:
        db_table = "web_product"

    def __str__(self):
        return self.name


class Gallery(models.Model):
    name = models.ForeignKey("web.product", on_delete=models.CASCADE)
    image = models.ImageField(upload_to="product/images/")

    class Meta:
        db_table = "web_gallery"
        verbose_name_plural = "gallery"

    def __str__(self):
        return str(self.id)


class Specification(models.Model):
    product = models.ForeignKey(Product, related_name='specifications', on_delete=models.CASCADE)
    key = models.CharField(max_length=100)
    value = models.CharField(max_length=100)

    class Meta:
        db_table = "web_specification"
        verbose_name_plural = "specifications"

    def __str__(self):
        return f"{self.key}: {self.value}"
    

class Cart(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='cart')
    created_at = models.DateTimeField(default=timezone.now, editable=False)

    def __str__(self):
        return f"Cart of {self.user.username}"
    

class CartItem(models.Model):
    cart = models.ForeignKey(Cart, on_delete=models.CASCADE, related_name='cart_items')
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)

    def __str__(self):
        return f"{self.product.name} ({self.quantity})"
    

class Order(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='orders')
    cart = models.OneToOneField(Cart, on_delete=models.SET_NULL, null=True, blank=True, related_name='order')
    total_price = models.DecimalField(max_digits=10, decimal_places=2, null=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Order {self.id} by {self.user.username}"

    

class OrderItem(models.Model):
    order = models.ForeignKey(Order, related_name='order_items', on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)
    price = models.DecimalField(max_digits=10, decimal_places=2,null=True)

    def __str__(self):
        return f"{self.product.name} (Quantity: {self.quantity})"

    class Meta:
        db_table = "web_order_item"
