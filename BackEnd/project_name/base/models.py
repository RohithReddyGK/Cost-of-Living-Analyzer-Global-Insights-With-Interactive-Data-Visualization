from django.db import models

# Create your models here.
class List_cities(models.Model):
    city_name=models.CharField(max_length=100)
    coi=models.FloatField(max_length=10)
    ri=models.FloatField(max_length=10)
    coipri=models.FloatField(max_length=10)
    gi=models.FloatField(max_length=10)
    lppi=models.FloatField(max_length=10)

    def __str__(self):
        return self.city_name

