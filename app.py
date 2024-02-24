from fastapi import FastAPI, Form, Request
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
import pymongo


app = FastAPI()
app.mount("/static", StaticFiles(directory="static"), name="static")
templates = Jinja2Templates(directory="templates")

conn = pymongo.MongoClient("mongodb://localhost:27017/")
db = conn['Motormentor']
collection = db['user_data']

@app.get('/')
async def root(request:Request):
    return templates.TemplateResponse("index.html",{"request":request})

@app.get('/login')
async def root(request:Request):
    return templates.TemplateResponse("login.html",{"request":request})

@app.post('/authenticate')
async def login(request:Request,email:str = Form(...),password:str = Form(...)):

    user_data = collection.find_one({"email":email},{'_id':0})
    if(user_data["password"]==password):
        return templates.TemplateResponse("index.html",{"request":request})
    else:
        return ({"data":"not found"})

@app.post('/submit_data')
async def create(request:Request,email:str = Form(...),password:str = Form(...),phone:int = Form(...)):
    
    data = {
        "email":email,
        "password":password,
        "phone":phone
    }
    collection.insert_one(data)
    return templates.TemplateResponse("index.html",{"request":request})


@app.get('/create_account')
async def create(request:Request):
    return templates.TemplateResponse("create.html",{"request":request})
    
   