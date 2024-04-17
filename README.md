# Wii-U Simulator
A simple Wii U simulator that lets you use your phone as a Wii Remote to  fly around a city

Uses the Gyroscope of your phone to control the plane in the simulator which is connected using sockets and then the game is displayed on the website with the help of Three.js

# Requirements
- Node.js
  > [You can use this Link](https://nodejs.org/en/download)
- Ngrok
  > [You can use this Link](https://ngrok.com/download)

# How To Intall
1. Clone the repo
```
git clone https://github.com/Jimzical/Gyro-socket.git
```

2. Install the dependencies
```
npm install
```


# How To Run

1. Run Ngrok
```
ngrok http 8000
```

2. Get the Ngrok URL and replace it in the game.html and phone.html (will make this better later on)

3. Run the server
```
node server.js
```
<p align="center">
  <img src="https://github.com/Jimzical/Gyro-socket/assets/97384467/6b6168d6-eca2-41df-bf1e-d438c36c1c11">
</p>

# Future Plans
- Add more features to the game.
  - Need to figure out how to import models, currenlty facing some issues
  - Need to figure out how to add a plane model that are camera follows in 3rd person
  - Fix the sky with a Sky cube texture, currently facing some issues
- Possibly make a Fruit Ninja game out of this
- Refactor the code to look nicer
- Fix the .env plan for storing the ngrok url