from Database.utils import get_collection


def addPartitionsToDatabase(partition):
    collection = get_collection("ConstitutionalPartitions")
    collection.insert_one(partition)
    print("Constitution section added successfully")


def addArticlesToDatabase(article):
    collection = get_collection("ConstitutionalArticles")
    collection.insert_one(article)
    print("Article added successfully")


def deleteAllArticlesFromDatabase():
    collection = get_collection("ConstitutionalArticles")
    collection.delete_many({})
    print("All articles deleted successfully")
