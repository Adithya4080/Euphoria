# Generated by Django 5.1 on 2024-09-24 05:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('web', '0023_order_status_alter_order_cart'),
    ]

    operations = [
        migrations.AddField(
            model_name='orderitem',
            name='price',
            field=models.DecimalField(decimal_places=2, max_digits=10, null=True),
        ),
    ]
