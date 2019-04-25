# Generated by Django 2.2 on 2019-04-25 17:04

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Subscription',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(choices=[('WN', 'Weekly News'), ('MD', 'Closest Deadlines')], default='MD', max_length=2, unique=True)),
            ],
        ),
    ]
