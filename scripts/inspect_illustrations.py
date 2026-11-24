from pathlib import Path
from collections import Counter

import numpy as np
from PIL import Image

DOWNLOADS = Path(r"C:\Users\1977\Downloads")
FILES = [
    "ill-start-gate.jpg",
    "ill-hof-farmstead.jpg",
    "ill-philosophie-three-pillars.jpg",
    "ill-tiere-animals.jpg",
    "ill-hofladen-basket.jpg",
]


def dominant_background(rgb: np.ndarray) -> tuple[int, int, int]:
    flat = rgb.reshape(-1, 3)
    quantized = (flat // 4) * 4
    counts = Counter(map(tuple, quantized))
    return counts.most_common(1)[0][0]  # type: ignore[return-value]


def main() -> None:
    for name in FILES:
        path = DOWNLOADS / name
        if not path.exists():
            print(f"{name}: MISSING")
            continue
        rgb = np.asarray(Image.open(path).convert("RGB"))
        bg = np.asarray(dominant_background(rgb), dtype=np.float32)
        lum = rgb.astype(np.float32) @ np.array([0.2126, 0.7152, 0.0722], dtype=np.float32)
        cutoff = np.percentile(lum, 2)
        fg = rgb[lum <= cutoff].astype(np.float32).mean(axis=0)
        diff = fg - bg
        proj = np.clip(((rgb - bg) @ diff) / (diff @ diff), 0, 1)
        print(
            f"{name}: size={rgb.shape[1]}x{rgb.shape[0]} "
            f"bg={tuple(int(v) for v in bg)} fg={tuple(int(v) for v in fg)} "
            f"alpha>0.1={(proj > 0.1).mean():.3%} alpha>0.5={(proj > 0.5).mean():.3%} "
            f"alpha>0.9={(proj > 0.9).mean():.3%}"
        )


if __name__ == "__main__":
    main()
