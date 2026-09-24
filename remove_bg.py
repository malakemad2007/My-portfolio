from PIL import Image
from collections import deque

source = Image.open('personal-pic.png').convert('RGBA')
pixels = source.load()
width, height = source.size

# Flood-fill only the connected purple backdrop. The white outline and portrait remain intact.
def is_background(r, g, b):
    return b > 185 and r > 115 and 95 < g < 180 and b - r > 45 and b - g > 70

queue = deque()
seen = set()
for x in range(width):
    queue.append((x, 0))
    queue.append((x, height - 1))
for y in range(height):
    queue.append((0, y))
    queue.append((width - 1, y))

while queue:
    x, y = queue.popleft()
    if (x, y) in seen or x < 0 or y < 0 or x >= width or y >= height:
        continue
    seen.add((x, y))
    r, g, b, a = pixels[x, y]
    if not is_background(r, g, b):
        continue
    pixels[x, y] = (r, g, b, 0)
    queue.extend(((x + 1, y), (x - 1, y), (x, y + 1), (x, y - 1)))

# Keep a compact transparent asset for faster loading while preserving the original framing.
source.save('personal-pic-cutout.png', optimize=True)
print(f'created personal-pic-cutout.png ({width}x{height})')

# Validation: the new file must actually contain transparent pixels.
check = Image.open('personal-pic-cutout.png')
transparent = sum(1 for _, _, _, a in check.getdata() if a == 0)
print(f'transparent pixels: {transparent}')
if transparent == 0:
    raise SystemExit('background removal failed')
