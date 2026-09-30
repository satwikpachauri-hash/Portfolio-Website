const fs = require('fs');
let c = fs.readFileSync('src/pages/case-studies/plex-components/PlexProductVision.css', 'utf8');

c = c.replace(
  /.plex-vision-sticky {[\s\S]*?justify-content: center;\n}/,
  \\.plex-vision-sticky {
  position: sticky;
  top: 0;
  height: 100vh;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 80px;
  box-sizing: border-box;
}\
);

c = c.replace(
  /.plex-vision-intro-center {[\s\S]*?z-index: 10;\n}/,
  \\.plex-vision-intro-center {
  position: absolute;
  top: calc(50% + 40px); /* adjust for padding-top roughly */
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 10;
}\
);

c = c.replace(
  /.plex-vision-content-layout {[\s\S]*?width: 100%;\n}/,
  \\.plex-vision-content-layout {
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 0 5vw;
  max-width: 1400px;
  margin: 0 auto;
  width: 100%;
  height: 100%;
  max-height: 900px;
  justify-content: center;
}\
);

c = c.replace(
  /.plex-vision-content-header {[\s\S]*?margin-bottom: 40px;\n}/,
  \\.plex-vision-content-header {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: clamp(20px, 4vh, 40px);
}\
);

c = c.replace(
  /.plex-vision-phone-frame {[\s\S]*?box-shadow: 0 24px 64px rgba\(0,0,0,0\.15\);\n}/,
  \\.plex-vision-phone-frame {
  height: min(680px, 60vh);
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

c = c.replace(
  /.plex-vision-screen-img {\n  position: absolute;\n  inset: 0;\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n  border-radius: 28px;\n}/,
  \\.plex-vision-screen-img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: clamp(16px, 3vh, 28px);
}\
);

c = c.replace(
  /  @media \(max-height: 800px\) and \(min-width: 1024px\) {[\s\S]*?padding: 8vh 5vw;\n    }\n  }/,
  \  @media (max-height: 800px) and (min-width: 1024px) {
    .plex-principle-title {
      font-size: 2.5rem;
      margin-bottom: 16px;
    }
    .plex-principle-text-stack {
      min-height: 240px; 
    }
  }\
);

fs.writeFileSync('src/pages/case-studies/plex-components/PlexProductVision.css', c);
