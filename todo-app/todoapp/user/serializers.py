from django.contrib.auth import get_user_model
from rest_framework.authtoken.models import Token
from rest_framework import serializers


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ('username', 'email', 'password',)
        extra_kwargs = {
            'password': {
                'write_only': True,
            }
        }

    def create(self, validated_data):
        username = validated_data['username']
        password = validated_data['password']
        email = validated_data['email']
        user = get_user_model()(
            email=email,
            username=username,
        )
        user.set_password(password)
        user.save()
        Token.objects.create(user=user)
        return user
