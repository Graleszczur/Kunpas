import networkx as nx
import matplotlib.pyplot as plt
import io
from PIL import Image
from matplotlib import rcParams
from projects.models import Project, Team, TeamMember, Graph, Task, RequiredTask
from users.models import User
from collections import defaultdict
from django.core.files import File

def get_teams_in_project(project):
    teams = Team.objects.filter(project=project)
    teams_dict = {}
    for team in teams:
        team_dict = defaultdict(list)
        for membership in team.teammember_set.all():
            team_dict[membership.rank].append(membership.user.first_name + " " + membership.user.last_name)
        teams_dict[team.name] = team_dict
    return teams_dict

def create_hierarchy_graph():
    project = Project.objects.get(id=1)
    teams_dict=get_teams_in_project(project)
    G = nx.DiGraph()
    teams=list(teams_dict.keys())
    project_nodes = [project.name]
    edges = []
    team_nodes = []
    owner_nodes = []
    manager_nodes = []
    worker_nodes = []
    val_map = {}
    for team in teams:
        edges.append([project.name,team])
        team_nodes.append(team)
        val_map[team] = 1
        for owner in teams_dict.get(team).get(TeamMember.OWNER):
            edges.append([team, owner])
            owner_nodes.append(owner)
            val_map[owner] = 2
            for manager in teams_dict.get(team).get(TeamMember.MANAGER):
                edges.append([owner,manager])
                manager_nodes.append(manager)
                val_map[manager] = 3
                for worker in teams_dict.get(team).get(TeamMember.WORKER):
                    edges.append([manager,worker])
                    worker_nodes.append(worker)
                    val_map[worker] = 4
    G.add_edges_from(edges)
    pos=nx.planar_layout(G)
    nx.draw_networkx_nodes(G, pos, project_nodes, node_color="black", with_labels=False, label='Project')
    nx.draw_networkx_nodes(G, pos, team_nodes, node_color="blue", with_labels=False, label='Team')
    nx.draw_networkx_nodes(G, pos, owner_nodes, node_color="red", with_labels=False, label='Owner')
    nx.draw_networkx_nodes(G, pos, manager_nodes, node_color="yellow", with_labels=False, label='Manager')
    nx.draw_networkx_nodes(G, pos, worker_nodes, node_color="green", with_labels=False, label='Worker')
    plt.legend(numpoints=1)
    nx.draw_networkx_edges(G, pos)
    pos_labels={}
    for k,v in pos.items():
        pos_labels[k] = (v[0],v[1]-0.04)
    nx.draw_networkx_labels(G, pos_labels)
    plt.tight_layout()
    print(G.nodes())
    plt.show()
    plt.savefig('graph-' + str(project.id) + '.png', format='png')
    #file = File(open('graph-' + str(project.id) + '.png', 'rb'))
    #graph = Graph()
    #graph.file.save('graph-' + str(project.id) + '.png', file, save=True)
    #graph.project=project.id

def get_required_tasks(task):
    tasks_dict = {task.number_prefix + '-' + str(task.number):[]}
    reqtsk = RequiredTask.objects.filter(task=task)
    for req in reqtsk:
        tasks_dict[task.number_prefix + '-' + str(task.number)].append(req.required_task)
    return tasks_dict

def create_task_graph():
    task = Task.objects.get(id=6)
    G = nx.DiGraph()
    edges = []
    done_nodes = []
    todo_nodes = []
    if task.status:
        done_nodes.append(task.number_prefix + '-' + str(task.number))
    else:
        todo_nodes.append(task.number_prefix + '-' + str(task.number))
    req_tasks = get_required_tasks(task)
    for req_task in req_tasks[task.number_prefix + '-' + str(task.number)]:
        edges.append([req_task.number_prefix + '-' + str(req_task.number),task.number_prefix + '-' + str(task.number)])
        if req_task.status:
            done_nodes.append(req_task.number_prefix + '-' + str(req_task.number))
        else:
            todo_nodes.append(req_task.number_prefix + '-' + str(req_task.number))
        req_req_tasks = get_required_tasks(req_task)
        for req_req_task in req_req_tasks[req_task.number_prefix + '-' + str(req_task.number)]:
            edges.append([req_req_task.number_prefix + '-' + str(req_req_task.number),req_task.number_prefix + '-' + str(req_task.number)])
            if req_req_task.status:
                done_nodes.append(req_req_task.number_prefix + '-' + str(req_req_task.number))
            else:
                todo_nodes.append(req_req_task.number_prefix + '-' + str(req_req_task.number))
    print(done_nodes)
    G.add_edges_from(edges)
    pos = nx.planar_layout(G)
    nx.draw_networkx_nodes(G, pos, done_nodes, node_color="green", with_labels=False)
    nx.draw_networkx_nodes(G, pos, todo_nodes, node_color="red", with_labels=False)
    nx.draw_networkx_edges(G, pos)
    pos_labels = {}
    for k, v in pos.items():
        pos_labels[k] = (v[0], v[1] - 0.06)
    nx.draw_networkx_labels(G, pos_labels)
    plt.tight_layout()
    plt.show()