from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token
from rest_framework import (
    generics,
    status,
    views
)
from rest_framework.response import Response

from todoapp.user.serializers import (
    UserSerializer,
)


class UserCreate(generics.CreateAPIView):
    serializer_class = UserSerializer
    permission_classes = ()
    authentication_classes = ()


class LoginView(views.APIView):
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


class LogoutView(views.APIView):
    def post(self, _):
        Token.objects.filter(key=self.request.auth).delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
