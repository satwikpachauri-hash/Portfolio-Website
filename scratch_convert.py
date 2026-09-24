import re
from bs4 import BeautifulSoup
import html as html_lib

def dash_to_camel(match):
    return match.group(1).upper()

def style_to_dict(style_str):
    if not style_str or not style_str.strip():
        return "{}"
    styles = []
    for prop in style_str.split(';'):
        if ':' in prop:
            key, val = prop.split(':', 1)
            key = key.strip()
            val = val.strip()
            # camelCase key
            key = re.sub(r'-([a-z])', dash_to_camel, key)
            styles.append(f"'{key}': '{val}'")
    return "{{ " + ", ".join(styles) + " }}"

html_path = r'public\case-studies\plex\index.html'
css_path = r'public\case-studies\plex\styles.css'

with open(html_path, 'r', encoding='utf-8') as f:
    html = f.read()

# Extract body content
body_match = re.search(r'<body[^>]*>(.*?)</body>', html, re.DOTALL | re.IGNORECASE)
if body_match:
    body_content = body_match.group(1)
else:
    body_content = html

# Remove script tags
body_content = re.sub(r'<script.*?>.*?</script>', '', body_content, flags=re.DOTALL)
body_content = re.sub(r'<!--.*?-->', '', body_content, flags=re.DOTALL)

soup = BeautifulSoup(body_content, 'html.parser')

# Function to recursively convert tags to React components
def convert_tag(tag):
    if isinstance(tag, str):
        # Escape curly braces
        text = tag.replace('{', '{{').replace('}', '}}')
        return text

    if tag.name is None:
        return ""

    attrs = []
    for k, v in tag.attrs.items():
        if k == 'class':
            k = 'className'
            if isinstance(v, list):
                v = ' '.join(v)
            attrs.append(f'{k}="{v}"')
        elif k == 'style':
            v = style_to_dict(v)
            attrs.append(f'{k}={v}')
        elif k == 'for':
            attrs.append(f'htmlFor="{v}"')
        elif k == 'playsinline':
            attrs.append('playsInline')
        elif k == 'autoplay':
            attrs.append('autoPlay')
        elif k == 'viewbox':
            attrs.append(f'viewBox="{v}"')
        elif '-' in k and not k.startswith('data-') and not k.startswith('aria-'):
            k = re.sub(r'-([a-z])', dash_to_camel, k)
            if isinstance(v, list):
                v = ' '.join(v)
            attrs.append(f'{k}="{v}"')
        else:
            if isinstance(v, list):
                v = ' '.join(v)
            attrs.append(f'{k}="{v}"')

    # Convert image src
    if tag.name in ['img', 'source'] and 'src' in tag.attrs:
        src = tag['src']
        if src.startswith('./assets/'):
            src = src.replace('./assets/', '/case-studies/plex/assets/')
        # Remove old src attribute from attrs and add the new one
        attrs = [a for a in attrs if not a.startswith('src=')]
        attrs.append(f'src="{src}"')
        if tag.name == 'img':
            attrs.append('loading="lazy"')

    attr_str = ' '.join(attrs)
    if attr_str:
        attr_str = ' ' + attr_str
        
    attr_str = attr_str.replace('stroke-width', 'strokeWidth')
    attr_str = attr_str.replace('stroke-linecap', 'strokeLinecap')
    attr_str = attr_str.replace('stroke-linejoin', 'strokeLinejoin')
    attr_str = attr_str.replace('stroke-dasharray', 'strokeDasharray')
    attr_str = attr_str.replace('stroke-dashoffset', 'strokeDashoffset')

    if tag.name in ['img', 'br', 'hr', 'input', 'source', 'meta', 'link']:
        return f"<{tag.name}{attr_str} />"

    children = "".join(convert_tag(c) for c in tag.contents)
    
    # Simple GSAP reveal to framer motion
    if 'className' in str(attr_str) and ('gsap-reveal' in str(attr_str) or 'hero-anim' in str(attr_str)):
        return f'<motion.div{attr_str}\ninitial={{{{ opacity: 0, y: 20 }}}}\nwhileInView={{{{ opacity: 1, y: 0 }}}}\nviewport={{{{ once: true, margin: "-10%" }}}}\n>{children}</motion.div>'

    return f"<{tag.name}{attr_str}>{children}</{tag.name}>"

jsx_content = ""
for child in soup.contents:
    jsx_content += convert_tag(child)

react_code = f'''import React, {{ useEffect }} from 'react';
import {{ motion }} from 'motion/react';
import './Plex.css';

export default function PlexCaseStudy() {{
  useEffect(() => {{
    if (window.lucide) {{
      window.lucide.createIcons();
    }} else {{
      const script = document.createElement('script');
      script.src = 'https://unpkg.com/lucide@latest';
      script.onload = () => window.lucide.createIcons();
      document.body.appendChild(script);
    }}
  }}, []);

  return (
    <div className="case-study-content plex-case-study">
      {jsx_content}
    </div>
  );
}}
'''

with open(r'src\pages\case-studies\Plex.jsx', 'w', encoding='utf-8') as f:
    f.write(react_code)

# Now CSS
with open(css_path, 'r', encoding='utf-8') as f:
    css = f.read()

css = css.replace('./assets/', '/case-studies/plex/assets/')
css = css.replace(':root', '.plex-case-study')
css = css.replace('body {', '.plex-case-study {')

with open(r'src\pages\case-studies\Plex.css', 'w', encoding='utf-8') as f:
    f.write(css)

print("Done generating JSX and CSS.")
