"""Genera las imágenes optimizadas de la web a partir de las fotos originales.

Uso:  python scripts/optimizar-imagenes.py
- fotos/*.jpg|jpeg  ->  fotos/web/<nombre>-640.webp y <nombre>-1200.webp
- fotos/Logo.jpg    ->  logo para la cabecera, favicons e icono de Apple
Los originales no se tocan. Al añadir una foto nueva, basta con volver a ejecutarlo.
"""
from pathlib import Path
from PIL import Image, ImageOps

RAIZ = Path(__file__).resolve().parent.parent
ORIGEN = RAIZ / "fotos"
DESTINO = ORIGEN / "web"
ANCHOS = (640, 1200)
CALIDAD = 78


def abrir(ruta):
    img = Image.open(ruta)
    img = ImageOps.exif_transpose(img)  # respeta la rotación de la cámara
    return img.convert("RGB")


def fotos():
    DESTINO.mkdir(exist_ok=True)
    for ruta in sorted(ORIGEN.iterdir()):
        if ruta.suffix.lower() not in (".jpg", ".jpeg") or ruta.stem == "Logo":
            continue
        img = abrir(ruta)
        nombre = ruta.stem.lower()
        for ancho in ANCHOS:
            w = min(ancho, img.width)
            h = round(img.height * w / img.width)
            salida = DESTINO / f"{nombre}-{ancho}.webp"
            img.resize((w, h), Image.LANCZOS).save(salida, "WEBP", quality=CALIDAD, method=6)
            print(f"{salida.relative_to(RAIZ)}  {w}x{h}  {salida.stat().st_size // 1024} KB")


def logo():
    img = abrir(ORIGEN / "Logo.jpg")
    # Logo de cabecera: se muestra a 56 px de alto, se genera a 3x
    alto = 168
    ancho = round(img.width * alto / img.height)
    peque = img.resize((ancho, alto), Image.LANCZOS)
    peque.save(DESTINO / "logo-168.webp", "WEBP", quality=85, method=6)
    peque.save(DESTINO / "logo-168.png", optimize=True)
    print(f"logo  {ancho}x{alto}")

    # Favicons: recorte cuadrado centrado en el dibujo
    lado = img.width
    arriba = 100
    cuadrado = img.crop((0, arriba, lado, arriba + lado))
    cuadrado.resize((180, 180), Image.LANCZOS).save(RAIZ / "apple-touch-icon.png", optimize=True)
    cuadrado.resize((32, 32), Image.LANCZOS).save(RAIZ / "favicon-32.png", optimize=True)
    cuadrado.save(RAIZ / "favicon.ico", sizes=[(16, 16), (32, 32), (48, 48)])
    print("favicons generados")


if __name__ == "__main__":
    fotos()
    logo()
