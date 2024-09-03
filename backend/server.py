from fastapi import FastAPI, APIRouter
from fastapi.middleware.cors import CORSMiddleware
from fastapi.openapi.utils import get_openapi
import uvicorn
from Main import extractArticlesDataFromJSONandAddToDatabase
from Database.DatabaseFunctions import *

app = FastAPI()

# Configure CORS
origins = [
    "http://localhost:3000",
    "https://sih24-constitution-frontend.vercel.app",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


connection_router = APIRouter(tags=["Connection Status"])


@connection_router.get("/")
async def root():
    return {"Government": "Constitution of India is running properly 😊"}


constitution_partition_router = APIRouter(tags=["Constitution Partitions"])


@constitution_partition_router.get("/addConstitutionPartition")
async def add_constitution_partition():
    return {"message": "Constitution partition added successfully"}


constitution_article_router = APIRouter(tags=["Constitution Articles"])


@constitution_article_router.get("/addConstitutionArticle")
async def add_constitution_article():
    extractArticlesDataFromJSONandAddToDatabase()
    return {"message": "Constitution article added successfully"}


@constitution_article_router.delete("/deleteAllArticles")
async def delete_constitution_article():
    deleteAllArticlesFromDatabase()
    return {"message": "All articles deleted successfully"}


# Include routers in the main app
app.include_router(connection_router)
app.include_router(constitution_partition_router)
app.include_router(constitution_article_router)


def custom_openapi():
    if app.openapi_schema:
        return app.openapi_schema
    openapi_schema = get_openapi(
        title="Constitution of India API",
        version="1.0.0",
        description="API for managing the Constitution of India",
        routes=app.routes,
    )
    app.openapi_schema = openapi_schema
    return app.openapi_schema


app.openapi = custom_openapi

if __name__ == "__main__":
    uvicorn.run(app, host="localhost", port=5000)
