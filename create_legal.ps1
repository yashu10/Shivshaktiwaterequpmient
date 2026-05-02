$about = Get-Content 'about.html' -Raw
$header = $about.Substring(0, $about.IndexOf('<!-- Page Header -->'))
$footer = $about.Substring($about.IndexOf('<!-- Footer -->'))

$privacyBody = @"
    <!-- Page Header -->
    <section class="page-header">
        <div class="container">
            <ul class="breadcrumb">
                <li><a href="index.html">Home</a></li>
                <li>Privacy Policy</li>
            </ul>
            <h1>Privacy Policy</h1>
            <p>Shiv Shakti Engineering Works</p>
        </div>
    </section>
    <section class="section-padding bg-light">
        <div class="container" style="max-width: 800px; background:#fff; padding: 40px; border-radius: 8px; box-shadow: 0 4px 15px rgba(0,0,0,0.05);">
            <h2>1. Information We Collect</h2>
            <p>We may collect personal information such as your name, contact details, and company information when you interact with us or request a quote for our machinery.</p>
            <br><h2>2. Use of Information</h2>
            <p>Your information is used to process inquiries, provide customer support, and send updates regarding our industrial products and services.</p>
            <br><h2>3. Data Protection</h2>
            <p>We implement industry-standard security measures to protect your personal information from unauthorized access.</p>
            <br><h2>4. Contact Us</h2>
            <p>If you have any questions about this Privacy Policy, please contact us at shivshakti2932@yahoo.com.</p>
        </div>
    </section>
"@

$termsBody = @"
    <!-- Page Header -->
    <section class="page-header">
        <div class="container">
            <ul class="breadcrumb">
                <li><a href="index.html">Home</a></li>
                <li>Terms & Conditions</li>
            </ul>
            <h1>Terms & Conditions</h1>
            <p>Shiv Shakti Engineering Works</p>
        </div>
    </section>
    <section class="section-padding bg-light">
        <div class="container" style="max-width: 800px; background:#fff; padding: 40px; border-radius: 8px; box-shadow: 0 4px 15px rgba(0,0,0,0.05);">
            <h2>1. Acceptance of Terms</h2>
            <p>By accessing our website and inquiring about our machinery, you agree to these Terms and Conditions.</p>
            <br><h2>2. Products and Quotes</h2>
            <p>All machinery specifications and quotes provided are subject to our final confirmation. We reserve the right to modify technical specifications as part of continuous product improvement.</p>
            <br><h2>3. Intellectual Property</h2>
            <p>All content, designs, and machinery specifications on this website are the intellectual property of Shiv Shakti Engineering Works.</p>
            <br><h2>4. Limitation of Liability</h2>
            <p>Shiv Shakti Engineering Works shall not be liable for any indirect or consequential loss arising from the use of our website or initial consultation.</p>
        </div>
    </section>
"@

$privacyFull = $header.Replace('<title>About Us | Shiv Shakti Engineering Works</title>', '<title>Privacy Policy | Shiv Shakti Engineering Works</title>').Replace('about.html"', 'privacy-policy.html"') + $privacyBody + $footer
$termsFull = $header.Replace('<title>About Us | Shiv Shakti Engineering Works</title>', '<title>Terms & Conditions | Shiv Shakti Engineering Works</title>').Replace('about.html"', 'terms-and-conditions.html"') + $termsBody + $footer

Set-Content -Path 'privacy-policy.html' -Value $privacyFull
Set-Content -Path 'terms-and-conditions.html' -Value $termsFull
