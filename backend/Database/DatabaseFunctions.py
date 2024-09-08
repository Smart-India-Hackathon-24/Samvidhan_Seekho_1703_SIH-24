from Database.utils import get_collection


# Partitions


def addPartitionsToDatabase(partition):
    try:
        collection = get_collection("ConstitutionalPartitions")
        collection.insert_one(partition)
        print("Constitution partition added successfully")
    except Exception as e:
        print(f"Error adding partition to database: {str(e)}")


def deleteAllPartitionsFromDatabase():
    try:
        collection = get_collection("ConstitutionalPartitions")
        collection.delete_many({})
        print("All partitions deleted successfully")
    except Exception as e:
        print(f"Error deleting all partitions from database: {str(e)}")


def getAllPartitionsFromDatabase():
    try:
        collection = get_collection("ConstitutionalPartitions")
        partitions = list(collection.find({}))
        return partitions
    except Exception as e:
        print(f"Error retrieving partitions from database: {str(e)}")
        return []


# Articles


def addArticlesToDatabase(article):
    try:
        collection = get_collection("ConstitutionalArticles")
        collection.insert_one(article)
        print("Article added successfully")
    except Exception as e:
        print(f"Error adding article to database: {str(e)}")


def deleteAllArticlesFromDatabase():
    try:
        collection = get_collection("ConstitutionalArticles")
        collection.delete_many({})
        print("All articles deleted successfully")
    except Exception as e:
        print(f"Error deleting all articles from database: {str(e)}")


def getAllArticlesFromDatabase():
    try:
        collection = get_collection("ConstitutionalArticles")
        articles = list(collection.find({}))
        return articles
    except Exception as e:
        print(f"Error retrieving articles from database: {str(e)}")
        return []


def getAllArticleByNumberFromDatabase(article_number):
    try:
        collection = get_collection("ConstitutionalArticles")
        article = collection.find_one({"article_number": article_number})
        if article:
            return article["_id"]
        else:
            return None
    except Exception as e:
        print(f"Error retrieving article from database: {str(e)}")
        return None
