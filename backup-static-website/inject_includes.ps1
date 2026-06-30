$headerHtml = Get-Content -Raw -Path "components\header.html"
$footerHtml = Get-Content -Raw -Path "components\footer.html"

# Get all html files except header.html, footer.html, and those starting with test
$files = Get-ChildItem -Filter "*.html" | Where-Object { $_.Name -ne "header.html" -and $_.Name -ne "footer.html" -and -not $_.Name.StartsWith("test") }

foreach ($file in $files) {
    $content = Get-Content -Raw -Path $file.FullName

    $customizedHeader = $headerHtml
    if ($file.Name -ne "index.html") {
        $customizedHeader = $customizedHeader.Replace('class="site-header"', 'class="site-header scrolled"')
        $customizedHeader = $customizedHeader.Replace('<span class="hamburger"></span>', '<span class="hamburger" style="background: var(--text-main);"></span>')
    }

    # Replace Header: from <!-- Header --> to </header>
    $headerRegex = "(?is)<!-- Header -->.*?</header>"
    $content = $content -replace $headerRegex, $customizedHeader

    # Replace Footer: from <!-- (CTA & )?Footer --> to before <script src="js/main.js"></script>
    $footerRegex = "(?is)<!-- (?:CTA & )?Footer -->.*?(?=<script\s+src=`"js/main\.js`"></script>)"
    $content = $content -replace $footerRegex, ($footerHtml + "`r`n    ")

    Set-Content -Path $file.FullName -Value $content -Encoding UTF8
    Write-Host "Updated $($file.Name)"
}

Write-Host "All HTML files updated successfully."
