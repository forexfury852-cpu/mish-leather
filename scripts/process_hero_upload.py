#!/usr/bin/env python3
"""User-uploaded hero art -> public/images/hero.jpg (desktop hero, round 11).
Lanczos 1.25x upscale + gentle unsharp for full-viewport crispness."""
from PIL import Image, ImageFilter, ImageOps
import os, shutil

SRC = "/home/z/my-project/upload/pasted_image_1789915387373.png"
DST = "/home/z/my-project/public/images/hero.jpg"
PREV = "/home/z/my-project/tmp-search/hero-round10.jpg"

if os.path.exists(DST) and not os.path.exists(PREV):
    shutil.copy2(DST, PREV)
    print("backed up round-10 hero ->", PREV)

img = ImageOps.exif_transpose(Image.open(SRC)).convert("RGB")
w, h = img.size
up = img.resize((int(w * 1.25), int(h * 1.25)), Image.LANCZOS)  # 2090x1176
up = up.filter(ImageFilter.UnsharpMask(radius=1.3, percent=52, threshold=2))
up.save(DST, "JPEG", quality=87, optimize=True, progressive=True)
print("saved", DST, up.size, f"{os.path.getsize(DST)/1024:.0f} KB")
