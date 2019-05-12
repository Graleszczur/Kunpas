from django.contrib import admin
from projects.models import Project, Team, Task, TeamMember

class TeamMemberInline(admin.TabularInline):
    model = TeamMember
    extra = 0


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    search_fields = ['name', 'owner', 'description']
    fields = ('name', 'owner', 'description')
    list_display = ('name', 'owner', 'description')


@admin.register(Task)
class TaskAdmin(admin.ModelAdmin):
    search_fields = ['name', 'team', 'description', 'number', 'eta', 'status']
    fields = ('name', 'team', 'description', 'eta', 'status')
    list_display = ('name', 'team', 'description', 'number', 'eta', 'status')


@admin.register(Team)
class TeamAdmin(admin.ModelAdmin):
    search_fields = ['name', 'project']
    fields = ('name', 'project')
    list_display = ('name', 'project')
    inlines = [
        TeamMemberInline,
    ]
