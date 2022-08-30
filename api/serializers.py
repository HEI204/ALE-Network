from rest_framework.serializers import ModelSerializer, SlugRelatedField, IntegerField
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from network.models import Post, Comment, User, Follow


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['username'] = user.username

        return token


class FollowSerializer(ModelSerializer):
    class Meta:
        model = Follow
        fields = "__all__"


# Used for UserSerializer to get the followers of particular user
class FollowerDetailsSerializer(ModelSerializer):
    class Meta:
        model = Follow
        fields = ["user"]


class UserSerializer(ModelSerializer):
    following = IntegerField(source='num_of_following', required=False)
    followers = IntegerField(source='num_of_followers', required=False)
    followers_details = FollowerDetailsSerializer(many=True, required=False)
    posts = IntegerField(source="num_of_posts", required=False)

    class Meta:
        model = User
        fields = ["username", "posts", "following",
                  "followers", "followers_details"]


class CommentSerializer(ModelSerializer):
    user = SlugRelatedField(
        many=False,
        read_only=True,
        slug_field='username'
    )

    class Meta:
        model = Comment
        fields = ["user", "datetime", "content"]


class PostSerializer(ModelSerializer):
    likes = IntegerField(source='num_of_likes', required=False)
    comments = IntegerField(source='num_of_comments', required=False)

    user = SlugRelatedField(
        many=False,
        read_only=True,
        slug_field='username'
    )

    liked_by = SlugRelatedField(
        many=True,
        read_only=True,
        slug_field='username'
    )

    class Meta:
        model = Post
        fields = "__all__"
