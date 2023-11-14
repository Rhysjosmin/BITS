# N: Normal beat
# S: Supraventricular premature beat
# V: Premature ventricular contraction
# F: Fusion of ventricular and normal beat
# Q: Unclassifiable beat
# M: myocardial infarction
from flask import Flask, request, json
from flask_cors import CORS
import matplotlib.pyplot as plt
import matplotlib
import random
import requests
import numpy as np
from datetime import datetime

TOKEN = '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'
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
sensor_live=False
timeDifference = 0
currentData={
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
    global timeDifference,sensor_live
    timeDifference = (datetime.utcnow()-lastTimeESPSentData).total_seconds()
    sensor_live = True if timeDifference < 30 else False

@app.route('/live_Data')
def LiveData():
    return json.dumps({'data': liveD, 'sensor_live': sensor_live})


@app.route('/Send', methods=['POST'])
def Send():
    global lastTimeESPSentData
    lastTimeESPSentData = datetime.utcnow()
    print(request.json)
    sentData=request.json
    currentData=sentData
    currentData['CurrentTime']=lastTimeESPSentData
    liveD.append(currentData)
    if (len(liveD) > 10):
        liveD.pop(0)
    return json.dumps({'done': True})


@app.route('/Predict')
def Predict():
    plt.clf()
    plt.plot(liveD)
    plt.axis('off')
    plt.savefig("test.png", bbox_inches='tight')
    pred = query("test.png")
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


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
