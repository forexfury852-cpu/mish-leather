#!/usr/bin/env python3
"""Process generated hero art -> public/images/hero.jpg (desktop hero).
Lanczos 1.5x upscale + gentle unsharp for full-viewport crispness."""
from PIL import Image, ImageFilter
import os, shutil

SRC = "/home/z/my-project/tmp-search/hero_a.png"
DST = "/home/z/my-project/public/images/hero.jpg"
OLD = "/home/z/my-project/tmp-search/hero-old.jpg"

# backup current hero
if os.path.exists(DST) and not os.path.exists(OLD):
    shutil.copy2(DST, OLD)
    print("backed up old hero ->", OLD)

img = Image.open(SRC).convert("RGB")
w, h = img.size
up = img.resize((int(w * 1.5), int(h * 1.5)), Image.LANCZOS)  # 2016x1152
up = up.filter(ImageFilter.UnsharpMask(radius=1.4, percent=58, threshold=2))
up.save(DST, "JPEG", quality=86, optimize=True, progressive=True)
print("saved", DST, up.size, f"{os.path.getsize(DST)/1024:.0f} KB")
