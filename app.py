from flask import Flask, render_template, request, jsonify
import pymongo

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
    if(user_data and user_data["password"]==password):
        data  = {'status':1,'email':email,'name':user_data["name"]}
        return jsonify(data)
    else:
        data = {"status":0}
        return jsonify(data)

@app.route('/submit_data',methods=['POST'])
def submit(): 
    name = request.form.get('name')
    email = request.form.get('email')
    password = request.form.get('password')
    phone = request.form.get('phone')
    form_data = {
        "name":name,
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

if __name__ == "__main__":
    app.run(debug=True)

    