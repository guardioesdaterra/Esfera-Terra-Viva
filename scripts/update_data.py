#!/usr/bin/env python3
import re

DATA_FILE = "/home/ubuntu/Esfera_Terra_Viva/esfera-terra-viva-portfolio/src/data/posts.js"

with open(DATA_FILE, "r") as f:
    content = f.read()

def add_thumb(m):
    block = m.group(1)
    stem = re.sub(r'\.[^.]+$', '', m.group(2))
    thumb = f'"thumb": "/images/posts/{stem}.webp"'
    block = re.sub(r'("type":\s*"[^"]+")', rf'\1,\n    {thumb}', block)
    return block

content = re.sub(
    r'(\{[^}]*?"file":\s*"posts/([^"]+)"[^}]*?\})',
    add_thumb,
    content,
    flags=re.DOTALL
)

with open(DATA_FILE, "w") as f:
    f.write(content)

print("Updated posts.js with thumbnail paths")
