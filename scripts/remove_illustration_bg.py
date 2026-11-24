"""Remove the flat JPEG background from the generated Irlenhof illustrations.

The source files are square JPEGs with a near-uniform cream/sage background and
a single thin dark contour.  This script turns that background into alpha and
recolours the contour to the board's forest green, so the drawings can sit on
any section background without a visible tile edge.

Usage: python scripts/remove_illustration_bg.py
"""

from pathlib import Path
from collections import Counter

import numpy as np
from PIL import Image

DOWNLOADS = Path(r"C:\Users\1977\Downloads")
OUTPUT = Path(__file__).resolve().parents[1] / "public" / "media" / "illustrations"
FILES = [
    "ill-start-gate.jpg",
    "ill-hof-farmstead.jpg",
    "ill-philosophie-three-pillars.jpg",
    "ill-tiere-animals.jpg",
    "ill-hofladen-basket.jpg",
    "ill-aktuelles-harvest-calendar.jpg",
    "ill-kontakt-house.jpg",
    "ill-oeffnungszeiten-door-clock.jpg",
    "ill-produkte-crates.jpg",
    "ill-hofladen-online-laptop.jpg",
    "ill-galerie-album.jpg",
    "ill-faq-book.jpg",
]

# Board token --forest, used for every contour line.
INK = np.array([23, 59, 35], dtype=np.float32)
LUMA = np.array([0.2126, 0.7152, 0.0722], dtype=np.float32)
NOISE_FLOOR = 0.06


def dominant_background(rgb: np.ndarray) -> np.ndarray:
    flat = rgb.reshape(-1, 3)
    quantized = (flat // 4) * 4
    counts = Counter(map(tuple, quantized))
    return np.asarray(counts.most_common(1)[0][0], dtype=np.float32)  # type: ignore[arg-type]


def ascii_preview(alpha: np.ndarray, width: int = 72, height: int = 24) -> str:
    h, w = alpha.shape
    ys = np.linspace(0, h, height + 1).astype(int)
    xs = np.linspace(0, w, width + 1).astype(int)
    ramp = " .:-=+*#%@"
    lines: list[str] = []
    for y in range(height):
        row = ""
        for x in range(width):
            block = alpha[ys[y] : ys[y + 1], xs[x] : xs[x + 1]]
            value = float(block.max()) if block.size else 0.0
            row += ramp[min(len(ramp) - 1, int(value * len(ramp)))]
        lines.append(row)
    return "\n".join(lines)


def main() -> None:
    OUTPUT.mkdir(parents=True, exist_ok=True)
    for name in FILES:
        source = DOWNLOADS / name
        if not source.exists():
            print(f"{name}: MISSING")
            continue

        rgb = np.asarray(Image.open(source).convert("RGB"), dtype=np.float32)
        bg = dominant_background(rgb)
        bg_luma = float(bg @ LUMA)
        ink_luma = float(INK @ LUMA)

        # Luminance blend: background is light, ink is dark.  Works even when
        # the generated line is slightly grey rather than pure forest green.
        alpha = np.clip((bg_luma - (rgb @ LUMA)) / (bg_luma - ink_luma), 0.0, 1.0)
        alpha[alpha < NOISE_FLOOR] = 0.0

        rgba = np.empty((*rgb.shape[:2], 4), dtype=np.uint8)
        rgba[..., :3] = INK.astype(np.uint8)
        rgba[..., 3] = np.round(alpha * 255).astype(np.uint8)

        target = OUTPUT / source.with_suffix(".png").name
        Image.fromarray(rgba, mode="RGBA").save(target, optimize=True)

        opaque = alpha > 0
        ys, xs = np.nonzero(opaque)
        bbox = (
            f"x={xs.min()/rgb.shape[1]:.2f}-{xs.max()/rgb.shape[1]:.2f} "
            f"y={ys.min()/rgb.shape[0]:.2f}-{ys.max()/rgb.shape[0]:.2f}"
        )
        print(
            f"{name} -> {target.relative_to(Path(__file__).resolve().parents[1])}\n"
            f"  bg={tuple(int(v) for v in bg)} ink={tuple(int(v) for v in INK)} "
            f"coverage={opaque.mean():.2%} {bbox} "
            f"alpha>0.5={(alpha > 0.5).mean():.2%}"
        )
        print(ascii_preview(alpha))


if __name__ == "__main__":
    main()
