from fastapi import FastAPI, APIRouter, Depends, HTTPException, status, Request, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.openapi.utils import get_openapi
from fastapi.security import OAuth2PasswordBearer
import uvicorn
from Main import *
from Database.DatabaseFunctions import *
import os
from dotenv import load_dotenv
from fastapi.responses import JSONResponse
from datetime import datetime, timedelta
import jwt  # Reverting to original import

# Load environment variables from .env file
load_dotenv()

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
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")

# Hardcoded credentials
USERNAME = os.getenv("USERNAME")
PASSWORD = os.getenv("PASSWORD")
SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 43200  # 30 days

# Function to verify credentials
def verify_credentials(username: str, password: str):
    if username.lower() == USERNAME.lower() and password.lower() == PASSWORD.lower():
        return True
    return False

# Function to create access token
def create_access_token(data: dict, expires_delta: timedelta = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

# Dependency for protected routes
async def get_current_user(request: Request):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    token = request.cookies.get("access_token")
    if not token:
        raise credentials_exception
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
    except jwt.PyJWTError:
        raise credentials_exception
    return {"username": username}

connection_router = APIRouter(tags=["Connection Status"])

# Login endpoint
@connection_router.post("/login")
async def login(username: str = Form(...), password: str = Form(...)):
    if verify_credentials(username, password):
        access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
        access_token = create_access_token(
            data={"sub": username}, expires_delta=access_token_expires
        )
        response = JSONResponse(content={"message": "Login successful"})
        response.set_cookie(key="access_token", value=access_token, httponly=True, secure=True, samesite="strict", max_age=ACCESS_TOKEN_EXPIRE_MINUTES * 60)
        return response
    raise HTTPException(status_code=400, detail="Incorrect username or password")

@connection_router.get("/")
async def root():
    return {"Government": "Constitution of India is running properly 😊"}

@connection_router.post("/logout")
async def logout():
    response = JSONResponse(content={"message": "Logged out successfully"})
    response.delete_cookie(key="access_token")
    return response

@connection_router.get("/check-auth")
async def check_auth(current_user: dict = Depends(get_current_user)):
    return {"message": "Authenticated", "user": current_user}

constitution_partition_router = APIRouter(tags=["Constitution Partitions"])

@constitution_partition_router.get(
    "/addConstitutionPartition", dependencies=[Depends(oauth2_scheme)]
)
async def add_constitution_partition(current_user: dict = Depends(get_current_user)):
    extractPartitionsDataFromJSONandAddToDatabase()
    return {"message": "Constitution partition added successfully"}

@constitution_partition_router.delete(
    "/deleteAllPartitions", dependencies=[Depends(oauth2_scheme)]
)
async def delete_constitution_partition(current_user: dict = Depends(get_current_user)):
    deleteAllPartitionsFromDatabase()
    return {"message": "All partitions deleted successfully"}

constitution_article_router = APIRouter(tags=["Constitution Articles"])

@constitution_article_router.get(
    "/addConstitutionArticle", dependencies=[Depends(oauth2_scheme)]
)
async def add_constitution_article(current_user: dict = Depends(get_current_user)):
    extractArticlesDataFromJSONandAddToDatabase()
    return {"message": "Constitution article added successfully"}

@constitution_article_router.delete(
    "/deleteAllArticles", dependencies=[Depends(oauth2_scheme)]
)
async def delete_constitution_article(current_user: dict = Depends(get_current_user)):
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
