# Plan

## Step 1: Get the orientation data

- Use the stupid `Flutter` app
  - ## Requirements
  - Will reqiure a way to first convetr the weird data to 360 degrees format
  - Will require a way to get the data from the app
    - Either using 
      - Sockets
      - Post data using nodejs rest api
      - Rabbitmq or some other message queue
  - ## Pros
    - Sounds Badass
    - Got something kinda working
    - Might be simpler to connect once the flutter details are down compared to a website
  - ## Cons
    - Pain in the ass to learn flutter
    - Hard to say have good knowlege about the topic, its all GPT basically
    - User point of veiw kinda lame
    - Cant use the QR code idea
  
- Create a website for it
  - ## Requirements
    - May have to make some sort of website or make a nodejs server thingy for it to work, I dont know so kinda ass
    - Might actually make sense to use some sort of message queue
  - ## Pros
    - The basic data set up
    - better than flutter data
    - can use the QR code idea
  - ## Cons
    - Tougher to figure out how to connect



# Step 2: Making the base game

## Requirements
- Need to learn basic 3js
- get a city model
- import the models
- set up basic camera movements
- OPTIONAL
  - > get a plane model
  - > set up plane to be 3rd person
- set a constant speed or have the user press a button which will give data to decide movement

## USER EXPERINCE
1. Open website -> decent looking but simple works
2. Shows a QR for phone app
   1. May need to set up the server to automatically set it or hard code
3. Users scans QR
4. User taken to the website from step 1
5. He can see Calibration Details 
   1. > (i may make the alpha value alplha-270 to make it 0 or kust -90 to make it 180 and have the values easy to set up from that point)
   2. Optional
   3. > He gets a start button to start sending data or else we keep barraging
   4. > this start button also keeps the plane going (make it less stressful for everyone)

# Step 3: Connecting the Two
- Need to figure out how to connect the two
- Need to figure out how to send data from the phone to the website
- May use 2 differnt websites or some crap
- May use some sort of message queue
- Can be done by lookinh into how to make a server or how multiplayer games are made


# Final:
Look into how this game could be made scalable or how it could be made into a multiplayer game
```
  