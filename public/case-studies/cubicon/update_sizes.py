import sys

file_path = r'c:\Users\Asus\OneDrive\Desktop\cubicon-portfolio\Final_Deploy\index.html'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace inline font-size: 0.95rem; with 1.05rem;
content = content.replace('font-size: 0.95rem;', 'font-size: 1.05rem;')

# Add specific font-size to the friction points p tags
# Find Friction Points section
friction_points_start = content.find('Friction Points Discovered')
if friction_points_start != -1:
    end_of_section = content.find('07 — Industry Insight', friction_points_start)
    section_content = content[friction_points_start:end_of_section]
    
    # Replace <p> with <p style="font-size: 0.95rem;"> in this section only
    modified_section = section_content.replace('<p>', '<p style="font-size: 0.95rem;">')
    
    content = content[:friction_points_start] + modified_section + content[end_of_section:]

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print('Done!')
