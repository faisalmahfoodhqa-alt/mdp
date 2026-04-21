$logPath = "C:\Users\faisal_new\.gemini\antigravity\brain\08600504-00e7-4ce5-8083-75b8173b9234\.system_generated\logs\overview.txt"
$lines = [System.IO.File]::ReadAllLines($logPath, [System.Text.Encoding]::UTF8)

function Restore-File($fileName, $outPath) {
    $start = -1
    $end = -1
    for ($i=0; $i -lt $lines.Length; $i++) {
        if ($lines[$i] -match "File Path: .*$fileName") {
            for ($j=$i; $j -lt $i+20; $j++) {
                if ($lines[$j] -match "^1: ") {
                    $start = $j
                    break
                }
            }
            if ($start -ne -1) {
                for ($j=$start; $j -lt $lines.Length; $j++) {
                    if ($lines[$j] -match "The above content shows the entire, complete file contents") {
                        $end = $j - 1
                        break
                    }
                }
                break
            }
        }
    }
    if ($start -ne -1 -and $end -ne -1) {
        $outLines = New-Object System.Collections.Generic.List[string]
        for ($k=$start; $k -le $end; $k++) {
            $outLines.Add(($lines[$k] -replace '^\d+(: |:)', ''))
        }
        [System.IO.File]::WriteAllLines($outPath, $outLines, [System.Text.Encoding]::UTF8)
        Write-Output "Restored $fileName to $outPath successfully."
    } else {
        Write-Output "Could not find $fileName in logs"
    }
}

Restore-File "Register.jsx" "C:\Users\faisal_new\Downloads\‏‏my-website - نسخة\src\pages\Register.jsx"
Restore-File "SellerLocationStep.jsx" "C:\Users\faisal_new\Downloads\‏‏my-website - نسخة\src\components\registration\SellerLocationStep.jsx"
