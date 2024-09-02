@echo off

call scripts/ngrokRunner.bat

REM Capture the output of ngrokUrl.bat
for /f "delims=" %%i in ('call scripts/ngrokUrl.bat') do set NGROK_URL=%%i

REM Open the URL
start "" %NGROK_URL%