from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils import timezone


class User(AbstractUser):
    def num_of_posts(self):
        """ Returns total number of posts created by a particular user """
        return self.posts.count()

    def num_of_following(self):
        """ Returns total number of following of a particular user """
        try:
            return self.follow_status.following.count()
        except:
            return 0

    def num_of_followers(self):
        """ Returns total number of followers of a particular post """
        try:
            return self.followers.count()
        except:
            return 0

    def followers_details(self):
        return self.followers.all()


class Follow(models.Model):
    user = models.OneToOneField(
        User, on_delete=models.CASCADE, related_name="follow_status")
    following = models.ManyToManyField(
        User, related_name="followers", null=True, blank=True)

    def __str__(self):
        return f"{self.user} - following status"


class Post(models.Model):
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="posts")
    datetime = models.DateTimeField(default=timezone.now())
    content = models.TextField()
    liked_by = models.ManyToManyField(
        User, related_name="liked", null=True, blank=True)

    class Meta:
        ordering = ["-datetime"]  # - : descending

    def __str__(self):
        return f"Post #{self.id} by {self.user}"

    def num_of_likes(self):
        """ Returns total number of likes of a particular post """
        return self.liked_by.count()

    def num_of_comments(self):
        """ Returns total number of comments of a particular post """
        return self.comments.count()


class Comment(models.Model):
    post = models.ForeignKey(
        Post, on_delete=models.CASCADE, related_name="comments")
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="commented")
    content = models.TextField()
    datetime = models.DateTimeField(default=timezone.now())

    class Meta:
        ordering = ["-datetime"]
