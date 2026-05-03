$files = Get-ChildItem -Filter *.html -Recurse

$oldInput = '<input type="text" placeholder="kindly Inform Your Requirement" required>'
$newSelect = @'
<select name="requirement" required class="form-select" style="padding: 12px 15px; border: 1px solid rgba(0, 0, 0, 0.1); border-radius: 6px; font-family: inherit; font-size: 0.95rem; width: 100%; transition: all 0.3s ease;">
                            <option value="" disabled selected>Select Product Requirement</option>
                            <option value="Water Filling Machine">Water Filling Machine</option>
                            <option value="Juice Filling Machine">Juice Filling Machine</option>
                            <option value="Beer Filling Machine">Beer Filling Machine</option>
                            <option value="Automatic Sticker Labeling Machine">Automatic Sticker Labeling Machine</option>
                            <option value="Fully Automatic Shrink Wrapping Machine">Fully Automatic Shrink Wrapping Machine</option>
                            <option value="Semi Automatic Shrink Wrapping Machine">Semi Automatic Shrink Wrapping Machine</option>
                            <option value="Industrial S.S R.O Plant">Industrial S.S R.O Plant</option>
                            <option value="Fully Auto Blow Moulding Machine">Fully Auto Blow Moulding Machine</option>
                            <option value="Semi Auto Blow Moulding Machine">Semi Auto Blow Moulding Machine</option>
                            <option value="Inkjet Batch Coding">Inkjet Batch Coding</option>
                            <option value="Chemical Lab">Chemical Lab</option>
                            <option value="Micro-Biology Lab">Micro-Biology Lab</option>
                            <option value="Other">Other Requirement</option>
                        </select>
'@

foreach ($file in $files) {
    $content = Get-Content -Path $file.FullName -Raw
    if ($content.Contains($oldInput)) {
        $content = $content.Replace($oldInput, $newSelect)
        Set-Content -Path $file.FullName -Value $content -Encoding UTF8
    }
}

# Now update js/main.js
$jsFile = "js/main.js"
$jsContent = Get-Content -Path $jsFile -Raw
$oldJs = "requirement = form.querySelector('input[placeholder*=`"Requirement`"]')?.value || 'N/A';"
$newJs = "requirement = form.querySelector('select[name=`"requirement`"]')?.value || form.querySelector('input[placeholder*=`"Requirement`"]')?.value || 'N/A';"
if ($jsContent.Contains($oldJs)) {
    $jsContent = $jsContent.Replace($oldJs, $newJs)
    Set-Content -Path $jsFile -Value $jsContent -Encoding UTF8
}

Write-Host "Updated forms and javascript successfully."
