from django.contrib.auth import authenticate
from rest_framework import (
    generics,
    status,
    viewsets,
)
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.authtoken.models import Token
from rest_framework.permissions import IsAuthenticated

from .models import (
    Basket,
    Task,
)
from .serializers import (
    BasketSerializer,
    TaskSerializer,
    UserSerializer,
)
from .permissions import (
    IsAuthenticatedOwnerOrStaff,
)


class BasketViewSet(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticated, IsAuthenticatedOwnerOrStaff,)
    queryset = Basket.objects.all()
    serializer_class = BasketSerializer

    def create(self, request, *args, **kwargs):
        data = request.data
        data.update({'owner': request.user.id})
        return super().create(request, *args, **kwargs)


class CreateTask(APIView):
    permission_classes = (IsAuthenticated, IsAuthenticatedOwnerOrStaff,)

    def post(self, request, pk):
        data = request.data
        data.update({'basket': pk})
        serializer = TaskSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class TaskList(generics.ListAPIView):
    permission_classes = (IsAuthenticated, IsAuthenticatedOwnerOrStaff,)

    def get_queryset(self):
        basket_id = self.kwargs['pk']
        return Task.objects.filter(basket_id=basket_id)
    serializer_class = TaskSerializer


class TaskDetails(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (IsAuthenticated, IsAuthenticatedOwnerOrStaff,)
    serializer_class = TaskSerializer

    def get_queryset(self):
        basket_id = self.kwargs['basket_id']
        task_id = self.kwargs['pk']
        return Task.objects.filter(basket_id=basket_id, pk=task_id)


class UserCreate(generics.CreateAPIView):
    serializer_class = UserSerializer
    permission_classes = ()
    authentication_classes = ()


class LoginView(APIView):
    permission_classes = ()
    authentication_classes = ()

    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        user = authenticate(username=username, password=password)
        if user:
            if not hasattr(user, 'auth_token') or user.auth_token is None:
                Token.objects.create(user=user)
            return Response({'token': user.auth_token.key})
        else:
            return Response({'error': "Wrong credentials."}, status=status.HTTP_403_FORBIDDEN)


class LogoutView(APIView):
    def post(self, _):
        Token.objects.filter(key=self.request.auth).delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
