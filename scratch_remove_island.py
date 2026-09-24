import re

with open('src/pages/case-studies/Plex.jsx', 'r', encoding='utf-8') as f:
    text = f.read()

# Replace from <div className="reading-progress-island hidden"> to </div> right before <section className="hero"
text = re.sub(r'<div className="reading-progress-island hidden">.*?</div>\n<section className="hero"', '<section className="hero"', text, flags=re.DOTALL)

with open('src/pages/case-studies/Plex.jsx', 'w', encoding='utf-8') as f:
    f.write(text)
