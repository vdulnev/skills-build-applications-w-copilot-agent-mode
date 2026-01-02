from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.reverse import reverse

@api_view(['GET'])
def api_root(request, format=None):
    return Response({
        'users': reverse('user-list', request=request, format=format),
        'teams': reverse('team-list', request=request, format=format),
        'activities': reverse('activity-list', request=request, format=format),
        'workouts': reverse('workout-list', request=request, format=format),
        'leaderboards': reverse('leaderboard-list', request=request, format=format),
    })

class UserViewSet(viewsets.ModelViewSet):
    queryset = []
    pass

class TeamViewSet(viewsets.ModelViewSet):
    queryset = []
    pass

class ActivityViewSet(viewsets.ModelViewSet):
    queryset = []
    pass

class WorkoutViewSet(viewsets.ModelViewSet):
    queryset = []
    pass

class LeaderboardViewSet(viewsets.ModelViewSet):
    queryset = []
    pass