@echo off

REM Set the path to the Ngrok executable
set "ngrok_path=YOUR_PATH_TO_NGROK/ngrok.exe"

REM Start Ngrok with the specified path and port in the background
start "" "%ngrok_path%" http 8000


