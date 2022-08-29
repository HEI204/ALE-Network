from django.urls import path
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

from . import views

urlpatterns = [
    path('token/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    # API for get particular user info by usernmae
    path("userinfo/<str:username>", views.get_user_info, name="get_user_info"),
    # API for get all posts which is created by a particular user
    path("userinfo/<str:username>/created_posts",
         views.get_user_created_posts, name="get_created_post"),
    # API for get all posts which is followed by a particular user
    path("userinfo/<str:username>/following",
         views.get_user_following_posts, name="get_all_following_post"),
    # API for get all posts which is liked by a particular user
    path("userinfo/<str:username>/liked_posts",
         views.get_user_liked_posts, name="get_all_liked_post"),
    # API for check the request.user is a followers of a particular user
    path("userinfo/<str:username>/follow",
         views.follow_user, name="follow_user"),

    # API for get all posts
    path("posts", views.get_posts, name="get_all_post"),
    # API for user to create new post
    path("posts/create", views.create_post, name="create_post"),
    # API for user to get the info about the particular post by id
    path("posts/<str:post_id>", views.get_post, name="get_post"),
    # API for user to edit the content of the existing post by id
    path("posts/<str:post_id>/edit", views.edit_post, name="edit_post"),
    # API for user to like the post by id
    path("posts/<str:post_id>/like", views.like_post, name="like_post"),

    # API for get all comments of particular post
    path("posts/<str:post_id>/comments",
         views.get_post_comments, name="get_post_comment"),
]
