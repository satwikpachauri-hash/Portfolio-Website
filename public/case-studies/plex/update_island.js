const fs = require('fs');

let css = fs.readFileSync('styles.css', 'utf-8');

// The new CSS block to replace the existing reading-progress-island CSS
const newIslandCSS = `/* PREMIUM READING PROGRESS ISLAND */
.reading-progress-island {
  position: fixed;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%) scale(1);
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(30px) saturate(150%);
  -webkit-backdrop-filter: blur(30px) saturate(150%);
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 10px 20px;
  border-radius: 40px;
  display: flex;
  align-items: center;
  gap: 12px;
  z-index: 1000;
  box-shadow: 0 10px 40px rgba(0,0,0,0.5);
  font-size: 0.85rem;
  color: var(--text-muted);
  transition: opacity 1.5s ease-out, transform 1.5s cubic-bezier(0.16, 1, 0.3, 1);
}

.reading-progress-island.hidden {
  opacity: 0;
  transform: translateX(-50%) translateY(40px) scale(0.8);
  pointer-events: none;
}

.progress-ring {
  transform: rotate(-90deg);
}

.ring-bg {
  fill: none;
  stroke: rgba(255,255,255,0.1);
  stroke-width: 2.5;
}

.ring-fill {
  fill: none;
  stroke: var(--accent-success); /* Mint Green from mockups */
  stroke-width: 2.5;
  stroke-dasharray: 62.83; 
`;

const newMediaCSS = `/* READING PROGRESS ISLAND (Responsive) */
@media (max-width: 768px) {
    .reading-progress-island {
        padding: 8px 12px;
        gap: 8px;
        bottom: 24px;
        font-size: 0.75rem;
    }
}
`;

// Replace main block (from .reading-progress-island to stroke-dasharray: 62.83;)
const mainRegex = /\/\* PREMIUM READING PROGRESS ISLAND \*\/[\s\S]*?stroke-dasharray: 62\.83;\s*/;
if(mainRegex.test(css)) {
    css = css.replace(mainRegex, newIslandCSS);
    console.log("Main island CSS replaced successfully.");
} else {
    console.log("Could not find main island CSS.");
}

// Replace responsive block
const mediaRegex = /\/\* READING PROGRESS ISLAND \(Safe Area\) \*\/[\s\S]*?\}\s*\}/;
if(mediaRegex.test(css)) {
    css = css.replace(mediaRegex, newMediaCSS);
    console.log("Responsive island CSS replaced successfully.");
} else {
    console.log("Could not find responsive island CSS.");
}

fs.writeFileSync('styles.css', css);
