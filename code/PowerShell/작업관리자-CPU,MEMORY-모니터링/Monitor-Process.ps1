# [Monitor-Process.ps1]
param (
    [Parameter(Mandatory=$true)]
    [int]$targetPid
)

# 1. 시스템의 논리 프로세서 개수 확인 (CPU 환산용)
$cpuCores = (Get-CimInstance Win32_ComputerSystem).NumberOfLogicalProcessors

# 2. 인스턴스 이름 찾기
$proc = (Get-Counter "\Process(*)\ID Process").CounterSamples | Where-Object {$_.RawValue -eq $targetPid} | Select-Object -First 1

if ($proc) {
    $instanceName = $proc.InstanceName
    Write-Host "`n[모니터링 시작] 대상: $instanceName (PID: $targetPid)" -ForegroundColor Green
    Write-Host "모드: 작업 관리자 일치화 모드" -ForegroundColor Gray
    Write-Host "--------------------------------------------------------"
    Write-Host "시각`t`tCPU(%)`t메모리(MB)"
    Write-Host "--------------------------------------------------------"

    while($true) {
        try {
            $counters = (Get-Counter "\Process($instanceName)\% Processor Time", "\Process($instanceName)\Working Set - Private").CounterSamples
            
            $cpuUsage = [math]::Round($counters[0].CookedValue / $cpuCores, 1)
            $memUsage = [math]::Round($counters[1].RawValue / 1MB, 1)

            $time = Get-Date -Format "HH:mm:ss"
            Write-Host "$time`t`t$cpuUsage%`t`t$memUsage MB"
            
            Start-Sleep -Seconds 1
        }
        catch {
            Write-Host "`n프로세스가 종료되었습니다." -ForegroundColor Red
            break
        }
    }
} else {
    Write-Host "PID $targetPid 프로세스를 찾을 수 없습니다." -ForegroundColor Yellow
}