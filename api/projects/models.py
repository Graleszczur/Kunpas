from django.db import models
from users.models import User

# Create your models here.

class Project(models.Model):
    name = models.CharField(max_length=50)
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    description = models.TextField()

    def __str__(self):
        return self.name


class Team(models.Model):
    name = models.CharField(max_length=50)
    member = models.ManyToManyField(User, through='projects.TeamMember')
    project = models.ForeignKey(Project, on_delete=models.CASCADE)

    def __str__(self):
        return self.name


class Task(models.Model):
    name = models.CharField(max_length=50)
    team = models.ForeignKey(Team, on_delete=models.CASCADE)
    description = models.TextField()
    number = models.PositiveIntegerField()
    numberPrefix = models.CharField(max_length=4)
    eta = models.DateTimeField(auto_now=False, auto_now_add=False)

    def __str__(self):
        return f'{numberPrefix}-{number}\n{self.name}'

    def save(self):
        return self.__class__.objects.filter(team=self.team).count() + 1


class TeamMember(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    team = models.ForeignKey(Team, on_delete=models.CASCADE)
    OWNER = 'OW'
    MANAGER = 'MN'
    NIGGA = 'NG'
    RANK_CHOICES = (
        (OWNER, 'Owner'),
        (MANAGER, 'Manager'),
        (NIGGA, 'Nigga'),
    )
    rank = models.CharField(
        max_length=2,
        choices=RANK_CHOICES,
        default=NIGGA,
    )