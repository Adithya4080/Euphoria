# Generated by Django 5.1 on 2024-09-20 09:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('web', '0021_remove_order_quantity_order_total_price_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='order',
            name='total_price',
            field=models.DecimalField(decimal_places=2, max_digits=10),
        ),
    ]
