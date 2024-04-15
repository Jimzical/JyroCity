import requests

url = 'http://127.0.0.1:8000/data'
count = 1
while True:
    data = {'value': count}
    response = requests.post(url, json=data)
    count += 1

