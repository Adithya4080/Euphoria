from django.contrib import admin
from web.models import Product, Category, Gallery , Gender, Size, Specification, Cart, CartItem, Order


class GalleryAdmin(admin.TabularInline):
    list_display = ["product", "image"]
    model = Gallery

class SpecificationInline(admin.TabularInline):
    model = Specification
    extra = 1

class CategoryAdmin(admin.ModelAdmin):
    list_display = ["name", "gender"]
    list_filter = ["gender"]
    search_fields = ["name"]

class ProductAdmin(admin.ModelAdmin):
    list_display = ["name", "category", "category__gender"]
    list_filter = ["category", "category__gender"]
    search_fields = ["name", "category__name", "category__gender__name"]
    inlines = [GalleryAdmin, SpecificationInline]

class CartItemInline(admin.TabularInline):
    model = CartItem

class CartAdmin(admin.ModelAdmin):
    inlines = [CartItemInline]

class OrderAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'cart', 'created_at')
    search_fields = ('user__username',)

admin.site.register(Product, ProductAdmin)

admin.site.register(Category)
admin.site.register(Gender)
admin.site.register(Size)
admin.site.register(Cart, CartAdmin)
admin.site.register(Order, OrderAdmin)