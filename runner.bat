@echo off

REM Open the URL
call scripts/websiteRunner.bat

REM Run the server code in the background
start /MIN call scripts/serverRunner.bat
