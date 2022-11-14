from django.contrib import admin
from .models import User, Follow, Post, Comment

# Register your models here.
class PostAdmin(admin.ModelAdmin):
    filter_horizontal = ('liked_by', )

class FollowAdmin(admin.ModelAdmin):
    filter_horizontal = ('following', )

admin.site.register(User)
admin.site.register(Follow, FollowAdmin)
admin.site.register(Post, PostAdmin)
admin.site.register(Comment)