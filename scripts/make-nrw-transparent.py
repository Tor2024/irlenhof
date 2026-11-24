from PIL import Image

src = r'C:\1-2\ok\public\media\nrw-foerderung.png'
dst = r'C:\1-2\ok\public\media\nrw-foerderung-transparent.png'

im = Image.open(src).convert('RGBA')
out = Image.new('RGBA', im.size)
for y in range(im.size[1]):
    for x in range(im.size[0]):
        r, g, b, a = im.getpixel((x, y))
        # derive coverage from distance to the white background
        cov = 255 - min(r, g, b)
        if cov <= 2:
            continue
        f = cov / 255
        # un-premultiply pixels that were composited over white
        rr = max(0, min(255, round((r - 255 * (1 - f)) / f)))
        gg = max(0, min(255, round((g - 255 * (1 - f)) / f)))
        bb = max(0, min(255, round((b - 255 * (1 - f)) / f)))
        out.putpixel((x, y), (rr, gg, bb, min(a, cov)))
out.save(dst)
print('saved', dst, im.size)
