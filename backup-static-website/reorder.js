const fs = require('fs');
const path = 'products.html';

let html = fs.readFileSync(path, 'utf8');

const regex = /(<!-- CATEGORY \d+:[^>]+-->[\s\S]+?)(?=<!-- CATEGORY \d+:|<\/section>)/g;
let categories = [];
let match;
while ((match = regex.exec(html)) !== null) {
    categories.push(match[0]);
}

const getCatName = (str) => {
    if (str.includes('cat-bottle-filling')) return 'Bottle Filling';
    if (str.includes('cat-labeling')) return 'Labeling';
    if (str.includes('cat-shrink')) return 'Shrink Wrapping';
    if (str.includes('cat-ro-plant')) return 'R.O Plant';
    if (str.includes('cat-blow')) return 'Blow Molding';
    if (str.includes('cat-batch-coding')) return 'Batch Coding';
    if (str.includes('cat-lab')) return 'Lab Equipment';
    return 'Unknown';
};

const order = {
    'Bottle Filling': 1,
    'Labeling': 2,
    'Shrink Wrapping': 3,
    'R.O Plant': 4,
    'Blow Molding': 5,
    'Batch Coding': 6,
    'Lab Equipment': 7
};

categories.sort((a, b) => {
    return order[getCatName(a)] - order[getCatName(b)];
});

let updatedCategories = categories.map((cat, i) => {
    return cat.replace(/<!-- CATEGORY \d+:/, `<!-- CATEGORY ${i + 1}:`);
});

let newContent = updatedCategories.join('');
let newHtml = html.replace(/(<!-- CATEGORY 1:[\s\S]+)(?=<\/section>)/, newContent);

fs.writeFileSync(path, newHtml, 'utf8');
console.log('Reordered successfully');
