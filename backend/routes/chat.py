from fastapi import APIRouter, Depends
from fastapi.security import OAuth2PasswordBearer
from Main import extractPartitionsDataFromJSONandAddToDatabase
from .AuthRoutes import get_current_user
from Database.DatabaseFunctions import *
from Utils import bot 

router = APIRouter(tags=["Constitution Partitions"])

# oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")

# @router.get("/addConstitutionPartition", dependencies=[Depends(oauth2_scheme)])
# async def add_constitution_partition(current_user: dict = Depends(get_current_user)):
#     extractPartitionsDataFromJSONandAddToDatabase()
#     return {"message": "Constitution partition added successfully"}

# @router.delete("/deleteAllPartitions", dependencies=[Depends(oauth2_scheme)])
# async def delete_constitution_partition(current_user: dict = Depends(get_current_user)):
#     deleteAllPartitionsFromDatabase()
#     return {"message": "All partitions deleted successfully"}

@router.post("/chat")
async def chat_with_bot(data:dict):
    print(data)
    response=bot.chatbot()
    return {"response":response,"message": "Success"}
    
@router.post("/getMeaning")
async def chat_with_bot(data:dict):
    print(data)
    response=bot.meaningbot()
    return {"response":response,"message": "Success"}