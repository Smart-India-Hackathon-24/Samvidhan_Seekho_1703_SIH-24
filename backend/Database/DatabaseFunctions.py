from Database.utils import get_collection


def addConstitutionSection(part, articles):
    collection = get_collection("ConstitutionalSections")
    collection.insert_one(part, articles)
    print("Constitution section added successfully")
