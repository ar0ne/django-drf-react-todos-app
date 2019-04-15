from rest_framework import permissions


class IsAuthenticatedOwnerOrStaff(permissions.IsAdminUser):
    message = 'Only owners are allowed.'

    def has_object_permission(self, request, view, obj):
        return bool(request.user and request.user.is_authenticated and
            (obj.is_owner(request.user) or request.user.is_staff)
        )
