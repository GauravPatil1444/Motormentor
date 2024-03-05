from fastapi import FastAPI, Form, Request, Query, WebSocket
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from model.model import prediction
import pymongo
import json


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
async def login(request:Request):
    return templates.TemplateResponse("login.html",{"request":request})

@app.post('/authenticate')
async def auth(request:Request,email:str = Form(...),password:str = Form(...)):

    user_data = collection.find_one({"email":email},{'_id':0})
    if(user_data["password"]==password):
        return templates.TemplateResponse("index.html",{"request":request})
    else:
        return ({"data":"not found"})

@app.post('/submit_data')
async def submit(request:Request,email:str = Form(...),password:str = Form(...),phone:int = Form(...)):
    
    form_data = {
        "email":email,
        "password":password,
        "phone":phone
    }
    collection.insert_one(form_data)
    return templates.TemplateResponse("index.html",{"request":request})


@app.get('/create_account')
async def create(request:Request):
    return templates.TemplateResponse("create.html",{"request":request})

@app.get('/sell_car')
async def sell(request:Request):
    return templates.TemplateResponse("sell_car.html",{"request":request})
    
@app.get('/profile')
async def profile(request:Request):
    return templates.TemplateResponse("profile.html",{"request":request})

@app.get('/contact')    
async def contact(request:Request):
    return templates.TemplateResponse("contact.html",{"request":request})

# @app.websocket('/predict')
# async def contact(websocket: WebSocket):
#     await websocket.accept()

#     data = await websocket.receive_text()
#     data_dict = json.loads(data)
#     car_name = data_dict.get('car_name')
#     kmdriven = data_dict.get('kmdriven')
#     mileage = data_dict.get('mileage')
#     engine = data_dict.get('engine')
#     power = data_dict.get('power')
#     year = data_dict.get('year')
#     Seats = data_dict.get('Seats')
#     fuel_type = data_dict.get('fuel_type')
#     Transmission = data_dict.get('Transmission')
#     Ownertype = data_dict.get('Ownertype')
#     def fuel(fuel_type):
#         if fuel_type == 'Diesel':
#             return 1
#         elif fuel_type == 'Petrol':
#             return 2
#         elif fuel_type == 'CNG':
#             return 3
#         elif fuel_type == 'LPG':
#             return 4
#         else:
#             return 5

#     def Trans(Transmission):
#         if Transmission == 'Manual':
#             return 1
#         else:
#             return 2

#     def owner(Ownertype):
#         if Ownertype == 'First':
#             return 1
#         elif Ownertype == 'Second':
#             return 2
#         elif Ownertype == 'Third':
#             return 3
#         else:
#             return 4

#     await websocket.accept()

#     try:
#         prediction_result = prediction(year, kmdriven, mileage, engine, power, Seats, fuel(fuel_type), Trans(Transmission), owner(Ownertype), car_name)
#         await websocket.send_text(str({'prediction_result': prediction_result}))
#     except Exception as e:
#         await websocket.send_text(str({'error': str(e)}))
#     finally:
#         await websocket.close()

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    def fuel(fuel_type):
        if fuel_type == 'Diesel':
            return 1
        elif fuel_type == 'Petrol':
            return 2
        elif fuel_type == 'CNG':
            return 3
        elif fuel_type == 'LPG':
            return 4
        else:
            return 5

    def Trans(Transmission):
        if Transmission == 'Manual':
            return 1
        else:
            return 2

    def owner(Ownertype):
        if Ownertype == 'First':
            return 1
        elif Ownertype == 'Second':
            return 2
        elif Ownertype == 'Third':
            return 3
        else:
            return 4

    while True:
        data = await websocket.receive_text()
        data_dict = json.loads(data)
        res = prediction(int(data_dict['year']),int(data_dict['kmdriven']),int(data_dict['mileage']),int(data_dict['engine']),int(data_dict['power']),int(data_dict['Seats']),fuel(data_dict['fuel_type']),Trans(data_dict['Transmission']),owner(data_dict['Ownertype']),data_dict['car_name'])
        res = round(res,2)
        await websocket.send_text(f"Rs. {res} Lakh")
    