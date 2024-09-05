from fastapi import FastAPI, APIRouter, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.openapi.utils import get_openapi
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
import uvicorn
from Main import extractArticlesDataFromJSONandAddToDatabase
from Database.DatabaseFunctions import *
import os

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

# OAuth2 configuration
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

# Hardcoded credentials
USERNAME = os.getenv("USERNAME")
PASSWORD = os.getenv("PASSWORD")
TOKEN = os.getenv("TOKEN")


# Function to verify credentials
def verify_credentials(username: str, password: str):
    if username == USERNAME and password == PASSWORD:
        return True
    return False


# Dependency for protected routes
async def get_current_user(token: str = Depends(oauth2_scheme)):
    if token != TOKEN:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid authentication credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )
    return {"username": USERNAME}


connection_router = APIRouter(tags=["Connection Status"])


# Token endpoint
@connection_router.post("/token")
async def login(form_data: OAuth2PasswordRequestForm = Depends()):
    if verify_credentials(form_data.username, form_data.password):
        return {"access_token": TOKEN, "token_type": "bearer"}
    raise HTTPException(status_code=400, detail="Incorrect username or password")


@connection_router.get("/")
async def root():
    return {"Government": "Constitution of India is running properly 😊"}


constitution_partition_router = APIRouter(tags=["Constitution Partitions"])


@constitution_partition_router.get(
    "/addConstitutionPartition", dependencies=[Depends(get_current_user)]
)
async def add_constitution_partition():
    return {"message": "Constitution partition added successfully"}


constitution_article_router = APIRouter(tags=["Constitution Articles"])


@constitution_article_router.get(
    "/addConstitutionArticle", dependencies=[Depends(get_current_user)]
)
async def add_constitution_article():
    extractArticlesDataFromJSONandAddToDatabase()
    return {"message": "Constitution article added successfully"}


@constitution_article_router.delete(
    "/deleteAllArticles", dependencies=[Depends(get_current_user)]
)
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
