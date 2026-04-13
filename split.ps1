$content = Get-Content ".\3YAD.html" -Raw -Encoding UTF8

# Extract CSS
$content -match '(?s)<style>([\s\S]*?)</style>' | Out-Null
$css = $matches[1]
$css = $css -replace '(?s)html\s*\{[^}]*scroll-snap-type[^}]*\}', ''
$css = $css -replace 'scroll-snap-align:\s*start;', ''
$css = $css -replace 'scroll-snap-stop:\s*always;', ''
Set-Content -Path ".\style.css" -Value $css -Encoding UTF8

# Extract JS
$content -match '(?s)<script>([\s\S]*?)</script>' | Out-Null
$js = $matches[1]
$js = $js -replace '(?s)// Active Link Switching on Scroll.*?// Scroll Reveal Animations', '// Scroll Reveal Animations'
Set-Content -Path ".\main.js" -Value $js -Encoding UTF8

# Remove style tag
$content = $content -replace '(?s)<style>.*?</style>', '<link rel="stylesheet" href="style.css">'
# Remove script tag
$content = $content -replace '(?s)<script>.*?</script>', '<script src="main.js"></script>'

# Update links
$content = $content.Replace('href="index.html"', 'TEMP') # wait, they were #home initially
$content = $content.Replace('href="#home"', 'href="index.html"')
$content = $content.Replace('href="#rules"', 'href="rules.html"')
$content = $content.Replace('href="#store"', 'href="store.html"')
$content = $content.Replace('href="#jobs"', 'href="jobs.html"')
$content = $content.Replace('href="#servers"', 'href="servers.html"')
$content = $content.Replace('href="#founders"', 'href="founders.html"')
$content = $content.Replace('href="#activation"', 'href="activation.html"')

# Split before first section
$parts = $content -split '<section id="home">'
$pre = $parts[0]
$rest = '<section id="home">' + $parts[1]

# Split before footer
$parts2 = $rest -split '<footer>'
$sections_html = $parts2[0]
$post = '<footer>' + $parts2[1]

# List of sections to extract
$files = [ordered]@{
    "home"       = "index.html";
    "rules"      = "rules.html";
    "store"      = "store.html";
    "jobs"       = "jobs.html";
    "servers"    = "servers.html";
    "founders"   = "founders.html";
    "activation" = "activation.html"
}

foreach ($key in $files.Keys) {
    $file = $files[$key]
    
    # Extract the section
    # Use non-greedy regex to get exactly one section content
    if ($sections_html -match '(?s)(<section id="' + $key + '">.*?</section>)') {
        $sectionContent = $matches[1]
        
        $custom_pre = $pre.Replace('class="nav-item active"', 'class="nav-item"')
        $custom_pre = $custom_pre.Replace('href="' + $file + '" class="nav-item"', 'href="' + $file + '" class="nav-item active"')
        
        $finalHtml = $custom_pre + $sectionContent + "`n`n    " + $post
        Set-Content -Path (".\" + $file) -Value $finalHtml -Encoding UTF8
    }
}
