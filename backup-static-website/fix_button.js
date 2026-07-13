const fs = require('fs');
const path = require('path');

const dir = __dirname;
const files = fs.readdirSync(dir);

const replacements = {
    'class="btn btn-orange nav-cta">Request A Quote</a>': 'class="btn btn-orange nav-cta">Request A Quote</a>',
    'class="btn btn-orange nav-cta">Request a Quote</a>': 'class="btn btn-orange nav-cta">Request a Quote</a>'
};

files.forEach(file => {
    if (file.endsWith('.html') || file.endsWith('.js')) {
        const filePath = path.join(dir, file);
        let content = fs.readFileSync(filePath, 'utf8');
        let modified = false;
        
        for (const [oldStr, newStr] of Object.entries(replacements)) {
            if (content.includes(oldStr)) {
                content = content.split(oldStr).join(newStr);
                modified = true;
            }
        }
        
        if (modified) {
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`Updated button in ${file}`);
        }
    }
});

const componentsDir = path.join(dir, 'components');
if (fs.existsSync(componentsDir)) {
    const compFiles = fs.readdirSync(componentsDir);
    compFiles.forEach(file => {
        if (file.endsWith('.html')) {
            const filePath = path.join(componentsDir, file);
            let content = fs.readFileSync(filePath, 'utf8');
            let modified = false;
            
            for (const [oldStr, newStr] of Object.entries(replacements)) {
                if (content.includes(oldStr)) {
                    content = content.split(oldStr).join(newStr);
                    modified = true;
                }
            }
            
            if (modified) {
                fs.writeFileSync(filePath, content, 'utf8');
                console.log(`Updated button in components/${file}`);
            }
        }
    });
}
