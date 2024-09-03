from Database.DatabaseConnection import connect_to_database

db = connect_to_database()

def get_collection(collection_name):
    try:
        collection = db[collection_name]
        return collection
    except Exception as e:
        print(f"Error getting collection: {e}")
        return None
