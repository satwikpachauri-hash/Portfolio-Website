with open('src/pages/case-studies/Plex.jsx', 'r', encoding='utf-8') as f:
    text = f.read()

text = text.replace('loop=""', 'loop={true}')
text = text.replace('muted=""', 'muted={true}')
text = text.replace('playsinline=""', 'playsInline={true}')
text = text.replace('autoplay=""', 'autoPlay={true}')

with open('src/pages/case-studies/Plex.jsx', 'w', encoding='utf-8') as f:
    f.write(text)
