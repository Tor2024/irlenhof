"""Generate the Irlenhof favicon from the original white emblem in logo.png."""
from pathlib import Path
from PIL import Image
import base64

ROOT = Path(__file__).resolve().parents[1]
PUB = ROOT / "public"
logo = Image.open(PUB / "media" / "logo.png").convert("RGBA")
emblem = logo.crop((20, 3, 75, 97))

GREEN = (23, 59, 35, 255)  # --forest — white emblem stays legible at 16px


def render(size: int) -> Image.Image:
    canvas = Image.new("RGBA", (size, size), GREEN)
    pad = int(size * 0.14)
    max_w, max_h = size - 2 * pad, size - 2 * pad
    art = emblem.copy()
    art.thumbnail((max_w, max_h), Image.Resampling.LANCZOS)
    canvas.alpha_composite(art, ((size - art.width) // 2, (size - art.height) // 2))
    return canvas


# Multi-resolution ICO (browsers pick the best size).
sizes = [16, 32, 48, 64]
images = [render(s) for s in sizes]
images[0].save(
    PUB / "favicon.ico",
    format="ICO",
    sizes=[(s, s) for s in sizes],
)

# Apple touch icon and generic PNG icons.
render(180).save(PUB / "apple-touch-icon.png")
render(192).save(PUB / "icon-192.png")
render(512).save(PUB / "icon-512.png")

# SVG wrapper embedding the 64px PNG for crisp vector-ish rendering where supported.
png_bytes = (PUB / "favicon-64.png").read_bytes() if (PUB / "favicon-64.png").exists() else None
render(64).save(PUB / "favicon-64.png")
b64 = base64.b64encode((PUB / "favicon-64.png").read_bytes()).decode("ascii")
svg = f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64"><image width="64" height="64" href="data:image/png;base64,{b64}"/></svg>'
(PUB / "favicon.svg").write_text(svg, encoding="utf-8")
print("favicon.ico, favicon.svg, favicon-64.png, apple-touch-icon.png, icon-192.png, icon-512.png")
