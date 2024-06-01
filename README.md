<p align="center">
  <img src="https://github.com/Jimzical/Gyro-socket/assets/97384467/ed2f5a33-a1aa-432e-9050-6128ed260f3f" alt="title"/>
</p>


A fun game to Fly around a city using just your phone by scanning a QR code to connect to the website

Uses the `Gyroscope` of your phone to control the plane in the simulator which is connected using `Sockets` and then the game is displayed on the website with the help of `Three.js`

# Requirements
- Node.js ([You can use this Link](https://nodejs.org/en/download))
- Ngrok ([You can use this Link](https://ngrok.com/download))

# How To Intall
1. Clone the repo
``` bash
git clone https://github.com/Jimzical/Gyro-socket.git
```

2. Install the dependencies
``` bash
npm install
```


# How To Run

1. Put the path of ngrok in ngrokRunner.bat, example: `YOUR_PATH_TO_NGROK/ngrok.exe`
``` bash
@echo off

REM Set the path to the Ngrok executable
set "ngrok_path=YOUR_PATH_TO_NGROK/ngrok.exe"

REM Start Ngrok with the specified path and port in the background
start "" "%ngrok_path%" http 8000
```


2. Run runner.bat
``` bash
./runner.bat
```

# Using the Website

1. Go to the Ngrok URL
![image](https://github.com/Jimzical/Gyro-socket/assets/97384467/76d6f19d-7c0d-44e1-8b07-8c1b9e409378)

2. Scan the QR with your phone </br>
<p align="center">
  <img src="https://github.com/Jimzical/Gyro-socket/assets/97384467/6b6168d6-eca2-41df-bf1e-d438c36c1c11">
</p>
4. Then Click the Game button on the website
 <p align="center">
  <img src="https://github.com/Jimzical/Gyro-socket/assets/97384467/c0e9409a-6a67-4dda-bab5-42807147e51e">
</p>
5. Now click the button on your phone to start flying around!


# Whats New

- Imporved Code Structure
- Created Scripts to run everything


# Future Plans
- Add more features to the game.
  - Need to figure out how to import models, currenlty facing some issues
  - Need to figure out how to add a plane model that are camera follows in 3rd person
  - Fix the sky with a Sky cube texture, currently facing some issues
- Possibly make a Fruit Ninja game out of this
- Make the index.html file look nicer (can use 3js here as well) and add a navbar
