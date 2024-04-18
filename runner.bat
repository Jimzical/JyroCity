@echo off

REM Run the server code in the background
start /B call scripts/serverRunner.bat

REM Open the URL
call scripts/websiteRunner.bat