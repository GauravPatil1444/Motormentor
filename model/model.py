import pandas as pd
from sklearn.preprocessing import LabelEncoder
from sklearn.ensemble import RandomForestRegressor

df = pd.read_csv('model/processed.csv')
tdf = pd.read_csv('model/model_data.csv')
x = df.drop(['Price'],axis='columns') 
le = LabelEncoder()
x['Name'] = le.fit_transform(tdf.en_Name)

rf = RandomForestRegressor(n_estimators=100)

rf.fit(x,df.Price)

def prediction(year,kmdriven,mileage,engine,power,Seats,fuel_type,Transmission,Ownertype,car_name):
   en_carname = le.transform([car_name.capitalize()])
   res = rf.predict([[year,kmdriven,mileage,engine,power,Seats,fuel_type,Transmission,Ownertype,en_carname[0]]])
   return res[0]



