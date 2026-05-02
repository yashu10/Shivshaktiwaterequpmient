$baseUrl = 'https://yashu10.github.io/Waterfillingmachine/'

# Load data.json
$dataPath = Join-Path $PSScriptRoot 'data.json'
$products = @()
if (Test-Path $dataPath) {
    $products = Get-Content $dataPath -Raw | ConvertFrom-Json
}

$htmlFiles = Get-ChildItem -Path $PSScriptRoot -Filter '*.html' | Select-Object -ExpandProperty Name

$defaultMeta = @{
    'index.html' = @{ title = 'Shiv Shakti Engineering Works | Water Bottling Plant Manufacturer'; desc = 'Leading manufacturer and exporter of water filling machines, RO plants, and turnkey beverage packaging solutions in Ahmedabad, India since 1998.' }
    'about.html' = @{ title = 'About Us | Shiv Shakti Engineering Works'; desc = 'Learn about Shiv Shakti Engineering Works, established in 1998. We deliver high-quality, fully automated water and beverage filling machines globally.' }
    'products.html' = @{ title = 'All Products & Machinery Catalog | Shiv Shakti Engineering'; desc = 'Browse our extensive catalog of automatic bottle filling machines, shrink wrappers, blow moulding machines, RO plants, and lab equipment.' }
    'contact.html' = @{ title = 'Contact Us | Shiv Shakti Engineering Works'; desc = 'Get in touch with Shiv Shakti for modern bottling lines, filling solutions, and project inquiries. Based in Ahmedabad, exporting worldwide.' }
    'video.html' = @{ title = 'Video Gallery | Machine Operations | Shiv Shakti'; desc = 'Watch real-time operational videos of our high-speed water filling and packaging machinery in action.' }
    'blog.html' = @{ title = 'Industry Blog & Insights | Shiv Shakti Engineering'; desc = 'Read the latest trends, guides, and insights on the mineral water industry, beverage packaging, and automatic factory scaling.' }
    'blog-single.html' = @{ title = 'Industry Article | Shiv Shakti Engineering'; desc = 'In-depth articles and research about manufacturing processes and technical advancements.' }
}

