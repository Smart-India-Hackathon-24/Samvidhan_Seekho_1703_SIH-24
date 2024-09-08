import json
import os
from Database.DatabaseFunctions import *


def extractArticlesDataFromJSONandAddToDatabase():
    # input_file_path = os.path.join(os.path.dirname(__file__), "Datasets", "constitution_of_india.json")
    # output_file_path = os.path.join(os.path.dirname(__file__), "Datasets", "formatted_constitution_of_india.json")

    # with open(input_file_path, "r", encoding="utf-8") as file:
    #     data = json.load(file)

    # formatted_data = []
    # current_article = None

    # for item in data:
    #     if isinstance(item['article'], int):
    #         if current_article:
    #             formatted_data.append(current_article)
    #         current_article = {
    #             'article_number': str(item['article']),
    #             'article_title': item['title'],
    #             'article_content': item['description'],
    #             'subarticles': []
    #         }
    #     else:
    #         if current_article:
    #             current_article['subarticles'].append({
    #                 'subarticle_number': item['article'],
    #                 'subarticle_title': item['title'],
    #                 'subarticle_content': item['description']
    #             })

    # if current_article:
    #     formatted_data.append(current_article)

    # with open(output_file_path, "w", encoding="utf-8") as outfile:
    #     json.dump(formatted_data, outfile, indent=4, ensure_ascii=False)

    # print(f"Formatted data saved to {output_file_path}")

    input_file_path = os.path.join(
        os.path.dirname(__file__), "Datasets", "formatted_constitution_of_india.json"
    )

    with open(input_file_path, "r", encoding="utf-8") as file:
        formatted_data = json.load(file)

    for article in formatted_data:
        addArticlesToDatabase(article)


def extractPartitionsDataFromJSONandAddToDatabase():
    input_file_path = os.path.join(
        os.path.dirname(__file__), "Datasets", "constitution.json"
    )

    with open(input_file_path, "r", encoding="utf-8") as file:
        formatted_data = json.load(file)

    for partition in formatted_data:
        addPartitionsToDatabase(partition)

