from rest_framework import serializers
from .models import List_cities

class CitySerializer(serializers.ModelSerializer):
    class Meta:
        model=List_cities
        fields='__all__'
