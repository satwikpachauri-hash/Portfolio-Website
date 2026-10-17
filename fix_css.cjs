const fs = require('fs');
let c = fs.readFileSync('src/pages/case-studies/cubicon/Cubicon.css', 'utf8');

// Find the corrupted line and replace it entirely
const corrupted = /  \.cb-glass-panel \{\\n.*\n}/s;

const replacement = `  .cb-glass-panel {
    padding: 28px 24px;
    border-radius: 20px;
    backdrop-filter: blur(24px);
    -webkit-backdrop-filter: blur(24px);
  }
  
  [data-theme="dark"] .cb-glass-panel {
    background-color: rgba(18, 19, 22, 0.85);
  }

  .cb-meta-grid {
    gap: 16px 20px;
  }

  .cb-glass-logo-container {
    width: 52px;
    height: 52px;
    border-radius: 14px;
    margin-bottom: 20px;
  }
  .cb-glass-logo {
    width: 36px;
    height: 36px;
  }
  
  .cb-glass-tagline {
    margin-bottom: 28px;
  }
}`;

c = c.replace(corrupted, replacement);
fs.writeFileSync('src/pages/case-studies/cubicon/Cubicon.css', c, 'utf8');
console.log('done');
