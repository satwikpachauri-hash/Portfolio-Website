const fs = require('fs');

const file = 'src/pages/Projects/ProjectsIndex.jsx';
let content = fs.readFileSync(file, 'utf8');

// 1. Remove "to: '...', external: true" for Cubicon
content = content.replace(/id:\s*'cubicon'[\s\S]*?to:\s*'[^']*',[\s\S]*?external:\s*true,/, `id: 'cubicon',
      num: '02',
      name: 'Cubicon',
      displayName: 'CUBICON',
      territory: 'Interaction Design · Design Systems · Usability',
      meta: '2026',
      image: '/assets/projects/cubicon-hero.webp',
      imageAlt: 'Cubicon project preview',
      to: '',
      external: false,`);

// 2. Update ProjectRow logic
const oldRowIf = `  if (project.external) {
    return (
      <a href={project.to} target="_blank" rel="noreferrer" {...sharedProps}>
        {inner}
      </a>
    );
  }

  return (
    <Link to={project.to} {...sharedProps}>
      {inner}
    </Link>
  );`;

const newRowIf = `  if (!project.to) {
    return (
      <div {...sharedProps} style={{ cursor: 'default' }}>
        {inner}
      </div>
    );
  }

  if (project.external) {
    return (
      <a href={project.to} target="_blank" rel="noreferrer" {...sharedProps}>
        {inner}
      </a>
    );
  }

  return (
    <Link to={project.to} {...sharedProps}>
      {inner}
    </Link>
  );`;

content = content.replace(oldRowIf, newRowIf);

// 3. Update PhoneEntry logic
const oldPhoneIf = `  if (project.external) {
    return (
      <a
        href={project.to}
        target="_blank"
        rel="noreferrer"
        className="pj-phone-entry"
        aria-label={\`View \${project.name} project\`}
      >
        {inner}
      </a>
    );
  }
  return (
    <Link
      to={project.to}
      className="pj-phone-entry"
      aria-label={\`View \${project.name} project\`}
    >
      {inner}
    </Link>
  );`;

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

  if (project.external) {
    return (
      <a
        href={project.to}
        target="_blank"
        rel="noreferrer"
        className="pj-phone-entry"
        aria-label={\`View \${project.name} project\`}
      >
        {inner}
      </a>
    );
  }
  return (
    <Link
      to={project.to}
      className="pj-phone-entry"
      aria-label={\`View \${project.name} project\`}
    >
      {inner}
    </Link>
  );`;

content = content.replace(oldPhoneIf, newPhoneIf);

fs.writeFileSync(file, content, 'utf8');
