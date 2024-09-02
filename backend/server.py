from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
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


@app.get("/")
async def root():
    return {"Government": "Constitution of India is running properly 😊"}


if __name__ == "__main__":
    uvicorn.run(app, host="localhost", port=5000)
