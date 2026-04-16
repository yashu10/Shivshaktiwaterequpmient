const fs = require('fs');

let content = fs.readFileSync('index.html', 'utf8');

const products = [
    { title: 'Water Filling Machine', link: 'water-filling-machine.html' },
    { title: 'Juice Filling Machine', link: 'juice-filling-machine.html' },
    { title: 'Soda Filling Machine', link: 'soda-filling-machine.html' },
    { title: 'Beer Filling Machine', link: 'beer-filling-machine.html' },
    { title: 'Inkjet Batch Coding', link: 'inkjet-batch-coding.html' },
    { title: 'Sticker Labelling Machine', link: 'sticker-labelling-machine.html' },
    { title: 'BOPP Labelling Machine', link: 'bopp-labelling-machine.html' },
    { title: 'Chemical Lab Equipment', link: 'chemical-lab.html' },
    { title: 'Micro-biology Lab Setup', link: 'micro-biology-lab.html' },
    { title: 'Industrial RO Plant', link: 'r-o-plant.html' },
    { title: 'Fully Auto Shrink Wrapping', link: 'fully-automatic-shrink-wrapping-machine.html' },
    { title: 'Semi Auto Shrink Wrapping', link: 'semi-automatic-shrink-wrapping-machine.html' },
    { title: 'Fully Auto Blow Moulding', link: 'fully-automatic-blow-moulding-machine.html' },
    { title: 'Semi Auto Blow Moulding', link: 'semi-automatic-blow-moulding-machine.html' }
];

products.forEach(p => {
    const regex = new RegExp(`(<h3>${p.title}</h3>\\s*<p>.*?</p>\\s*)<a href="#" class="read-more">View Details &rarr;</a>`, 'gs');
    content = content.replace(regex, `$1<a href="${p.link}" class="read-more">View Details &rarr;</a>`);
});

fs.writeFileSync('index.html', content);
console.log('Done!');
