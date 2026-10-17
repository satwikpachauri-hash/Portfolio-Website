const fs = require('fs');
const file = 'src/components/projects/Projects.jsx';
let content = fs.readFileSync(file, 'utf8');

content = content.replace(
  "const destination = project.href || '#pending-netlify-url';",
  "const destination = project.href;"
);

content = content.replace(
  "const isInternal = destination.startsWith('/');",
  ""
);

const newReturn = `  if (!destination) {
    return (
      <motion.div {...cardProps} style={{ cursor: 'default' }}>
        {innerContent}
      </motion.div>
    );
  }

  const isInternal = destination.startsWith('/');
  
  if (isInternal) {`;

content = content.replace("  if (isInternal) {", newReturn);

fs.writeFileSync(file, content, 'utf8');
