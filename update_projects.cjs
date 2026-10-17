const fs = require('fs');

const file = 'src/components/projects/Projects.jsx';
let content = fs.readFileSync(file, 'utf8');

// 1. Remove Cubicon href
content = content.replace(/href:\s*'\/projects\/cubicon'/g, 'href: \'\'');

// 2. Update ProjectCard logic
const oldLogic = `  const destination = project.href || '#pending-netlify-url';
  const isInternal = destination.startsWith('/');
  
  const cardProps = {`;

const newLogic = `  const destination = project.href;
  
  const cardProps = {`;

content = content.replace(oldLogic, newLogic);

const oldReturn = `  if (isInternal) {
    return (
      <MotionLink to={destination} {...cardProps}>
        {innerContent}
      </MotionLink>
    );
  }

  return (
    <motion.a
      href={destination}
      target="_blank"
      rel="noopener noreferrer"
      {...cardProps}
    >
      {innerContent}
    </motion.a>
  );`;

const newReturn = `  if (!destination) {
    return (
      <motion.div {...cardProps}>
        {innerContent}
      </motion.div>
    );
  }

  const isInternal = destination.startsWith('/');

  if (isInternal) {
    return (
      <MotionLink to={destination} {...cardProps}>
        {innerContent}
      </MotionLink>
    );
  }

  return (
    <motion.a
      href={destination}
      target="_blank"
      rel="noopener noreferrer"
      {...cardProps}
    >
      {innerContent}
    </motion.a>
  );`;

content = content.replace(oldReturn, newReturn);

fs.writeFileSync(file, content, 'utf8');
