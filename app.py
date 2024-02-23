from fastapi import FastAPI, Form, Request
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates


app = FastAPI()
app.mount("/static", StaticFiles(directory="static"), name="static")
templates = Jinja2Templates(directory="templates")

@app.get('/')
async def root(request:Request):
    return templates.TemplateResponse("index.html",{"request":request})

@app.get('/login')
async def root(request:Request):
    return templates.TemplateResponse("login.html",{"request":request})

@app.post('/authenticate')
async def login(user:str):
    return ({"user":user})

@app.get('/create_account')
async def create(request:Request):
    return templates.TemplateResponse("create.html",{"request":request})
    