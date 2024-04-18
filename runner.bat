@echo off
call scripts/ngrokRunner.bat
call scripts/ngrokUrl.bat
node server.js