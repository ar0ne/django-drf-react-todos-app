from rest_framework import serializers

from .models import (
    Task,
    Basket,
)


class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = ('id', 'message', 'created', 'deadline', 'completed', )


class BasketSerializer(serializers.ModelSerializer):
    tasks = TaskSerializer(many=True, read_only=True)

    class Meta:
        model = Basket
        fields = '__all__'

