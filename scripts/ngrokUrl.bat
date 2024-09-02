@echo off

REM Send a GET request to the Ngrok API endpoint and output the URL
powershell -Command "& {$url = Invoke-RestMethod -Uri 'http://localhost:4040/api/tunnels' | Select-Object -ExpandProperty tunnels | Select-Object -First 1 -ExpandProperty public_url; Write-Output $url}"