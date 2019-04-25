from rest_framework import (
    generics,
    status,
    viewsets,
    views,
)
from rest_framework.response import Response

from todoapp.basket.models import (
    Basket,
    Task,
)
from todoapp.basket.serializers import (
    BasketSerializer,
    TaskSerializer,
)
from todoapp.basket.permissions import (
    IsAuthenticatedOwnerOrStaff,
)


class BasketViewSet(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticatedOwnerOrStaff,)
    serializer_class = BasketSerializer

    def create(self, request, *args, **kwargs):
        data = request.data
        data.update({'owner': request.user.id})
        return super().create(request, *args, **kwargs)

    def get_queryset(self):
        if self.request.user.is_staff:
            return Basket.objects.all()
        return Basket.objects.filter(owner=self.request.user)


class CreateTask(views.APIView):
    permission_classes = (IsAuthenticatedOwnerOrStaff,)

    def post(self, request, pk):
        data = request.data
        data.update({'basket': pk})
        serializer = TaskSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class TaskList(generics.ListAPIView):
    permission_classes = (IsAuthenticatedOwnerOrStaff,)
    serializer_class = TaskSerializer

    def get_queryset(self):
        basket_id = self.kwargs['pk']
        return Task.objects.filter(basket_id=basket_id)


class TaskDetails(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (IsAuthenticatedOwnerOrStaff,)
    serializer_class = TaskSerializer

    def get_queryset(self):
        basket_id = self.kwargs['basket_id']
        task_id = self.kwargs['pk']
        return Task.objects.filter(basket_id=basket_id, pk=task_id)

