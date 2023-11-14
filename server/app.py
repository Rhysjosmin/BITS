# N: Normal beat
# S: Supraventricular premature beat
# V: Premature ventricular contraction
# F: Fusion of ventricular and normal beat
# Q: Unclassifiable beat
# M: myocardial infarction
import random
import requests
import numpy as np
import datetime

TOKEN=''
API_URL = "https://api-inference.huggingface.co/models/gianlab/swin-tiny-patch4-window7-224-finetuned-ecg-classification"
headers = {"Authorization": f"Bearer {TOKEN}"}
def query(filename):
    with open(filename, "rb") as f:
        data = f.read()
    response = requests.post(API_URL, headers=headers, data=data)
    return response.json()
# output = query("F123.png")
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
from flask import Flask,request,json
from flask_cors import CORS

app = Flask(__name__)
cors=CORS(app)
latestRequest=datetime.datetime.now()
i=0
liveD=[]
@app.route('/live_Data')
def LiveData():
    global i
    i+=1
    f=open('r.json')
    d=json.load(f)
    # res=(d['data'][i%(len(d['data'])-1)])
    res=random.randint(0,1000)/1000
    


    liveD.append(res)
    if(len(liveD)>10):
        liveD.pop(0)
                    
    return json.dumps({'data':liveD}) 


@app.route('/Send', methods=['POST'])    
def Send():
    global latestRequest
    return json.dumps({'done':True})



@app.route('/Predict')
def Predict():
    
    # data=request.json['data']
    plt.clf()
    plt.plot(liveD)
    plt.axis('off')
    plt.savefig("test.png", bbox_inches='tight')
    pred=query("test.png")
    max={
    'score':0,
    'label':None
    }
    for i in pred:
        if(i["score"]>max["score"]):
            max=i       
   
    return json.dumps({'done':True,'pred':max})

if __name__=='__main__':
    app.run(port='0.0.0.0')
