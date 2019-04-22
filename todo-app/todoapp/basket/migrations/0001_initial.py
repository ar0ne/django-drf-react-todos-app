# Generated by Django 2.2 on 2019-04-22 14:55

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Basket',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=50)),
                ('owner', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='owner', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Task',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('message', models.CharField(max_length=250)),
                ('created', models.DateField(auto_now_add=True)),
                ('deadline', models.DateField(null=True)),
                ('completed', models.BooleanField(default=False)),
                ('basket', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='tasks', to='basket.Basket')),
            ],
            options={
                'ordering': ('created',),
            },
        ),
    ]
