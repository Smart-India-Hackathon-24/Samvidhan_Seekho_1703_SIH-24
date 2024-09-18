from langchain_core.prompts import ChatPromptTemplate
from langchain_groq import ChatGroq
from langchain_core.output_parsers import StrOutputParser, XMLOutputParser
from typing import List, Optional
from langchain_core.pydantic_v1 import BaseModel, Field
import os
from dotenv import load_dotenv

load_dotenv()

def chatbot(message1: str) -> str:
    """Simulate a chatbot conversation based on the generated report."""
    # print(message1)
    # print(type(message1))
    # print(report)
    # print(type(report))
    chat_bot_prompt = ChatPromptTemplate.from_messages(
        [
            (
                "system",
                f"""
                    You are an expert conversational AI chatbot. 
                    You will engage in a conversation with a user who is seeking information on Constitution of India which is very dynamic in nature.
                    You will give the user the response it wants by whatever knowledge you have about the articles it chapters it parts and others. 
                    The user will ask you questions related to it.
                    If by chance any user asks you the question that is not related to the Constitution of India than you will very politely reply you don't have knowledge regarding it.
                    You will act as if you have knowledge about the Constitution of India only 
                    Your responses should be informative, engaging, and tailored to the user's queries. 
                    Your responses should be bref and to the point.
                    Response length should 3-4 sentences.
                """,
            ),
            ("human", "{message}"),
        ]
    )

    chat_bot = ChatGroq(
        temperature=0,
        groq_api_key=os.environ.get("GROQ_API_KEY"),
        model_name="llama3-8b-8192",
    )
    chat_bot_chain = chat_bot_prompt | chat_bot | StrOutputParser()

    res = chat_bot_chain.invoke({"message": message1})
    return res


def meaningBot(message1: str) -> str:
    """Simulate a chatbot conversation based on the generated report."""
    # print(message1)
    # print(type(message1))
    # print(report)
    # print(type(report))
    chat_bot_prompt = ChatPromptTemplate.from_messages(
        [
            (
                "system",
                f"""
                    You are an expert conversational AI chatbot. 
                    You will engage in a conversation with a user who is seeking information on Constitution of India which is very dynamic in nature.
                    User will provide you the text from the Constitution of the India and it will br anything from Constition.
                    You will need to breakdown the text in the simpler form so that user can understand the meaning of the sentence.
                    You will provide user only that kind of information nothing more than that.
                    Also the words which require good amount of language knowledge please replace them with the simpler meaning or any other word with same meaning from the dictionary.
                    Remember this is very sensitive thing so while making things easier to understand the meaning of the original text and the text you provided both should have same context.
                    You will give the user the response it wants by whatever knowledge you have about the articles it chapters it parts and others. 
                    If by chance any user asks you the question that is not related to the Constitution of India than you will very politely reply you don't have knowledge regarding it.
                    You will act as if you have knowledge about the Constitution of India only 
                    Your responses should be informative, engaging, and tailored to the user's queries. 
                    Your responses should be bref and to the point.
                    Response length should 2-4 sentences.
                """,
            ),
            ("human", "{message}"),
        ]
    )

    chat_bot = ChatGroq(
        temperature=0,
        groq_api_key=os.environ.get("GROQ_API_KEY"),
        model_name="llama3-8b-8192",
    )
    chat_bot_chain = chat_bot_prompt | chat_bot | StrOutputParser()

    res = chat_bot_chain.invoke({"message": message1})
    return res