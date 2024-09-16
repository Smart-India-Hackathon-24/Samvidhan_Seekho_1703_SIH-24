from fastapi import APIRouter, Depends
from fastapi.security import OAuth2PasswordBearer
from Main import extractArticlesDataFromJSONandAddToDatabase
from .AuthRoutes import get_current_user
from Database.DatabaseFunctions import *
from fastapi.responses import JSONResponse

router = APIRouter(tags=["Constitution Articles"])

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")


@router.get("/addConstitutionArticle", dependencies=[Depends(oauth2_scheme)])
async def add_constitution_article(current_user: dict = Depends(get_current_user)):
    extractArticlesDataFromJSONandAddToDatabase()
    return {"message": "Constitution article added successfully"}


@router.delete("/deleteAllArticles", dependencies=[Depends(oauth2_scheme)])
async def delete_constitution_article(current_user: dict = Depends(get_current_user)):
    deleteAllArticlesFromDatabase()
    return {"message": "All articles deleted successfully"}


@router.get("/getArticles", dependencies=[Depends(oauth2_scheme)])
async def get_articles(current_user: dict = Depends(get_current_user)):
    articles = getAllArticlesFromDatabase()
    return JSONResponse(content={"articles": articles})


@router.get("/getArticleById/{article_id}", dependencies=[Depends(oauth2_scheme)])
async def get_article_by_id(
    article_id: str, current_user: dict = Depends(get_current_user)
):
    article = getArticleByIDFromDatabase(article_id)
    return {"article": "done successfully"}
