#!/usr/bin/env python3
import subprocess, os, sys, json, glob, re
from pathlib import Path

DATA_DIR = Path("/home/ubuntu/Esfera_Terra_Viva/2026-07-04_09-46-10/posts")
OUT_DIR = Path("/home/ubuntu/Esfera_Terra_Viva/esfera-terra-viva-portfolio/public/images/posts")
OUT_DIR.mkdir(parents=True, exist_ok=True)

def generate_thumbnail(src, out_path):
    if out_path.exists():
        return
    cmd = [
        "ffmpeg", "-i", str(src),
        "-vf", "select=eq(n\\,10),scale=480:480:force_original_aspect_ratio=2,crop=480:480",
        "-vframes", "1",
        "-q:v", "50",
        "-y",
        str(out_path)
    ]
    subprocess.run(cmd, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)

def copy_compress(src, out_path):
    if out_path.exists():
        return
    cmd = [
        "ffmpeg", "-i", str(src),
        "-vf", "scale=480:480:force_original_aspect_ratio=2,crop=480:480",
        "-q:v", "50",
        "-y",
        str(out_path)
    ]
    subprocess.run(cmd, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)

# Read the first line of posts data to extract file references
# We'll scan all files in DATA_DIR
all_files = list(DATA_DIR.glob("*"))
total = len(all_files)
print(f"Found {total} media files")

for i, f in enumerate(all_files, 1):
    stem = f.stem
    ext = f.suffix.lower()
    out_name = stem + ".webp"
    out_path = OUT_DIR / out_name

    if ext in (".mp4", ".mov", ".avi"):
        generate_thumbnail(f, out_path)
    elif ext in (".jpg", ".jpeg", ".png", ".webp"):
        copy_compress(f, out_path)
    else:
        continue

    if (i % 20) == 0:
        print(f"  Processed {i}/{total}")

print(f"Done! {len(list(OUT_DIR.glob('*')))} thumbnails generated")
