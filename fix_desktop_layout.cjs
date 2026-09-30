const fs = require('fs');
let c = fs.readFileSync('src/pages/case-studies/plex-components/PlexProductVision.css', 'utf8');

c = c.replace(
  /.plex-vision-content-layout {[\s\S]*?justify-content: center; \/\* Center vertically inside safe sticky area \*\/\n}/,
  \\.plex-vision-content-layout {
  position: relative;
  display: flex;
  flex-direction: column;
  padding: clamp(40px, 6vh, 80px) 5vw 4vh 5vw; /* Sets the heading group slightly lower than before */
  max-width: 1400px;
  margin: 0 auto;
  width: 100%;
  height: 100%;
  max-height: 1200px; /* Let it breathe on big screens */
}\
);

c = c.replace(
  /.plex-vision-phone-frame {[\s\S]*?box-shadow: 0 24px 64px rgba\(0,0,0,0\.15\);\n}/,
  \\.plex-vision-phone-frame {
  height: min(860px, 70vh); /* Noticeably larger base height */
  aspect-ratio: 1 / 2;
  width: auto;
  border-radius: clamp(24px, 4vh, 40px);
  border: clamp(8px, 1.5vh, 12px) solid var(--border);
  background-color: var(--surface);
  position: relative;
  overflow: hidden;
  box-shadow: 0 24px 64px rgba(0,0,0,0.15);
}\
);

// Add short laptop tweaks if needed
if (!c.includes('.plex-vision-phone-frame {\\n    height: min(720px, 62vh);')) {
  c = c.replace(
    /.plex-principle-title {\n    font-size: 2.5rem;/,
    \\.plex-vision-phone-frame {
    height: min(720px, 62vh); /* Safe size for short laptops */
  }
  .plex-principle-title {
    font-size: 2.5rem;\
  );
}

fs.writeFileSync('src/pages/case-studies/plex-components/PlexProductVision.css', c);
