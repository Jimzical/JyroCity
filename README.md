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

1. Put the path of ngrok in `script/ngrokpath.txt`, example: `YOUR_PATH_TO_NGROK/ngrok.exe`

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
<!--   <img src="https://github.com/Jimzical/Gyro-socket/assets/97384467/c0e9409a-6a67-4dda-bab5-42807147e51e"> -->
</p>

  <video width="640" height="480" controls>
    <source src="example/gameplay.mp4" type="video/mp4">
    Your browser does not support the video tag.
  </video>

 


https://github.com/Jimzical/JyroCity/assets/97384467/4b87a78d-1817-4574-b35c-01c18531348b





5. Now click the button on your phone to start flying around!


# Whats New
 - Fixed the sky using skycubes
 - Imported actual models for the city and removed the placeholders
 - Fixed Gimball effect and improved movement


# Future Plans
- Automate the ngrok path stuff
- Possibly make a FruitNinja like game out of this
