const fs = require('fs');
const content = {
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
};
fs.writeFileSync('vercel.json', JSON.stringify(content, null, 2));
