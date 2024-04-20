@echo off

REM Set the path to the Ngrok executable
set "ngrok_path=C:\Users\arish\Downloads\ngrok\ngrok.exe"

REM Start Ngrok with the specified path and port in the background
start "" "%ngrok_path%" http 8000


REM Send a GET request to the Ngrok API endpoint and parse JSON response using PowerShell
powershell -Command "& {$url = Invoke-RestMethod -Uri 'http://localhost:4040/api/tunnels' | Select-Object -ExpandProperty tunnels | Select-Object -First 1 -ExpandProperty public_url; $url | Out-File -Encoding ASCII 'scripts/url.txt'}"

@REM Set the url for the server to use
for /f %%i in (scripts/url.txt) do set "NGROK_URL=%%i"
