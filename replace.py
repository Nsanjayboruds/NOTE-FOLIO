import os

def replace_in_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    new_content = content.replace('Sebastian Tsang', 'Nishant Borude')
    new_content = new_content.replace('sebastiantsang', 'nishant-borude')
    new_content = new_content.replace('Sebastian', 'Nishant')
    new_content = new_content.replace('Seb', 'Nishant')
    new_content = new_content.replace('sebrtsang@gmail.com', 'contact@nishantborude.com')
    new_content = new_content.replace('sebtsang', 'nishant-borude')
    
    if new_content != content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Updated {filepath}")

for root, dirs, files in os.walk('.'):
    # Skip .git, node_modules, .next
    if '.git' in root or 'node_modules' in root or '.next' in root:
        continue
    for file in files:
        if file.endswith(('.ts', '.tsx', '.md', '.json', '.html')):
            replace_in_file(os.path.join(root, file))
