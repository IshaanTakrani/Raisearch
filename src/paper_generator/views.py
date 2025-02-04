from django.shortcuts import render 
from django.http import HttpResponse
import json

data = {
    "name": "Alice",
    "age": 30,
    "city": "New York",
    "is_student": False,
    "grades": [85, 92, 78],
    "address": {
        "street": "123 Main St",
        "zip": "10001"
    }
}

json_string = json.dumps(data, indent=4)  # indent for pretty printing (optional)
print(json_string)

def index(request):
    return HttpResponse("Hello, world. You're at the generator index.")
