const fs = require('fs');
const path = require('path');

const headerHtml = fs.readFileSync('./components/header.html', 'utf8');
const footerHtml = fs.readFileSync('./components/footer.html', 'utf8');

const htmlFiles = fs.readdirSync('.').filter(f => f.endsWith('.html') && !f.startsWith('test') && f !== 'header.html' && f !== 'footer.html');

for (const file of htmlFiles) {
    let content = fs.readFileSync(file, 'utf8');
    
    let customizedHeader = headerHtml;
    // Inner pages need 'scrolled' class by default and dark hamburger
    if (file !== 'index.html') {
        customizedHeader = customizedHeader.replace('class="site-header"', 'class="site-header scrolled"');
        customizedHeader = customizedHeader.replace('<span class="hamburger"></span>', '<span class="hamburger" style="background: var(--text-main);"></span>');
    }
    
    // Replace Header
    // Matches <!-- Header --> ... </header>
    content = content.replace(/<!-- Header -->[\s\S]*?<\/header>/i, customizedHeader);
    
    // Replace Footer
    // Matches from <!-- CTA & Footer --> or <!-- Footer --> until just before <script src="js/main.js">
    content = content.replace(/<!-- (?:CTA & )?Footer -->[\s\S]*?(?=<script\s+src="js\/main\.js"><\/script>)/i, footerHtml + '\n    ');

    fs.writeFileSync(file, content);
    console.log(`Updated ${file}`);
}
console.log('All HTML files updated successfully.');
