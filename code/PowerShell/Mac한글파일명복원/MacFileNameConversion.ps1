$path = "C:\Users\canon\Downloads\Mac파일명복원"

Get-ChildItem -Recurse -Path $path | Where-Object { $_.Extension -ne ".ps1" } | ForEach-Object {
    $oldName = $_.Name
    $newName = $oldName.Normalize([Text.NormalizationForm]::FormC)
    if ($oldName -ne $newName) {
        $oldFull = $_.FullName
        $newFull = Join-Path $_.DirectoryName $newName
        Rename-Item -LiteralPath $oldFull -NewName $newName
        Write-Host "변환 완료: $oldName → $newName"
    }
}