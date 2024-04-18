@echo off
setlocal EnableDelayedExpansion

REM Send a GET request to the Ngrok API endpoint and parse JSON response using PowerShell
powershell -Command "& {$url = Invoke-RestMethod -Uri 'http://localhost:4040/api/tunnels' | Select-Object -ExpandProperty tunnels | Select-Object -First 1 -ExpandProperty public_url; $url | Out-File -Encoding ASCII 'scripts/url.txt'}"

endlocal