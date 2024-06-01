@echo off

call scripts/ngrokRunner.bat
call scripts/ngrokUrl.bat

set /p NGROK_URL=<scripts/url.txt
start "" %NGROK_URL%