from fastapi import APIRouter, Depends, HTTPException, status, Request, Form
from fastapi.responses import JSONResponse
from fastapi.security import OAuth2PasswordBearer
import os
import secrets
from datetime import timedelta
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

router = APIRouter(tags=["Authentication"])

# OAuth2 configuration
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")

# Hardcoded credentials
USERNAME = os.getenv("USERNAME")
PASSWORD = os.getenv("PASSWORD")
SECRET_KEY = os.getenv("SECRET_KEY")
ACCESS_TOKEN_EXPIRE_MINUTES = 43200  # 30 days

# Function to verify credentials
def verify_credentials(username: str, password: str):
    if username.lower() == USERNAME.lower() and password.lower() == PASSWORD.lower():
        return True
    return False

# Function to create access token
def create_access_token(username: str):
    random_string = secrets.token_hex(16)
    return f"{random_string}{username}"

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
        username = token[32:]  # Remove the random string to get the username
        if username is None:
            raise credentials_exception
    except:
        raise credentials_exception
    return {"username": username}

@router.post("/login")
async def login(username: str = Form(...), password: str = Form(...)):
    if verify_credentials(username, password):
        access_token = create_access_token(username)
        response = JSONResponse(content={"message": "Login successful"})
        response.set_cookie(key="access_token", value=access_token, httponly=True, secure=True, samesite="strict", max_age=ACCESS_TOKEN_EXPIRE_MINUTES * 60)
        return response
    raise HTTPException(status_code=400, detail="Incorrect username or password")

@router.post("/logout")
async def logout():
    response = JSONResponse(content={"message": "Logged out successfully"})
    response.delete_cookie(key="access_token")
    return response

@router.get("/check-auth")
async def check_auth(current_user: dict = Depends(get_current_user)):
    return {"message": "Authenticated", "user": current_user}