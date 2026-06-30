$files = Get-ChildItem -Path "." -Recurse -Include *.html
$newBlock = '<ul class="subdropdown">
    <li><a href="water-filling-machine.html">Water Filling Machine</a></li>
    <li><a href="juice-filling-machine.html">Juice Filling Machine</a></li>
    <li><a href="carbonated-drink-filling-machine.html">Carbonated Drink (CSD) Filling Machine</a></li>
    <li><a href="beer-liquor-filling-machine.html">Beer &amp; Liquor Filling Machine</a></li>
    <li><a href="milk-dairy-filling-machine.html">Milk &amp; Dairy Filling Machine</a></li>
    <li><a href="edible-oil-filling-machine.html">Edible Oil Filling Machine</a></li>
    <li><a href="lube-oil-filling-machine.html">Lube Oil Filling Machine</a></li>
    <li><a href="chemical-pesticide-filling-machine.html">Chemical &amp; Pesticide Filling Machine</a></li>
</ul>'

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw
    $pattern = '(?s)<ul class="subdropdown">\s*<li><a href="water-filling-machine\.html">Water Filling Machine</a></li>\s*<li><a href="juice-filling-machine\.html">Juice Filling Machine</a></li>\s*(?:<br>)?\s*<li><a href="beer-filling-machine\.html">Beer Filling Machine</a></li>\s*</ul>'
    if ($content -match $pattern) {
        $content = $content -replace $pattern, $newBlock
        Set-Content -Path $file.FullName -Value $content
        Write-Output "Updated: $($file.Name)"
    }
}
Write-Output "Done"
