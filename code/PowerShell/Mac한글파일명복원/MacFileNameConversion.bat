@echo off
pushd "%~dp0"

:: PowerShell 스크립트 실행
:: -ExecutionPolicy Bypass는 권한 제한을 일시적으로 해제하여 스크립트가 원활히 실행되게 합니다.
powershell.exe -ExecutionPolicy Bypass -File "MacFileNameConversion.ps1"

pause