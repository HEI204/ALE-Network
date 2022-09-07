from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly
from rest_framework.pagination import PageNumberPagination
from django.utils import timezone
from django.db import IntegrityError

from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import FollowSerializer, PostSerializer, CommentSerializer, UserSerializer, MyTokenObtainPairSerializer
from network.models import Post, Comment, User, Follow


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


@api_view(['GET'])
def get_user_info(request, username):
    try:
        user = User.objects.get(username=username)

    except User.DoesNotExist:
        content = {"Error": f"User: {username} does not exist"}
        return Response(content, status=status.HTTP_404_NOT_FOUND)

    serializer = UserSerializer(user, many=False)
    return Response(serializer.data)


@api_view(["POST"])
def register_user(request):
    request_data = dict(request.data)

    username = request_data["username"]
    email = request_data["email"]
    password = request_data["password"]

    try:
        user = User.objects.create_user(username, email, password)
        user.save()
    except IntegrityError:
        content = {"Error": f"The username already registered by other"}
        return Response(content, status=status.HTTP_400_BAD_REQUEST)

    serializer = UserSerializer(user, many=False)
    return Response(serializer.data, status=status.HTTP_201_CREATED)


@api_view(['GET'])
@permission_classes([IsAuthenticatedOrReadOnly])
def get_posts(request):
    paginator = PageNumberPagination()
    paginator.page_size = 10
    posts = Post.objects.prefetch_related('user', 'liked_by')

    result_page = paginator.paginate_queryset(posts, request)

    serializer = PostSerializer(result_page, many=True)
    return paginator.get_paginated_response(serializer.data)


@api_view(["GET"])
def get_post(request, post_id):
    try:
        post = Post.objects.get(pk=post_id)

    except Post.DoesNotExist:
        content = {"Error": f"Post #{post_id} does not exist"}
        return Response(content, status=status.HTTP_404_NOT_FOUND)

    serializer = PostSerializer(post, many=False)
    return Response(serializer.data)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def create_post(request):
    serializer = PostSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save(user=request.user, datetime=timezone.now())
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["PATCH"])
def edit_post(request, post_id):
    try:
        post = Post.objects.get(pk=post_id)

    except Post.DoesNotExist:
        content = {"Error": f"Post #{post_id} does not exist"}
        return Response(content, status=status.HTTP_404_NOT_FOUND)

    serializer = PostSerializer(instance=post, data=request.data, partial=True)

    if serializer.is_valid():
        serializer.save()

    return Response(serializer.data)


@api_view(["PATCH"])
@permission_classes([IsAuthenticated])
def like_post(request, post_id):
    try:
        post = Post.objects.get(pk=post_id)

        if not post.liked_by.contains(request.user):
            post.liked_by.add(request.user)
        else:
            post.liked_by.remove(request.user)

    except Post.DoesNotExist:
        content = {"Error": f"Post #{post_id} does not exist"}
        return Response(content, status=status.HTTP_404_NOT_FOUND)

    serializer = PostSerializer(post, many=False)

    return Response(serializer.data)


@api_view(["PUT"])
def follow_user(request, username):
    try:
        current_user_follow_status = Follow.objects.get(user=request.user)

    except Follow.DoesNotExist:
        current_user_follow_status = Follow(user=request.user)
        current_user_follow_status.save()

    follow_target = User.objects.get(username=username)
    if not current_user_follow_status.following.contains(follow_target):
        current_user_follow_status.following.add(follow_target)
    else:
        current_user_follow_status.following.remove(follow_target)

    serializers = FollowSerializer(current_user_follow_status, many=False)
    return Response(serializers.data)


@api_view(["GET"])
def get_user_following_posts(request, username):
    try:
        target_user = User.objects.get(username=username)

    except User.DoesNotExist:
        content = {"Error": f"User: {username} does not exist"}
        return Response(content, status=status.HTTP_404_NOT_FOUND)

    try:
        all_following = Follow.objects.get(user=target_user).following.all()
        all_following_posts = Post.objects.filter(
            user__in=all_following)

    except Follow.DoesNotExist:
        content = {"Error": f"User: {username} does not follow any other user"}
        return Response(content, status=status.HTTP_404_NOT_FOUND)

    paginator = PageNumberPagination()
    paginator.page_size = 10
    result_page = paginator.paginate_queryset(all_following_posts, request)

    serializer = PostSerializer(result_page, many=True)
    return paginator.get_paginated_response(serializer.data)


@api_view(["GET"])
def get_user_liked_posts(request, username):
    try:
        target_user = User.objects.get(username=username)

    except User.DoesNotExist:
        content = {"Error": f"User: {username} does not exist"}
        return Response(content, status=status.HTTP_404_NOT_FOUND)

    paginator = PageNumberPagination()
    paginator.page_size = 10
    result_page = paginator.paginate_queryset(target_user.liked.all(), request)

    serializer = PostSerializer(result_page, many=True)
    return paginator.get_paginated_response(serializer.data)


@api_view(["GET"])
def get_user_created_posts(request, username):
    try:
        target_user = User.objects.get(username=username)

    except User.DoesNotExist:
        content = {"Error": f"User: {username} does not exist"}
        return Response(content, status=status.HTTP_404_NOT_FOUND)

    paginator = PageNumberPagination()
    paginator.page_size = 10
    result_page = paginator.paginate_queryset(target_user.posts.all(), request)

    serializer = PostSerializer(result_page, many=True)
    return paginator.get_paginated_response(serializer.data)


@api_view(["Get"])
def get_post_comments(request, post_id):
    try:
        target_post = Post.objects.get(pk=post_id)
        comments = target_post.comments.all()
    except Post.DoesNotExist:
        content = {"Error": f"Post #{post_id} does not exist"}
        return Response(content, status=status.HTTP_404_NOT_FOUND)

    paginator = PageNumberPagination()
    paginator.page_size = 5
    result_page = paginator.paginate_queryset(comments, request)

    serializer = CommentSerializer(result_page, many=True)
    return paginator.get_paginated_response(serializer.data)
