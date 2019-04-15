from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import (
    Basket,
    Task,
)
from .serializers import (
    BasketSerializer,
    TaskSerializer,
)
from rest_framework import viewsets


class BasketViewSet(viewsets.ModelViewSet):
    queryset = Basket.objects.all()
    serializer_class = BasketSerializer


class CreateTask(APIView):

    def post(self, request, pk):
        data = request.data
        data.update({'basket': pk})
        serializer = TaskSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class TaskList(generics.ListAPIView):
    def get_queryset(self):
        basket_id = self.kwargs['pk']
        return Task.objects.filter(basket_id=basket_id)
    serializer_class = TaskSerializer


class TaskDetails(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = TaskSerializer
    def get_queryset(self):
        basket_id = self.kwargs['basket_id']
        task_id = self.kwargs['pk']
        return Task.objects.filter(basket_id=basket_id, pk=task_id)