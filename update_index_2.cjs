const fs = require('fs');
const file = 'src/pages/Projects/ProjectsIndex.jsx';
let content = fs.readFileSync(file, 'utf8');

const newRowIf = `  if (!project.to) {
    return (
      <div {...sharedProps} style={{ cursor: 'default' }}>
        {inner}
      </div>
    );
  }

  if (project.external) {`;
content = content.replace("  if (project.external) {", newRowIf);

const newPhoneIf = `  if (!project.to) {
    return (
      <div
        className="pj-phone-entry"
        aria-label={\`View \${project.name} project\`}
        style={{ cursor: 'default' }}
      >
        {inner}
      </div>
    );
  }

  if (project.external) {`;
// replace the LAST occurrence of `if (project.external) {`
content = content.replace(/  if \(project.external\) {([^]*)$/, newPhoneIf + "$1");

fs.writeFileSync(file, content, 'utf8');
