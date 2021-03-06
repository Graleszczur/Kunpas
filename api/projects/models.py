from django.db import models
from users.models import User
from PIL import Image

# Create your models here.

class Project(models.Model):
    name = models.CharField(max_length=50)
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    description = models.TextField(null=True, blank=True)

    def __str__(self):
        return self.name


class Team(models.Model):
    name = models.CharField(max_length=50)
    members = models.ManyToManyField(User, through='projects.TeamMember')
    project = models.ForeignKey(Project, on_delete=models.CASCADE)

    def __str__(self):
        return self.name


class Task(models.Model):
    name = models.CharField(max_length=50)
    team = models.ForeignKey(Team, on_delete=models.CASCADE)
    description = models.TextField()
    number = models.PositiveIntegerField()
    eta = models.DateTimeField(auto_now=False, auto_now_add=False)
    status = models.BooleanField(default=False)

    def __str__(self):
        return f'{self.number_prefix}-{self.number}\n{self.name}'

    @property
    def number_prefix(self):
        return self.team.name[:4]

    def save(self, *args, **kwargs):
        if not self.number:
            self.number = self.__class__.objects.filter(team=self.team).count() + 1
        super(Task, self).save(*args, **kwargs )


class RequiredTask(models.Model):
    task = models.ForeignKey(Task, on_delete=models.CASCADE, related_name='need')
    required_task = models.ForeignKey(Task, on_delete=models.CASCADE, related_name='required')


class TeamMember(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    team = models.ForeignKey(Team, on_delete=models.CASCADE)
    OWNER = 'OW'
    MANAGER = 'MN'
    WORKER = 'WK'
    RANK_CHOICES = (
        (OWNER, 'Owner'),
        (MANAGER, 'Manager'),
        (WORKER, 'Worker'),
    )
    rank = models.CharField(
        max_length=2,
        choices=RANK_CHOICES,
        default=WORKER,
    )

class Graph(models.Model):
    created_at = models.DateTimeField(auto_now_add=True, editable=False)
    file = models.ImageField(upload_to='graphs/')
    project = models.ForeignKey(Project, on_delete=models.CASCADE)