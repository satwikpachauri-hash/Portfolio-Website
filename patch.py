import re
with open(r'C:\Users\Asus\Desktop\Portfolio Website\src\components\navigation\DynamicIsland\DynamicIsland.jsx', 'r', encoding='utf-8') as f:
    lines = f.readlines()

out = []
skip = False
for i, line in enumerate(lines):
    if '{link.external ? (' in line and not skip:
        skip = True
        out.append("""                      {link.external ? (
                        <a href={link.path} target="_blank" rel="noreferrer" className="font-display">
                          {link.label}
                        </a>
                      ) : link.path === '/' ? (
                        location.pathname === '/' ? (
                          <a href="#home" className="font-display" onClick={(e) => {
                            e.preventDefault();
                            handleClose();
                            if (window.lenis) window.lenis.scrollTo(0);
                            else window.scrollTo({ top: 0, behavior: 'smooth' });
                            window.history.pushState(null, '', '/');
                          }}>
                            {link.label}
                          </a>
                        ) : (
                          <Link to="/" className="font-display" onClick={() => { handleClose(); window.scrollTo(0,0); }}>
                            {link.label}
                          </Link>
                        )
                      ) : link.path.startsWith('#') ? (
                        location.pathname === '/' ? (
                          <a href={link.path} className="font-display" onClick={(e) => {
                            e.preventDefault();
                            handleClose();
                            if (window.lenis) window.lenis.scrollTo(link.path);
                            else {
                              const el = document.querySelector(link.path);
                              if (el) el.scrollIntoView({ behavior: 'smooth' });
                            }
                            window.history.pushState(null, '', `/${link.path}`);
                          }}>
                            {link.label}
                          </a>
                        ) : (
                          <Link to={`/${link.path}`} className="font-display" onClick={handleClose}>
                            {link.label}
                          </Link>
                        )
                      ) : (
                        <Link to={link.path} className={`font-display ${location.pathname === link.path ? 'active-route' : ''}`} onClick={() => { handleClose(); window.scrollTo(0,0); }}>
                          {link.label}
                        </Link>
                      )}
""")
    elif '</motion.li>' in line and skip:
        skip = False
        out.append(line)
    elif not skip:
        out.append(line)

with open(r'C:\Users\Asus\Desktop\Portfolio Website\src\components\navigation\DynamicIsland\DynamicIsland.jsx', 'w', encoding='utf-8') as f:
    f.writelines(out)
