$template = Get-Content -Raw -Path "template.html"
$json = Get-Content -Raw -Path "data.json" | ConvertFrom-Json

foreach ($p in $json) {
    $html = $template
    $html = $html -replace '\{\{seoTitle\}\}', $p.seoTitle
    $html = $html -replace '\{\{seoDesc\}\}', $p.seoDesc
    $html = $html -replace '\{\{category\}\}', $p.category
    $html = $html -replace '\{\{title\}\}', $p.title
    $html = $html -replace '\{\{tagline\}\}', $p.tagline
    $html = $html -replace '\{\{overview\}\}', $p.overview
    $html = $html -replace '\{\{image\}\}', $p.image
    $html = $html -replace '\{\{filename\}\}', $p.filename

    $topFeaturesHtml = ""
    foreach ($f in $p.topFeatures) {
        $topFeaturesHtml += "<li><span class=`"icon`">&#10003;</span> $f</li>`n                        "
    }
    $html = $html -replace '\{\{topFeaturesHtml\}\}', $topFeaturesHtml

    $benefitsHtml = ""
    foreach ($b in $p.benefits) {
        $benefitsHtml += "<li>`n                        <span class=`"icon`">&#10003;</span>`n                        <div>`n                            <strong>$($b.title)</strong>`n                            <span style=`"display: block; color: var(--text-muted); font-size: 0.95rem; margin-top: 5px;`">$($b.desc)</span>`n                        </div>`n                    </li>`n                    "
    }
    $html = $html -replace '\{\{benefitsHtml\}\}', $benefitsHtml

    $specsHtml = ""
    foreach ($s in $p.specs) {
        $specsHtml += "<tr>`n                            <th>$($s.k)</th>`n                            <td>$($s.v)</td>`n                        </tr>`n                        "
    }
    $html = $html -replace '\{\{specsHtml\}\}', $specsHtml

    # Write file out
    [IO.File]::WriteAllText("$(Get-Location)\$($p.filename)", $html, [System.Text.Encoding]::UTF8)
    Write-Host "Generated $($p.filename)"
}

Write-Host "All files generated successfully."
