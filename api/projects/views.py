from django.views.generic import View
from django.utils import timezone
from .render import Render


class Pdf(View):

    def get(self, request, id):
        today = timezone.now()
        params = {
            'today': today,
            'request': request
        }
        return Render.render('graphs/pdf.html', params)
