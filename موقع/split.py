import os
import re

html_file = 'f:/موقع/3YAD.html'
with open(html_file, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Extract CSS
style_match = re.search(r'<style>(.*?)</style>', content, flags=re.DOTALL)
if style_match:
    css = style_match.group(1)
    # Remove scroll snap stuff since we are multi-page now
    css = re.sub(r'html\s*\{[^}]*scroll-snap-type[^}]*\}', '', css)
    css = css.replace('scroll-snap-align: start;', '').replace('scroll-snap-stop: always;', '')
    with open('f:/موقع/style.css', 'w', encoding='utf-8') as f:
        f.write(css)

# 2. Extract JS
script_match = re.search(r'<script>(.*?)</script>', content, flags=re.DOTALL)
if script_match:
    js = script_match.group(1)
    # Remove active link switching on scroll since it's multi-page now
    js = re.sub(r'(?s)// Active Link Switching on Scroll.*?(?=// Scroll Reveal Animations)', '', js)
    with open('f:/موقع/main.js', 'w', encoding='utf-8') as f:
        f.write(js)

# 3. Create HTML template
content_before_home = content.split('<section id="home">')[0]
# Replace embedded style with external stylesheet
content_before_home = re.sub(r'<style>.*?</style>', '<link rel="stylesheet" href="style.css">', content_before_home, flags=re.DOTALL)

# Update nav links
links_map = {
    'href="#home"': 'href="index.html"',
    'href="#rules"': 'href="rules.html"',
    'href="#store"': 'href="store.html"',
    'href="#jobs"': 'href="jobs.html"',
    'href="#servers"': 'href="servers.html"',
    'href="#founders"': 'href="founders.html"',
    'href="#activation"': 'href="activation.html"'
}
for old_href, new_href in links_map.items():
    content_before_home = content_before_home.replace(old_href, new_href)

# Extract sections
sections_start = content.find('<section id="home">')
footer_start = content.find('<footer')
sections_html = content[sections_start:footer_start]

# Footer and JS
footer = content[footer_start:]
footer = re.sub(r'<script>.*?</script>', '<script src="main.js"></script>', footer, flags=re.DOTALL)

# Find all sections
sections = {}
for s in re.finditer(r'<section id="([^"]+)">', sections_html):
    id = s.group(1)
    start = s.start()
    # End is either the start of the next section, or the end of the string
    next_match = re.search(r'<section id="([^"]+)">', sections_html[start + 1:])
    if next_match:
        end = start + 1 + next_match.start()
    else:
        end = len(sections_html)
    sections[id] = sections_html[start:end]

files_map = {
    'home': 'index.html',
    'rules': 'rules.html',
    'store': 'store.html',
    'jobs': 'jobs.html',
    'servers': 'servers.html',
    'founders': 'founders.html',
    'activation': 'activation.html'
}

for section_id, filename in files_map.items():
    if section_id in sections:
        # Clear active classes
        custom_pre = content_before_home.replace('class="nav-item active"', 'class="nav-item"')
        # Set active class for current page
        custom_pre = custom_pre.replace(f'href="{filename}" class="nav-item"', f'href="{filename}" class="nav-item active"')
        
        # Build page HTML
        page_html = custom_pre + sections[section_id] + footer
        
        with open(f'f:/موقع/{filename}', 'w', encoding='utf-8') as f:
            f.write(page_html)

# Delete old single-page file optionally or keep it as backup
# os.rename(html_file, 'f:/موقع/3YAD_SPA_Backup.html')
