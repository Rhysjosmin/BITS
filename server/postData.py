import requests

# Replace 'your_endpoint_url' with the actual endpoint URL you want to send requests to
endpoint_url = 'https://bits-bz45.onrender.com/Send'

# Sample array of JSON data
json_array = [
    {'HeartRate': 72, 'SpO2': 95},
    {'HeartRate': 85, 'SpO2': 92},
    {'HeartRate': 78, 'SpO2': 96},
    {'HeartRate': 65, 'SpO2': 94},
    {'HeartRate': 91, 'SpO2': 97},
    {'HeartRate': 73, 'SpO2': 93},
    {'HeartRate': 82, 'SpO2': 91},
    {'HeartRate': 69, 'SpO2': 95},
    {'HeartRate': 88, 'SpO2': 98},
    {'HeartRate': 77, 'SpO2': 90},
    {'HeartRate': 70, 'SpO2': 96},
    {'HeartRate': 79, 'SpO2': 92},
    {'HeartRate': 84, 'SpO2': 93},
    {'HeartRate': 75, 'SpO2': 97},
    {'HeartRate': 68, 'SpO2': 94},
    {'HeartRate': 81, 'SpO2': 95},
    {'HeartRate': 71, 'SpO2': 96},
    {'HeartRate': 90, 'SpO2': 91},
    {'HeartRate': 74, 'SpO2': 98},
    {'HeartRate': 83, 'SpO2': 92},
    {'HeartRate': 76, 'SpO2': 93},
    {'HeartRate': 87, 'SpO2': 97},
    {'HeartRate': 66, 'SpO2': 90},
    {'HeartRate': 80, 'SpO2': 94},
    {'HeartRate': 89, 'SpO2': 96},
    {'HeartRate': 67, 'SpO2': 95},
    {'HeartRate': 86, 'SpO2': 98},
    {'HeartRate': 92, 'SpO2': 93},
    {'HeartRate': 63, 'SpO2': 91},
    {'HeartRate': 94, 'SpO2': 97},
    {'HeartRate': 61, 'SpO2': 92},
    {'HeartRate': 95, 'SpO2': 96},
    {'HeartRate': 62, 'SpO2': 94},
    {'HeartRate': 93, 'SpO2': 95},
    {'HeartRate': 64, 'SpO2': 93},
    {'HeartRate': 96, 'SpO2': 98},
    {'HeartRate': 59, 'SpO2': 90},
    {'HeartRate': 97, 'SpO2': 91},
    {'HeartRate': 98, 'SpO2': 97},
    {'HeartRate': 99, 'SpO2': 95},
    {'HeartRate': 100, 'SpO2': 96},
    {'HeartRate': 60, 'SpO2': 92},
    {'HeartRate': 61, 'SpO2': 94},
    {'HeartRate': 62, 'SpO2': 96},
    {'HeartRate': 63, 'SpO2': 98},
    {'HeartRate': 64, 'SpO2': 90},
    {'HeartRate': 65, 'SpO2': 91},
    {'HeartRate': 66, 'SpO2': 92},
    {'HeartRate': 67, 'SpO2': 93},
    {'HeartRate': 68, 'SpO2': 94},
    {'HeartRate': 69, 'SpO2': 95}
    # ... 50 items in total
]

import time
# Function to send POST requests with JSON data
def send_requests(data):
    for json_data in data:
        time.sleep(5)
        try:
            response = requests.post(endpoint_url, json=json_data)
            print(f"Sent data: {json_data}")
            print(f"Response: {response.status_code} - {response.text}\n")
        except requests.exceptions.RequestException as e:
            print(f"Request failed: {e}\n")

# Sending POST requests for each element in the array
send_requests(json_array)