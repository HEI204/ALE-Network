# Generated by Django 4.0.5 on 2022-11-14 03:37

import datetime
from django.db import migrations, models
from django.utils.timezone import utc


class Migration(migrations.Migration):

    dependencies = [
        ('network', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='comment',
            name='datetime',
            field=models.DateTimeField(default=datetime.datetime(2022, 11, 14, 3, 37, 47, 543503, tzinfo=utc)),
        ),
        migrations.AlterField(
            model_name='post',
            name='datetime',
            field=models.DateTimeField(default=datetime.datetime(2022, 11, 14, 3, 37, 47, 542503, tzinfo=utc)),
        ),
    ]