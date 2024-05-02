# N: Normal beat
# S: Supraventricular premature beat
# V: Premature ventricular contraction
# F: Fusion of ventricular and normal beat
# Q: Unclassifiable beat
# M: myocardial infarction
from twilio.rest import Client
from flask import Flask, request, json
from flask_cors import CORS
import matplotlib.pyplot as plt
import matplotlib
import random
import requests
import numpy as np
from datetime import datetime
import sqlite3



TOKEN = ''
API_URL = "https://api-inference.huggingface.co/models/gianlab/swin-tiny-patch4-window7-224-finetuned-ecg-classification"
headers = {"Authorization": f"Bearer {TOKEN}"}


def query(filename):
    with open(filename, "rb") as f:
        data = f.read()
    response = requests.post(API_URL, headers=headers, data=data)
    return response.json()


matplotlib.use('Agg')

app = Flask(__name__)
cors = CORS(app)
lastTimeESPSentData = datetime.utcnow()
sensor_live = False
timeDifference = 0
currentData = {
    'HeartRate': 0,
    'SpO2': 0
}
liveD = []
DataTemplate = {
    'HeartRate': None,
    'SpO2': None
}


@app.before_request
def before_request():
    global timeDifference, sensor_live
    timeDifference = (datetime.utcnow()-lastTimeESPSentData).total_seconds()
    sensor_live = True if timeDifference < 30 else False


@app.route('/live_Data')
def LiveData():
    return json.dumps({'data': liveD, 'sensor_live': sensor_live})


@app.route('/send', methods=['POST'])
def Send():
    global lastTimeESPSentData
    lastTimeESPSentData = datetime.utcnow()
    print(request.json)
    sentData = request.json
    currentData = sentData
    currentData['CurrentTime'] = lastTimeESPSentData
    liveD.append(currentData)
    if (len(liveD) > 10):
        liveD.pop(0)
    return json.dumps({'done': True})


# N: Normal beat
# S: Supraventricular premature beat
# V: Premature ventricular contraction
# F: Fusion of ventricular and normal beat
# Q: Unclassifiable beat
# M: myocardial infarction

@app.route('/Predict')
def Predict():
    # plt.clf()
    # plt.plot(liveD)
    # plt.axis('off')
    # plt.savefig("test.png", bbox_inches='tight')
    # pred = query("test.png")

    pred=[
        {
         'score': random.randint(0,100),
        'label': 'N'
    },
        {
         'score': random.randint(0,100),
        'label': 'S'
    },
        {
         'score': random.randint(0,100),
        'label': 'V'
    },
        {
         'score': random.randint(0,100),
        'label': 'F'
    },
        {
         'score': random.randint(0,100),
        'label': 'Q'
    },
        {
         'score': random.randint(0,100),
        'label': 'M'
    },
     
        ]
    maximumValue = {
        'score': 0,
        'label': None
    }
    print(pred)
    for i in pred:
        if (i["score"] > maximumValue["score"]):
            print(f"new Max: {i}")
            maximumValue = i
    return json.dumps({'done': True, 'pred': maximumValue})


def DatabaseINIT():
    conn = sqlite3.connect('sql.db')

    cursor = conn.cursor()
    cursor.execute("DROP TABLE IF EXISTS USERS")
    table = """ CREATE TABLE USERS (
                Username CHAR(25) NOT NULL,
                Password CHAR(25),
                Role CHAR(25),
                Address Char(255)
            ); """
    cursor.execute(table)
    cursor.execute('''INSERT INTO USERS VALUES ('John','JOHN1234','Doctor','10, Calangute Beach Road, Calangute, Goa')''')
    cursor.execute('''INSERT INTO USERS VALUES ('James','JAMES1234','Staff','25, Panaji Market Street, Panaji, Goa')''')
    cursor.execute('''INSERT INTO USERS VALUES ('Jacob','JACOB1234','Patient','7, Anjuna Beach Road, Anjuna, Goa')''')
    conn.commit()
    conn.close()


@app.route('/SendSMS/<Username>/<Problem>')
def SendSMS(Username, Problem):
    conn = sqlite3.connect('sql.db')
    cursor = conn.cursor()
    address = cursor.execute(
        f"SELECT * FROM USERS WHERE Username='{Username}'").fetchall()[0][3]
    conn.close()
    print(address)
    
    account_sid=os.environ.get('account_sid')
    auth_token=os.environ.get('auth_token')
    client = Client(account_sid, auth_token)

    message = client.messages.create(
        from_='+12055709068',
        to='+918806929248',
        body=f'Hello, I wanted to inform you that {Username} has been dealing with a problem known as {Problem} lately. They need quick medical attention. Kindly send the immediate medical care to his {address}.'
    )
    return json.dumps({'Done': True})


@app.route('/SignIn/<Username>/<Password>', methods=['GET'])
def SignIN(Username, Password):
    conn = sqlite3.connect('sql.db')
    cursor = conn.cursor()

    res = cursor.execute(
        f"SELECT * FROM USERS WHERE Username='{Username}'").fetchall()

    Exists = True if Password == res[0][1] else False
    return json.dumps({'Exists': Exists, 'Username': res[0][0], 'Role': res[0][2]})


if __name__ == '__main__':
    DatabaseINIT()
    app.run(debug=True, host='0.0.0.0')
