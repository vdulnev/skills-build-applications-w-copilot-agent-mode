import os
from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from tracker import views

# Get codespace URL
codespace_name = os.environ.get('CODESPACE_NAME')
if codespace_name:
    base_url = f"https://{codespace_name}-8000.app.github.dev"
else:
    base_url = "http://localhost:8000"

router = DefaultRouter()
router.register(r'users', views.UserViewSet, basename='user')
router.register(r'teams', views.TeamViewSet, basename='team')
router.register(r'activities', views.ActivityViewSet, basename='activity')
router.register(r'workouts', views.WorkoutViewSet, basename='workout')
router.register(r'leaderboards', views.LeaderboardViewSet, basename='leaderboard')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', views.api_root, name='api-root'),
    path('api/', include(router.urls)),
]