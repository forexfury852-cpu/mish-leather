#!/bin/bash
# Download self-hosted luxury fonts: Vazirmatn (Persian) + Marcellus (Latin display)
set -u
FONT_DIR="/home/z/my-project/public/fonts"
mkdir -p "$FONT_DIR"

for w in Thin ExtraLight Light Regular Medium SemiBold Bold ExtraBold Black; do
  if [ -s "$FONT_DIR/Vazirmatn-$w.woff2" ]; then echo "SKIP Vazirmatn-$w"; continue; fi
  curl -sfL "https://cdn.jsdelivr.net/gh/rastikerdar/vazirmatn@v33.003/fonts/webfonts/Vazirmatn-$w.woff2" \
    -o "$FONT_DIR/Vazirmatn-$w.woff2" && echo "OK Vazirmatn-$w" || echo "FAIL Vazirmatn-$w"
done

if [ ! -s "$FONT_DIR/Marcellus-400.woff2" ]; then
  curl -sfL "https://cdn.jsdelivr.net/fontsource/fonts/marcellus@latest/latin-400-normal.woff2" \
    -o "$FONT_DIR/Marcellus-400.woff2" && echo "OK Marcellus-400" || echo "FAIL Marcellus-400"
else
  echo "SKIP Marcellus-400"
fi

ls -la "$FONT_DIR"
echo "FONTS_DONE"
