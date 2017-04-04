from NVSLOnline.models import Divisions
from rest_framework.serializers import ModelSerializer

class DivisionSerializer(ModelSerializer):
    class Meta:
        model = Divisions
        fields = ('Id','DivisionName','IsHidden')