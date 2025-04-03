from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import List_cities
from .serializer import CitySerializer
from django.http import JsonResponse
import json
import os
from django.views.decorators.csrf import csrf_exempt

# Create your views here.
# with open('D:/Cost Of Living Analyzer-Global Insights With Interactive Data Visualization/BackEnd/JSON_files/current.json', 'r') as file:
#     current_data = json.load(file)

# with open('D:/Cost Of Living Analyzer-Global Insights With Interactive Data Visualization/BackEnd/JSON_files/2023.json', 'r') as file:
#     data_2023 = json.load(file)

# with open('D:/Cost Of Living Analyzer-Global Insights With Interactive Data Visualization/BackEnd/JSON_files/2022.json', 'r') as file:
#     data_2022 = json.load(file)

# with open('D:/Cost Of Living Analyzer-Global Insights With Interactive Data Visualization/BackEnd/JSON_files/2021.json', 'r') as file:
#     data_2021 = json.load(file)

# with open('D:/Cost Of Living Analyzer-Global Insights With Interactive Data Visualization/BackEnd/JSON_files/2020.json', 'r') as file:
#     data_2020 = json.load(file)

# with open('D:/Cost Of Living Analyzer-Global Insights With Interactive Data Visualization/BackEnd/JSON_files/list_of_countries.json', 'r') as file:
#     country_city_mapping = json.load(file)

# with open('D:/Cost Of Living Analyzer-Global Insights With Interactive Data Visualization/BackEnd/JSON_files/country_details.json', 'r') as file:
#     country_details = json.load(file)

# Get the absolute path of the project directory
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# Path to the JSON files directory
JSON_DIR = os.path.join(BASE_DIR, 'JSON_files')

# Load all JSON files dynamically
json_files = {
    "current_data": "current.json",
    "data_2023": "2023.json",
    "data_2022": "2022.json",
    "data_2021": "2021.json",
    "data_2020": "2020.json",
    "country_city_mapping": "list_of_countries.json",
    "country_details": "country_details.json"
}

# Dictionary to store loaded data
loaded_data = {}

for key, filename in json_files.items():
    file_path = os.path.join(JSON_DIR, filename)
    
    if os.path.exists(file_path):  # Ensure the file exists
        with open(file_path, 'r') as file:
            loaded_data[key] = json.load(file)
    else:
        print(f"Warning: {filename} not found in {JSON_DIR}")

# Assign loaded data to variables
current_data = loaded_data.get("current_data", {})
data_2023 = loaded_data.get("data_2023", {})
data_2022 = loaded_data.get("data_2022", {})
data_2021 = loaded_data.get("data_2021", {})
data_2020 = loaded_data.get("data_2020", {})
country_city_mapping = loaded_data.get("country_city_mapping", {})
country_details = loaded_data.get("country_details", {})

# Django view to fetch city data across years
@api_view(['POST'])
def get_country_details(request):
    a=request.data
    country_name = a['country_name'].strip().lower()
    # print(country_name)
    # print(request.POST)
    # print(f"Available countries: {list(country_city_mapping.keys())}")

    # Match the country in the country-to-city mapping
    cities = []
    for country, city_list in country_city_mapping.items():
        if country.strip().lower() == country_name:
            cities = [city.split(',')[0] for city in city_list]
            break

    if not cities:
        return {"error": f"No data found for country: {country_name}"}

    # # Normalize city names for matching
    normalized_cities = [city.lower().replace(" ", "") for city in cities]

    # Filter city data for the matched country
    city_details = [city for city in current_data.values() if city['city_name'].lower().split(',')[0] in normalized_cities]

    # print(f"Normalized matched cities for {country_name}: {normalized_cities}")
    # print(f"City details found after normalization: {city_details}")

    if not city_details:
        return {"error": f"No city data found for country: {country_name}"}

    # Get country-level averages from country_details.json
    country_data = None
    for country in country_details.values():
        if country['country_name'].strip().lower() == country_name:
            country_data = country
            break

    if not country_data:
        return {"error": f"No country-level data found for: {country_name}"}

    # Prepare the output structure
    result = {
        "name": country_data["country_name"],
        "coi": [float(country_data["coi"])],
        "coi_label": ["Average"],
        "ri": [float(country_data["ri"])],
        "ri_label": ["Average"],
        "coipri": [float(country_data["coipri"])],
        "coipri_label": ["Average"],
        "gi": [float(country_data["gi"])],
        "gi_label": ["Average"],
        "rpi": [float(country_data["rpi"])],
        "rpi_label": ["Average"],
        "lppi": [float(country_data["lppi"])],
        "lppi_label": ["Average"],
    }

    # Function to calculate top cities for an index
    def calculate_top_cities(index_name):
        indexes = sorted(
            [(float(city[index_name]), city['city_name'].split(',')[0]) for city in city_details if index_name in city],
            reverse=True
        )

        top_values = [value for value, _ in indexes[:4]]
        top_labels = [name for _, name in indexes[:4]]

        # Pad with None if fewer than 4 cities
        while len(top_values) < 4:
            top_values.append(None)
            top_labels.append(None)

        return top_values, top_labels

    # Process each index for top cities
    for key in ["coi", "ri", "coipri", "gi", "rpi", "lppi"]:
        top_values, top_labels = calculate_top_cities(key)
        result[key].extend(top_values)  # Append top 4 values to country-level average
        result[f"{key}_label"].extend(top_labels)  # Append top 4 city labels

    return Response(result)

