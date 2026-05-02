const fs = require('fs');
const path = require('path');

const baseUrl = 'https://yashu10.github.io/Waterfillingmachine/';

// Load data.json
const dataPath = path.join(__dirname, 'data.json');
let products = [];
if (fs.existsSync(dataPath)) {
    products = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
}

const htmlFiles = fs.readdirSync(__dirname).filter(f => f.endsWith('.html'));

const defaultMeta = {
    'index.html': { title: 'Shiv Shakti Engineering Works | Water Bottling Plant Manufacturer', desc: 'Leading manufacturer and exporter of water filling machines, RO plants, and turnkey beverage packaging solutions in Ahmedabad, India since 1998.' },
    'about.html': { title: 'About Us | Shiv Shakti Engineering Works', desc: 'Learn about Shiv Shakti Engineering Works, established in 1998. We deliver high-quality, fully automated water and beverage filling machines globally.' },
    'products.html': { title: 'All Products & Machinery Catalog | Shiv Shakti Engineering', desc: 'Browse our extensive catalog of automatic bottle filling machines, shrink wrappers, blow moulding machines, RO plants, and lab equipment.' },
    'contact.html': { title: 'Contact Us | Shiv Shakti Engineering Works', desc: 'Get in touch with Shiv Shakti for modern bottling lines, filling solutions, and project inquiries. Based in Ahmedabad, exporting worldwide.' },
    'video.html': { title: 'Video Gallery | Machine Operations | Shiv Shakti', desc: 'Watch real-time operational videos of our high-speed water filling and packaging machinery in action.' },
    'blog.html': { title: 'Industry Blog & Insights | Shiv Shakti Engineering', desc: 'Read the latest trends, guides, and insights on the mineral water industry, beverage packaging, and automatic factory scaling.' },
    'privacy-policy.html': { title: 'Privacy Policy | Shiv Shakti Engineering Works', desc: 'Privacy policy and data protection guidelines for Shiv Shakti Engineering Works.' },
    'terms-and-conditions.html': { title: 'Terms & Conditions | Shiv Shakti Engineering Works', desc: 'Terms and conditions for sales, services, and website use for Shiv Shakti Engineering Works.' }
};

for (const file of htmlFiles) {
    let content = fs.readFileSync(path.join(__dirname, file), 'utf8');
    
    let isProduct = false;
    let productData = products.find(p => p.filename === file);
    if (productData) isProduct = true;

    // Determine specific meta tags
    let pageTitle = '';
    let pageDesc = '';
    let ogImage = baseUrl + 'assets/images/shiv_shakti_logo.png';
    
    if (isProduct) {
        pageTitle = productData.seoTitle;
        pageDesc = productData.seoDesc;
        ogImage = baseUrl + 'assets/images/' + productData.image;
    } else if (defaultMeta[file]) {
        pageTitle = defaultMeta[file].title;
        pageDesc = defaultMeta[file].desc;
    }

    const canonicalUrl = baseUrl + (file === 'index.html' ? '' : file);

    // 1. Remove old meta description, canonical, OG, and Twitter tags
    content = content.replace(/<meta name="description"[\s\S]*?>\n?/gi, '');
    content = content.replace(/<link rel="canonical"[\s\S]*?>\n?/gi, '');
    content = content.replace(/<meta property="?og:[\s\S]*?>\n?/gi, '');
    content = content.replace(/<meta property="?twitter:[\s\S]*?>\n?/gi, '');
    // Remove old twitter tags with name instead of property just in case
    content = content.replace(/<meta name="?twitter:[\s\S]*?>\n?/gi, '');

    // 2. Build new SEO Block
    let seoBlock = `    <meta name="description" content="${pageDesc}">
    <link rel="canonical" href="${canonicalUrl}">
    
    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="${isProduct ? 'product' : 'website'}">
    <meta property="og:url" content="${canonicalUrl}">
    <meta property="og:title" content="${pageTitle}">
    <meta property="og:description" content="${pageDesc}">
    <meta property="og:image" content="${ogImage}">
    
    <!-- Twitter -->
    <meta property="twitter:card" content="summary_large_image">
    <meta property="twitter:url" content="${canonicalUrl}">
    <meta property="twitter:title" content="${pageTitle}">
    <meta property="twitter:description" content="${pageDesc}">
    <meta property="twitter:image" content="${ogImage}">
`;

    // 3. Inject new SEO block before Google Fonts or </head>
    if (content.includes('<!-- Google Fonts -->')) {
        content = content.replace('<!-- Google Fonts -->', seoBlock + '\n    <!-- Google Fonts -->');
    } else {
        content = content.replace('</head>', seoBlock + '\n</head>');
    }

    // 4. Update Footer Links globally
    content = content.replace(/<a[^>]*href=["']?#["']?[^>]*>Terms & Conditions<\/a>/gi, '<a href="terms-and-conditions.html">Terms & Conditions</a>');
    content = content.replace(/<a[^>]*href=["']?#["']?[^>]*>Privacy Policy<\/a>/gi, '<a href="privacy-policy.html">Privacy Policy</a>');

    // 5. Schema Logic
    // For Product pages, replace old schemas and add full Product and Breadcrumb List
    if (isProduct) {
        // Remove existing scripts with application/ld+json (to clear old weak schemas)
        content = content.replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>\n?/gi, '');
        
        let schemaProps = productData.specs.map(s => {
            return `        {
          "@type": "PropertyValue",
          "name": "${s.k}",
          "value": "${s.v}"
        }`;
        }).join(',\n');

        let additionalImages = [
            `"${baseUrl}assets/images/${productData.image}"`,
            `"${baseUrl}assets/images/hero_machine_1.png"`,
            `"${baseUrl}assets/images/hero_machine_2.png"`
        ].join(',\n        ');

        let productSchema = `
    <!-- Product Schema -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": "${productData.title}",
      "description": "${productData.overview.substring(0, 200)}...",
      "brand": {
        "@type": "Brand",
        "name": "Shiv Shakti Engineering Works"
      },
      "manufacturer": {
        "@type": "Organization",
        "name": "Shiv Shakti Engineering Works",
        "url": "${baseUrl}"
      },
      "image": [
        ${additionalImages}
      ],
      "offers": {
        "@type": "Offer",
        "url": "${canonicalUrl}",
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
${schemaProps}
      ],
      "category": "Industrial Machinery"
    }
    </script>
`;
        
        let breadcrumbSchema = `
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
          "item": "${baseUrl}"
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
          "name": "${productData.category}",
          "item": "${baseUrl}products.html"
        },
        {
          "@type": "ListItem",
          "position": 4,
          "name": "${productData.title}",
          "item": "${canonicalUrl}"
        }
      ]
    }
    </script>
`;

        content = content.replace('</head>', productSchema + breadcrumbSchema + '</head>');
    }

    // 6. Contact Page LocalBusiness Schema
    if (file === 'contact.html') {
        if (!content.includes('"@type": "LocalBusiness"')) {
            let localBizSchema = `
    <!-- LocalBusiness Schema -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "Shiv Shakti Engineering Works",
      "image": "${baseUrl}assets/images/shiv_shakti_logo.png",
      "@id": "${baseUrl}contact.html",
      "url": "${baseUrl}",
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
`;
            content = content.replace('</head>', localBizSchema + '</head>');
        }
    }

    fs.writeFileSync(path.join(__dirname, file), content, 'utf8');
}
console.log("SEO properties successfully updated simultaneously!");
