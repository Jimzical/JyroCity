@echo off

call scripts/ngrokRunner.bat
call scripts/ngrokUrl.bat
for /f %%i in (scripts/url.txt) do set "NGROK_URL=%%i"

start "" %NGROK_URL%