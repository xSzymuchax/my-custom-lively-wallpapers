import os
import json

# Folder z obrazkami (wewnątrz projektu)
folder = os.path.join(os.path.dirname(__file__), 'PhotoHeartParticle', 'SamplePhotos')

# Dozwolone rozszerzenia
exts = {".jpg", ".jpeg", ".png", ".webp"}

# Pobierz tylko pliki z wybranymi rozszerzeniami
files = [
    f for f in os.listdir(folder)
    if os.path.splitext(f)[1].lower() in exts and os.path.isfile(os.path.join(folder, f))
]

# Posortuj alfabetycznie (opcjonalnie)
files.sort()

# Zapisz same nazwy plików do JSON-a
with open(os.path.join(os.path.dirname(__file__), "photos.json"), "w", encoding="utf-8") as out:
    json.dump(files, out, ensure_ascii=False, indent=2)

print(f"Wygenerowano photos.json z {len(files)} plikami.")
