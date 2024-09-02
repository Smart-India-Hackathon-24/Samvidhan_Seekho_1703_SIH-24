from Database.Schemas.ConstitutionSectionSchema import validate_section_schema
from Database.utils import get_collection


def addConstitutionSection(part, articles):
    collection = get_collection("ConstitutionalSections")
    if validate_section_schema(part, articles):
        collection.insert_one(part, articles)
        print("Constitution section added successfully")
    else:
        print("Constitution section was not added")
        return "Invalid schema"
