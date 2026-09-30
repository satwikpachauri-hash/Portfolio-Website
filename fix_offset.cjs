const fs = require('fs');
let c = fs.readFileSync('src/pages/case-studies/plex-components/PlexProblemSection.jsx', 'utf8');
const search = /const parentRect = containerRef\.current\.getBoundingClientRect\(\);[^]*?height: elRect\.height \+ \(offset \* 2\),\s*opacity: 1\s*\n\s*\}\);/m;
const replacement = `
        let top = 0;
        let left = 0;
        let currentEl = targetEl;
        
        while (currentEl && currentEl !== containerRef.current) {
          top += currentEl.offsetTop;
          left += currentEl.offsetLeft;
          currentEl = currentEl.offsetParent;
        }
        
        const width = targetEl.offsetWidth;
        const height = targetEl.offsetHeight;
        
        const gap = 4;
        const ringBorder = 2;
        const offset = gap + ringBorder;

        setFocusRect({
          top: top - offset,
          left: left - offset,
          width: width + (offset * 2),
          height: height + (offset * 2),
          opacity: 1
        });
`;
c = c.replace(search, replacement);
fs.writeFileSync('src/pages/case-studies/plex-components/PlexProblemSection.jsx', c);
