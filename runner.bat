@echo off

call scripts/ngrokRunner.bat


@REM ______________________________________OLD_______________________________________________________..........
REM Run the server code in the background
start /B call scripts/serverRunner.bat

@REM REM Open the URL
call scripts/websiteRunner.bat
@REM ______________________________________OLD_______________________________________________________^^^^^^^^^`


@REM ______________________________________NEW_______________________________________________________..........\

@REM The idea here is that the website opeing code will do its timeout stuff in a hidden window
@REM While this will sun the node server on the main termnial window. This way we can see the server logs and easily stop the server by pressing ctrl+c

@REM PREVIOUSLY: had the issue where the server would run in the background and we would have to manually kill the process and it was reaaly annoying

@REM TODO test this out and see if it works

@REM start /B call scripts/webRunner.bat
@REM call scripts/serverRunner.bat
@REM ______________________________________NEW_______________________________________________________^^^^^^^^^`
