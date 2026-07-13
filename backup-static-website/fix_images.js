const fs = require('fs');
const path = require('path');

const dir = __dirname;
const files = fs.readdirSync(dir);

const replacements = {
    'prod_sticker_labelling.png': 'prod_sticker_labelling.png',
    'prod_bopp_labelling.png': 'prod_bopp_labelling.png',
    'prod_water_filling.png': 'prod_water_filling.png',
    'hero_machine_2.png': 'hero_machine_2.png',
    'hero_machine_3.png': 'hero_machine_3.png',
    'hero_machine_4.png': 'hero_machine_4.png',
    'prod_juice_filling.png': 'prod_juice_filling.png'
};

files.forEach(file => {
    if (file.endsWith('.html') || file.endsWith('.js') || file.endsWith('.json')) {
        const filePath = path.join(dir, file);
        let content = fs.readFileSync(filePath, 'utf8');
        let modified = false;
        
        for (const [oldImg, newImg] of Object.entries(replacements)) {
            if (content.includes(oldImg)) {
                content = content.split(oldImg).join(newImg);
                modified = true;
            }
        }
        
        if (modified) {
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`Updated images in ${file}`);
        }
    }
});
