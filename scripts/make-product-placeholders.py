"""Create neutral line-art placeholders for products without original photos.

Style follows the Greens/Irlenhof board: surface-2 background, forest ink,
one calm contour line. Outputs 800x600 PNGs used by next/image.
"""
from pathlib import Path
from PIL import Image, ImageDraw

OUT = Path(__file__).resolve().parents[1] / "public" / "media"
OUT.mkdir(parents=True, exist_ok=True)

BG = (238, 243, 230, 255)   # --surface-2
INK = (23, 59, 35, 255)     # --forest
LEAF = (124, 179, 66, 255)  # --leaf
W, H = 800, 600
S = 3  # supersample

canvas = Image.new("RGBA", (W * S, H * S), BG)
d = ImageDraw.Draw(canvas)


def line(points, width=7, fill=INK, joint="curve"):
    d.line([(x * S, y * S) for x, y in points], fill=fill, width=width * S, joint=joint)


def ellipse(box, width=7, fill=INK):
    d.ellipse(tuple(v * S for v in box), outline=fill, width=width * S)


def arc(box, start, end, width=7, fill=INK):
    d.arc(tuple(v * S for v in box), start, end, fill=fill, width=width * S)


def rounded_rect(box, radius=24, width=7, fill=INK):
    d.rounded_rectangle(tuple(v * S for v in box), radius=radius * S, outline=fill, width=width * S)


def save(name):
    img = canvas.resize((W, H), Image.Resampling.LANCZOS)
    img.save(OUT / name)
    print(name)


def reset():
    global canvas, d
    canvas = Image.new("RGBA", (W * S, H * S), BG)
    d = ImageDraw.Draw(canvas)


# 1. Eiernudeln — bowl with wavy noodle strands
reset()
arc((170, 230, 630, 500), 0, 180, 8)
line([(160, 365), (640, 365)], 8)
for i, off in enumerate((0, 34, 68)):
    pts = []
    for x in range(235, 570, 12):
        import math
        y = 270 + off + math.sin((x - 235) / 42) * 18
        pts.append((x, y))
    line(pts, 6, LEAF if i == 1 else INK)
line([(250, 210), (280, 170)], 6)
line([(550, 210), (520, 170)], 6)
save("placeholder-noodles.png")

# 2. Rohmilchkäse — cheese wedge with holes
reset()
line([(180, 390), (610, 250), (600, 420), (180, 450), (180, 390)], 8)
line([(180, 390), (600, 420)], 6, LEAF)
for cx, cy, r in [(330, 375, 22), (450, 350, 16), (520, 395, 12), (395, 410, 10)]:
    ellipse((cx - r, cy - r, cx + r, cy + r), 6)
save("placeholder-cheese.png")

# 3. Zitrusfrüchte — orange with segments and leaf
reset()
ellipse((250, 150, 550, 450), 8)
line([(400, 155), (400, 445)], 5, LEAF)
line([(255, 300), (545, 300)], 5, LEAF)
arc((300, 200, 500, 400), 20, 160, 5, LEAF)
arc((300, 200, 500, 400), 200, 340, 5, LEAF)
line([(410, 150), (455, 95)], 7)
arc((420, 70, 510, 130), 200, 60, 7, LEAF)
save("placeholder-citrus.png")

# 4. Kräuter & Gewürze — spice jar with sprinkles
reset()
rounded_rect((300, 190, 500, 470), 26, 8)
rounded_rect((285, 150, 515, 205), 16, 8, LEAF)
for x, y in [(350, 280), (420, 300), (385, 350), (455, 370), (350, 410), (430, 420)]:
    ellipse((x - 6, y - 6, x + 6, y + 6), 4, LEAF)
line([(250, 470), (550, 470)], 7)
save("placeholder-spices.png")

# 5. Currysauce — sauce bottle
reset()
line([(350, 170), (450, 170), (470, 230), (470, 450), (330, 450), (330, 230), (350, 170)], 8)
rounded_rect((355, 120, 445, 175), 12, 7, LEAF)
line([(330, 300), (470, 300)], 6, LEAF)
line([(365, 350), (435, 350)], 6)
line([(365, 390), (435, 390)], 6)
save("placeholder-curry.png")

# 6. Gelees & Marmeladen — preserving jar
reset()
rounded_rect((280, 210, 520, 470), 24, 8)
rounded_rect((265, 160, 535, 220), 16, 8, LEAF)
line([(300, 300), (500, 300)], 6, LEAF)
for x in (340, 400, 460):
    line([(x, 330), (x, 420)], 5, LEAF)
save("placeholder-preserves.png")

# 7. Rohmilch — milk bottle
reset()
rounded_rect((330, 180, 470, 470), 28, 8)
rounded_rect((365, 130, 435, 185), 14, 8, LEAF)
line([(330, 300), (470, 300)], 6, LEAF)
line([(360, 350), (440, 350)], 6)
line([(360, 390), (440, 390)], 6)
line([(270, 470), (530, 470)], 7)
save("placeholder-milk.png")
