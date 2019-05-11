from django.views.generic import View
from django.utils import timezone
from .render import Render
from projects.models import Graph


class Pdf(View):

    def get(self, request, id):
        graph = Graph.objects.get(id=id)
        today = timezone.now()
        params = {
            'today': today,
            'url': graph.file.url
        }
        return Render.render('graphs/pdf.html', params)
