@echo off

REM Read the path to the Ngrok executable from ngrokpath.txt
set /p ngrok_path=<scripts/ngrokpath.txt

REM Start Ngrok with the specified path and port in the background
start /MIN "" "%ngrok_path%" http 8000