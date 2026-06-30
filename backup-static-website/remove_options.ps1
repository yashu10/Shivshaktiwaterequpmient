$files = Get-ChildItem -Filter *.html -Recurse

$lineToRemove1 = '                            <option value="Chemical Lab">Chemical Lab</option>'
$lineToRemove2 = '                            <option value="Micro-Biology Lab">Micro-Biology Lab</option>'

foreach ($file in $files) {
    $content = Get-Content -Path $file.FullName -Raw
    $modified = $false

    if ($content.Contains($lineToRemove1)) {
        $content = $content.Replace($lineToRemove1 + "`r`n", "")
        $content = $content.Replace($lineToRemove1 + "`n", "")
        $content = $content.Replace($lineToRemove1, "")
        $modified = $true
    }
    
    if ($content.Contains($lineToRemove2)) {
        $content = $content.Replace($lineToRemove2 + "`r`n", "")
        $content = $content.Replace($lineToRemove2 + "`n", "")
        $content = $content.Replace($lineToRemove2, "")
        $modified = $true
    }

    if ($modified) {
        Set-Content -Path $file.FullName -Value $content -Encoding UTF8
    }
}

Write-Host "Removed Chemical Lab and Micro-Biology Lab options successfully."
