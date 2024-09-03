import json
import os

def extractDataFromJSONandAddToDatabase():
    file_path = os.path.join(os.path.dirname(__file__), "Datasets", "constitution_of_india.json")
    with open(file_path, "r", encoding="utf-8") as file:
        data = json.load(file)
        print(json.dumps(data, indent=4))


extractDataFromJSONandAddToDatabase()