import re

with open('src/pages/case-studies/Plex.css', 'r', encoding='utf-8') as f:
    css = f.read()

vars_css = '''
.plex-case-study {
    --glass-bg-02: rgba(255, 255, 255, 0.02);
    --glass-bg-03: rgba(255, 255, 255, 0.03);
    --glass-bg-05: rgba(255, 255, 255, 0.05);
    --glass-bg-08: rgba(255, 255, 255, 0.08);
    --glass-bg-10: rgba(255, 255, 255, 0.1);
    --glass-bg-15: rgba(255, 255, 255, 0.15);
    --glass-bg-20: rgba(255, 255, 255, 0.2);
    --glass-bg-25: rgba(255, 255, 255, 0.25);
    --glass-bg-30: rgba(255, 255, 255, 0.3);
    --glass-bg-40: rgba(255, 255, 255, 0.4);
    --glass-bg-80: rgba(255, 255, 255, 0.8);
    --black-glass-40: rgba(0, 0, 0, 0.4);
    --black-glass-50: rgba(0, 0, 0, 0.5);
    --black-glass-60: rgba(0, 0, 0, 0.6);
}

[data-theme="light"] .plex-case-study {
    --glass-bg-02: rgba(0, 0, 0, 0.02);
    --glass-bg-03: rgba(0, 0, 0, 0.03);
    --glass-bg-05: rgba(0, 0, 0, 0.05);
    --glass-bg-08: rgba(0, 0, 0, 0.08);
    --glass-bg-10: rgba(0, 0, 0, 0.1);
    --glass-bg-15: rgba(0, 0, 0, 0.15);
    --glass-bg-20: rgba(0, 0, 0, 0.2);
    --glass-bg-25: rgba(0, 0, 0, 0.25);
    --glass-bg-30: rgba(0, 0, 0, 0.3);
    --glass-bg-40: rgba(0, 0, 0, 0.4);
    --glass-bg-80: rgba(0, 0, 0, 0.8);
    --black-glass-40: rgba(255, 255, 255, 0.6);
    --black-glass-50: rgba(255, 255, 255, 0.8);
    --black-glass-60: rgba(255, 255, 255, 0.9);
}
'''

css = vars_css + css

def repl_rgba(m):
    alpha = m.group(1)
    if alpha.startswith('0.'):
        num = alpha[2:]
        if len(num) == 1:
            num = num + '0'
        return f'var(--glass-bg-{num})'
    return m.group(0)

css = re.sub(r'rgba\s*\(\s*255\s*,\s*255\s*,\s*255\s*,\s*(0\.\d+)\s*\)', repl_rgba, css)

def repl_rgba_black(m):
    alpha = m.group(1)
    if alpha.startswith('0.'):
        num = alpha[2:]
        if len(num) == 1:
            num = num + '0'
        if num in ['40', '50', '60']:
            return f'var(--black-glass-{num})'
    return m.group(0)

css = re.sub(r'rgba\s*\(\s*0\s*,\s*0\s*,\s*0\s*,\s*(0\.\d+)\s*\)', repl_rgba_black, css)

css = css.replace('#ffffff', 'var(--text-primary)')
css = css.replace('#fff', 'var(--text-primary)')
css = css.replace('var(--text-primary)fff', '#ffffff')

with open('src/pages/case-studies/Plex.css', 'w', encoding='utf-8') as f:
    f.write(css)
