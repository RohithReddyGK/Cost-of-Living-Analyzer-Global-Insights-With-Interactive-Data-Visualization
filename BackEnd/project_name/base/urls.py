from django.urls import path
from .views import get_city_all_years, get_country_details,compare_two_cities

urlpatterns=[
    path('post_country/',get_country_details,name='postCountry'),
    path('post_city/',get_city_all_years,name='postCity'),
    path('compare_two_cities/', compare_two_cities, name='compareTwoCities')
]