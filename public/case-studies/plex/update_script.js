const fs = require('fs');
const file = 'script.js';
let content = fs.readFileSync(file, 'utf-8');

const regex = /\s*\/\/ Stage 3: Friction modals pop in one by one overlapping\s*\.to\("\.friction-modal", \{\s*opacity: 1,\s*scale: 1,\s*duration: 0\.8,\s*stagger: 0\.4, \/\/ Deliberately slow to feel demanding\s*ease: "back\.out\(1\.2\)"\s*\}\)/g;

const replacement = `
        // Stage 3: Friction modals pop in one by one overlapping
        .to([".dash-topnav", ".dash-body"], {
            filter: "blur(5px)",
            duration: 0.8,
            ease: "power2.out"
        }, "<")
        .to(".friction-modal", {
            opacity: 1,
            scale: 1,
            duration: 0.8,
            stagger: 0.4, // Deliberately slow to feel demanding
            ease: "back.out(1.2)"
        }, "<")`;

if (regex.test(content)) {
    fs.writeFileSync(file, content.replace(regex, replacement));
    console.log('Script updated successfully');
} else {
    console.log('Target not found');
}
