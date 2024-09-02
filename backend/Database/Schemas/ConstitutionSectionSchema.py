from pymongo import collection
from backend.Database.DatabaseConnection import connect_to_database

class ConstitutionSectionSchema:
    def __init__(self):
        db = connect_to_database()
        self.collection = db['sections']

    def create_section(self, part, articles):
        section_document = {
            "Part": {
                "part_number": part['part_number'],
                "part_title": part['part_title']
            },
            "Articles": [
                {"article_number": article['article_number'], "article_title": article['article_title']}
                for article in articles
            ]
        }
        return self.collection.insert_one(section_document)

    def get_all_sections(self):
        return list(self.collection.find({}))

    def get_section_by_part_number(self, part_number):
        return self.collection.find_one({"Part.part_number": part_number})
