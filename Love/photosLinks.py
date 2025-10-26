import os
import json

folder = os.path.join(os.path.dirname(__file__), 'PhotoHeartParticle', 'SamplePhotos')

exts = {".jpg", ".jpeg", ".png", ".webp"}

files = [
    f for f in os.listdir(folder)
    if os.path.splitext(f)[1].lower() in exts and os.path.isfile(os.path.join(folder, f))
]
files.sort()

with open(os.path.join(os.path.dirname(__file__), "photos.json"), "w", encoding="utf-8") as out:
    json.dump(files, out, ensure_ascii=False, indent=2)

print(f"Wygenerowano photos.json z {len(files)} plikami.")
