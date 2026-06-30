import re

with open('products.html', 'r', encoding='utf-8') as f:
    html = f.read()

# The container to replace is from <!-- CATEGORY 1: BOTTLE FILLING MACHINES --> up to </section>
match = re.search(r'(<!-- CATEGORY \d+:[\s\S]+?)(?=</section>)', html)
if not match:
    print("Could not find categories in products.html")
    exit(1)

content = match.group(1)

cat_pattern = re.compile(r'(<!-- CATEGORY \d+:[^>]+-->[\s\S]+?)(?=<!-- CATEGORY \d+:|$)', re.DOTALL)
categories = cat_pattern.findall(content)

def get_cat_name(cat_str):
    if 'cat-bottle-filling' in cat_str: return 'Bottle Filling'
    if 'cat-labeling' in cat_str: return 'Labeling'
    if 'cat-shrink' in cat_str: return 'Shrink Wrapping'
    if 'cat-ro-plant' in cat_str: return 'R.O Plant'
    if 'cat-blow' in cat_str: return 'Blow Molding'
    if 'cat-batch-coding' in cat_str: return 'Batch Coding'
    if 'cat-lab' in cat_str: return 'Lab Equipment'
    return 'Unknown'

order = {
    'Bottle Filling': 1,
    'Labeling': 2,
    'Shrink Wrapping': 3,
    'R.O Plant': 4,
    'Blow Molding': 5,
    'Batch Coding': 6,
    'Lab Equipment': 7
}

sorted_categories = sorted(categories, key=lambda x: order.get(get_cat_name(x), 99))

for i, cat in enumerate(sorted_categories):
    sorted_categories[i] = re.sub(r'<!-- CATEGORY \d+:', f'<!-- CATEGORY {i+1}:', cat)

new_content = ''.join(sorted_categories)
new_html = html[:match.start()] + new_content + html[match.end():]

with open('products.html', 'w', encoding='utf-8') as f:
    f.write(new_html)

print('Success')
