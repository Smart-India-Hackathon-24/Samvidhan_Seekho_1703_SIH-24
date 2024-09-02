import os
from pymongo import MongoClient
from dotenv import load_dotenv

def connect_to_database():
    # Load environment variables from .env file
    load_dotenv()

    # Load MongoDB URI from environment variable
    mongo_uri = os.getenv("MONGO_URI")

    # Create a MongoDB client instance
    client = MongoClient(mongo_uri)

    # Specify the database name explicitly
    db_name = os.getenv("MONGO_DB_NAME")  # Assuming the database name is stored in an environment variable
    db = client[db_name]

    # Print confirmation that the connection is established
    print("MongoDB connection established to database:", db_name)

    return db

# # Export the connect_to_database function for use in other files
# __all__ = ["connect_to_database"]
