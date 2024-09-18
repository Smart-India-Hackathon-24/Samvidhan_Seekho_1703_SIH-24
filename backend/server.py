from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.openapi.utils import get_openapi
import uvicorn
from routes import AuthRoutes, ArticleRoutes, PartitionRoutes
from dotenv import load_dotenv

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

# Root endpoint
@app.get("/")
async def root():
    return {"Government": "Constitution of India is running properly 😊"}

# Include routers in the main app
app.include_router(AuthRoutes.router)
app.include_router(ArticleRoutes.router)
app.include_router(PartitionRoutes.router)

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
    uvicorn.run(app, host="localhost", port=9999)
