from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import os

app = FastAPI()

# Configure CORS
origins = [
    "http://localhost:3000",
    "https://your-frontend-domain.vercel.app",  # Add your Vercel frontend domain
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
    return {"message": "Hello World"}


if __name__ == "__main__":
    # port = int(os.environ.get("PORT", 5000))
    uvicorn.run(app, host="localhost", port=5000)