@csrf_exempt
@api_view(['POST'])
def get_city_all_years(request):
    a=request.data
    city_name=a['city_name']
    data_sources = {
    "current": current_data,
    "2023": data_2023,
    "2022": data_2022,
    "2021": data_2021,
    "2020": data_2020,
    }

    city_name_lower = city_name.lower()
    print(city_name_lower)
    result = {"name": None, "Index": {}}
    all_years = {}

    # Search for the city in each year's data
    for year, data in data_sources.items():
        matched_city = next(
            (city for city in data.values() if city_name_lower in city["city_name"].lower()),
            None
        )
        all_years[year] = matched_city

        # Set the city name if not already set
        if matched_city and not result["name"]:
            result["name"] = matched_city["city_name"]

    # Populate index data for all specified keys
    for key in ["coi", "ri", "coipri", "gi", "rpi", "lppi"]:
        result["Index"][key] = [
            float(year_data[key]) if year_data else None
            for year_data in all_years.values()
        ]

    return Response(result)

#Comparision between two cities or countries.
@api_view(['POST'])
def compare_two_cities(request):
    data = request.data
    city_or_country = data.get('type', '').strip().lower()  # 'city' or 'country'
    
    if city_or_country == 'city':
        city_name1 = data['city_name1'].strip().lower()
        city_name2 = data['city_name2'].strip().lower()

        # Search for the cities in the dataset
        city_data1 = next(
            (city for city in current_data.values() if city_name1 in city["city_name"].lower()), None)
        city_data2 = next(
            (city for city in current_data.values() if city_name2 in city["city_name"].lower()), None)

        if not city_data1 or not city_data2:
            return Response({"error": "One or both cities not found."}, status=status.HTTP_404_NOT_FOUND)

        # Extract index values for the cities
        result = {
            "city1": city_data1["city_name"],
            "city2": city_data2["city_name"],
            "coi": [float(city_data1["coi"]), float(city_data2["coi"])],
            "ri": [float(city_data1["ri"]), float(city_data2["ri"])],
            "coipri": [float(city_data1["coipri"]), float(city_data2["coipri"])],
            "gi": [float(city_data1["gi"]), float(city_data2["gi"])],
            "rpi": [float(city_data1["rpi"]), float(city_data2["rpi"])],
            "lppi": [float(city_data1["lppi"]), float(city_data2["lppi"])]
        }

    elif city_or_country == 'country':
        country_name1 = data['country_name1'].strip().lower()
        country_name2 = data['country_name2'].strip().lower()

        # Get cities for both countries
        cities1 = country_city_mapping.get(country_name1, [])
        cities2 = country_city_mapping.get(country_name2, [])

        if not cities1 or not cities2:
            return Response({"error": "One or both countries not found."}, status=status.HTTP_404_NOT_FOUND)

        # Get country-level averages
        country_data1 = next(
            (country for country in country_details.values() if country_name1 == country['country_name'].strip().lower()), None)
        country_data2 = next(
            (country for country in country_details.values() if country_name2 == country['country_name'].strip().lower()), None)

        if not country_data1 or not country_data2:
            return Response({"error": "Country data not found."}, status=status.HTTP_404_NOT_FOUND)

        # Prepare response for country comparison
        result = {
            "country1": country_data1["country_name"],
            "country2": country_data2["country_name"],
            "coi": [float(country_data1["coi"]), float(country_data2["coi"])],
            "ri": [float(country_data1["ri"]), float(country_data2["ri"])],
            "coipri": [float(country_data1["coipri"]), float(country_data2["coipri"])],
            "gi": [float(country_data1["gi"]), float(country_data2["gi"])],
            "rpi": [float(country_data1["rpi"]), float(country_data2["rpi"])],
            "lppi": [float(country_data1["lppi"]), float(country_data2["lppi"])]
        }

    else:
        return Response({"error": "Invalid type. Choose either 'city' or 'country'."}, status=status.HTTP_400_BAD_REQUEST)

    return Response(result)
