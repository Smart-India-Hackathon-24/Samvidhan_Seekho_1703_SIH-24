import os
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from dotenv import load_dotenv


def connect_to_database():
    # Load environment variables from .env file
    load_dotenv()

    # Load MongoDB URI from environment variable
    mongo_uri = "mongodb://localhost:27017/COI"

    # Create a new client and connect to the server using Server API version 1
    client = MongoClient(mongo_uri, server_api=ServerApi("1"))
    print(mongo_uri)
    # Send a ping to confirm a successful connection
    try:
        client.admin.command("ping")
        print("Pinged your deployment. You successfully connected to MongoDB!")
    except Exception as e:
        print(e)

    # Specify the database name explicitly
    db_name = "COI"
    db = client[db_name]
    return db

