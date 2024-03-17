from flask import Flask, render_template, request
from model.model import prediction
from model.scrape import scrape as scrape_car_data 
import pymongo
# import json

app = Flask(__name__)

conn = pymongo.MongoClient("mongodb://localhost:27017/")
db = conn['Motormentor']
collection = db['user_data']

@app.route('/')
def root():
    return render_template('index.html')
@app.route('/login')
def login():
    return render_template('login.html')

@app.route('/authenticate',methods=['POST'])
def auth():
    email = request.form.get('email')
    password = request.form.get('password')
    user_data = collection.find_one({"email":email},{'_id':0})
    if(user_data["password"]==password):
        return render_template('index.html')
    else:
        return ({"data":"not found"})

@app.route('/submit_data',methods=['POST'])
def submit():
    email = request.form.get('email')
    password = request.form.get('password')
    phone = request.form.get('phone')
    form_data = {
        "email":email,
        "password":password,
        "phone":phone
    }
    collection.insert_one(form_data)
    return render_template('index.html')


@app.route('/create_account')
def create():
    return render_template('create.html')

@app.route('/sell_car')
def sell():
    return render_template('sell_car.html')
    
@app.route('/profile')
def profile():
    return render_template('profile.html')

@app.route('/contact')    
def contact():
    return render_template('contact.html')

@app.route("/get_price", methods=['POST'])
def get_price():
    try:
        data = request.json
        year = int(data.get('year', 0))
        kmdriven = int(data.get('kmdriven', 0))
        mileage = int(data.get('mileage', 0))
        engine = int(data.get('engine', 0))
        power = int(data.get('power', 0))
        Seats = int(data.get('Seats', 0))
        fuel_type = data.get('fuel_type', '')
        Transmission = data.get('Transmission', '')
        Ownertype = data.get('Ownertype', '')
        car_name = data.get('car_name', '')

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

        res = prediction(year, kmdriven, mileage, engine, power, Seats, fuel(fuel_type), Trans(Transmission), owner(Ownertype), car_name)
        res = round(res, 2)
        return f"Rs. {res} Lakh"
    except Exception as e:
        return f"An error occurred: {e}"
    
@app.route('/scrape',methods=['POST'])
def scrape_data():
    data = request.json
    return scrape_car_data(data)

if __name__ == "__main__":
    app.run(debug=True)