@echo off

:: Check if the parameter (PID) is entered.
if "%1"=="" (
    echo [Error] Process ID ^(PID^) was not entered.
    echo Usage: run_monitor.bat [PID]
    echo Example: run_monitor.bat 17552
    echo.
    pause
    exit /b
)

:: %1 means the first value entered when running the batch file.
powershell -ExecutionPolicy Bypass -File ".\Monitor-Process.ps1" -targetPid %1

pause
