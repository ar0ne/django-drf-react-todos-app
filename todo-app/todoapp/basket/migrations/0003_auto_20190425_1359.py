# Generated by Django 2.2 on 2019-04-25 13:59

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('basket', '0002_auto_20190424_1013'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='task',
            options={'ordering': ('deadline', 'created')},
        ),
    ]
