#!/usr/bin/env python3
"""User-uploaded portrait (round 13) -> public/images/mobile-hero.jpg.
941x1672 (leather-jacket man + duffel against sunlit wall) -> Lanczos 1.5x
upscale (1411x2508, ~native for 390x844 @3x) + gentle unsharp, JPEG q84 progressive."""
from PIL import Image, ImageFilter, ImageOps
import os, shutil

SRC = "/home/z/my-project/upload/pasted_image_1789916872850.png"
DST = "/home/z/my-project/public/images/mobile-hero.jpg"
PREV = "/home/z/my-project/tmp-search/mobile-hero-round12.jpg"

if os.path.exists(DST) and not os.path.exists(PREV):
    shutil.copy2(DST, PREV)
    print("backed up round-12 mobile hero ->", PREV)

img = ImageOps.exif_transpose(Image.open(SRC)).convert("RGB")
w, h = img.size
print("source:", w, "x", h)
up = img.resize((int(w * 1.5), int(h * 1.5)), Image.LANCZOS)
up = up.filter(ImageFilter.UnsharpMask(radius=1.4, percent=55, threshold=2))
up.save(DST, "JPEG", quality=84, optimize=True, progressive=True)
print("saved", DST, up.size, f"{os.path.getsize(DST)/1024:.0f} KB")