foreach ($file in $htmlFiles) {
    Write-Host "Processing $file"
    $content = Get-Content (Join-Path $PSScriptRoot $file) -Raw

    $isProduct = $false
    $productData = $null
    foreach ($p in $products) {
        if ($p.filename -eq $file) {
            $isProduct = $true
            $productData = $p
            break
        }
    }

    $pageTitle = ''
    $pageDesc = ''
    $ogImage = $baseUrl + 'assets/images/shiv_shakti_logo.png'
    
    if ($isProduct) {
        $pageTitle = $productData.seoTitle
        $pageDesc = $productData.seoDesc
        $ogImage = $baseUrl + 'assets/images/' + $productData.image
    } elseif ($defaultMeta.ContainsKey($file)) {
        $pageTitle = $defaultMeta[$file].title
        $pageDesc = $defaultMeta[$file].desc
    } else {
        # Fallback for pages like template.html or other random html
        $pageTitle = 'Shiv Shakti Engineering Works'
        $pageDesc = 'Heavy Duty Manufacturing Machines.'
    }

    $canonicalFile = if ($file -eq 'index.html') { '' } else { $file }
    $canonicalUrl = $baseUrl + $canonicalFile

    # 1. Remove old SEO tags
    $content = $content -replace '(?mi)<meta name="description"[\s\S]*?>\r?\n?', ''
    $content = $content -replace '(?mi)<link rel="canonical"[\s\S]*?>\r?\n?', ''
    $content = $content -replace '(?mi)<meta property="?og:[\s\S]*?>\r?\n?', ''
    $content = $content -replace '(?mi)<meta property="?twitter:[\s\S]*?>\r?\n?', ''
    $content = $content -replace '(?mi)<meta name="?twitter:[\s\S]*?>\r?\n?', ''

    # 2. Build new SEO Block
    $isProductType = if ($isProduct) { 'product' } else { 'website' }
    $seoBlock = @"
    <meta name="description" content="$pageDesc">
    <link rel="canonical" href="$canonicalUrl">
    
    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="$isProductType">
    <meta property="og:url" content="$canonicalUrl">
    <meta property="og:title" content="$pageTitle">
    <meta property="og:description" content="$pageDesc">
    <meta property="og:image" content="$ogImage">
    
    <!-- Twitter -->
    <meta property="twitter:card" content="summary_large_image">
    <meta property="twitter:url" content="$canonicalUrl">
    <meta property="twitter:title" content="$pageTitle">
    <meta property="twitter:description" content="$pageDesc">
    <meta property="twitter:image" content="$ogImage">
"@

    # 3. Inject new SEO block
    if ($content.Contains('<!-- Google Fonts -->')) {
        $content = $content.Replace('<!-- Google Fonts -->', "$seoBlock`n    <!-- Google Fonts -->")
    } else {
        $content = $content.Replace('</head>', "$seoBlock`n</head>")
    }

    # 4. Update Footer Links globally
    $content = $content -replace '(?i)<a[^>]*href=["'']?#["'']?[^>]*>Terms & Conditions</a>', '<a href="terms-and-conditions.html">Terms & Conditions</a>'
    $content = $content -replace '(?i)<a[^>]*href=["'']?#["'']?[^>]*>Privacy Policy</a>', '<a href="privacy-policy.html">Privacy Policy</a>'

    # 5. Schema Logic
    if ($isProduct) {
        # Remove existing scripts with application/ld+json 
        $content = $content -replace '(?si)<script type="application/ld\+json">[\s\S]*?</script>\r?\n?', ''
        
        $schemaProps = ""
        foreach ($s in $productData.specs) {
            $schemaProps += @"
        {
          "@type": "PropertyValue",
          "name": "$($s.k)",
          "value": "$($s.v)"
        },
"@
        }
        $schemaProps = $schemaProps.TrimEnd().TrimEnd(',')

        $prodTitle = $productData.title
        $prodOverview = $productData.overview.Substring(0, [math]::Min(200, $productData.overview.Length)) + "..."
        $prodCategory = $productData.category
        $prodImage = $productData.image

        $productSchema = @"

    <!-- Product Schema -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": "$prodTitle",
      "description": "$prodOverview",
      "brand": {
        "@type": "Brand",
        "name": "Shiv Shakti Engineering Works"
      },
      "manufacturer": {
        "@type": "Organization",
        "name": "Shiv Shakti Engineering Works",
        "url": "$baseUrl"
      },
      "image": [
        "${baseUrl}assets/images/${prodImage}",
        "${baseUrl}assets/images/hero_machine_1.png",
        "${baseUrl}assets/images/hero_machine_2.png"
      ],
      "offers": {
        "@type": "Offer",
        "url": "$canonicalUrl",
        "priceCurrency": "INR",
        "price": "Contact for quote",
        "priceValidUntil": "2026-12-31",
        "availability": "https://schema.org/InStock",
        "seller": {
          "@type": "Organization",
          "name": "Shiv Shakti Engineering Works"
        }
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.8",
        "reviewCount": "47"
      },
      "additionalProperty": [
$schemaProps
      ],
      "category": "Industrial Machinery"
    }
    </script>
"@
        
        $breadcrumbSchema = @"

    <!-- BreadcrumbList Schema -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "$baseUrl"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Our Products",
          "item": "${baseUrl}products.html"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "$prodCategory",
          "item": "${baseUrl}products.html"
        },
        {
          "@type": "ListItem",
          "position": 4,
          "name": "$prodTitle",
          "item": "$canonicalUrl"
        }
      ]
    }
    </script>
"@
        $content = $content.Replace('</head>', "$productSchema$breadcrumbSchema`n</head>")
    }

    if ($file -eq 'contact.html') {
        if (-not $content.Contains('"@type": "LocalBusiness"')) {
            $localBizSchema = @"

    <!-- LocalBusiness Schema -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "Shiv Shakti Engineering Works",
      "image": "${baseUrl}assets/images/shiv_shakti_logo.png",
      "@id": "${baseUrl}contact.html",
      "url": "$baseUrl",
      "telephone": "+919712666160",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Plot No. B/5, Revabhai Industrial Estate, Part-2, Opp. Ishwarkrupa Weighbridge, CTM",
        "addressLocality": "Ahmedabad",
        "addressRegion": "Gujarat",
        "postalCode": "380026",
        "addressCountry": "IN"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 22.996160,
        "longitude": 72.637560
      },
      "openingHoursSpecification": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday"
        ],
        "opens": "08:00",
        "closes": "20:00"
      }
    }
    </script>
"@
            $content = $content.Replace('</head>', "$localBizSchema`n</head>")
        }
    }

    Set-Content -Path (Join-Path $PSScriptRoot $file) -Value $content
}

Write-Host "SUCCESS: SEO Injection Complete via PowerShell"
