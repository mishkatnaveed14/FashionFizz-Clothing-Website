import os
import urllib.request

output_folder = "assets"
os.makedirs(output_folder, exist_ok=True)

# Yahan prod-1 se prod-40 tak apnay direct image URLs paste kar dein:
image_urls = {
    "prod-1.jpg": "YAHAN_URL_DAALEIN",
    "prod-2.jpg": "YAHAN_URL_DAALEIN",
    "prod-3.jpg": "YAHAN_URL_DAALEIN",
    "prod-4.jpg": "YAHAN_URL_DAALEIN",
    "prod-5.jpg": "YAHAN_URL_DAALEIN",
    "prod-6.jpg": "YAHAN_URL_DAALEIN",
    "prod-7.jpg": "YAHAN_URL_DAALEIN",
    "prod-8.jpg": "YAHAN_URL_DAALEIN",
    "prod-9.jpg": "YAHAN_URL_DAALEIN",
    "prod-10.jpg": "YAHAN_URL_DAALEIN",
    "prod-11.jpg": "YAHAN_URL_DAALEIN",
    "prod-12.jpg": "YAHAN_URL_DAALEIN",
    "prod-13.jpg": "YAHAN_URL_DAALEIN",
    "prod-14.jpg": "YAHAN_URL_DAALEIN",
    "prod-15.jpg": "YAHAN_URL_DAALEIN",
    "prod-16.jpg": "YAHAN_URL_DAALEIN",
    "prod-17.jpg": "YAHAN_URL_DAALEIN",
    "prod-18.jpg": "YAHAN_URL_DAALEIN",
    "prod-19.jpg": "YAHAN_URL_DAALEIN",
    "prod-20.jpg": "YAHAN_URL_DAALEIN",
    "prod-21.jpg": "YAHAN_URL_DAALEIN",
    "prod-22.jpg": "YAHAN_URL_DAALEIN",
    "prod-23.jpg": "YAHAN_URL_DAALEIN",
    "prod-24.jpg": "YAHAN_URL_DAALEIN",
    "prod-25.jpg": "YAHAN_URL_DAALEIN",
    "prod-26.jpg": "YAHAN_URL_DAALEIN",
    "prod-27.jpg": "YAHAN_URL_DAALEIN",
    "prod-28.jpg": "YAHAN_URL_DAALEIN",
    "prod-29.jpg": "YAHAN_URL_DAALEIN",
    "prod-30.jpg": "YAHAN_URL_DAALEIN",
    "prod-31.jpg": "YAHAN_URL_DAALEIN",
    "prod-32.jpg": "YAHAN_URL_DAALEIN",
    "prod-33.jpg": "YAHAN_URL_DAALEIN",
    "prod-34.jpg": "YAHAN_URL_DAALEIN",
    "prod-35.jpg": "YAHAN_URL_DAALEIN",
    "prod-36.jpg": "YAHAN_URL_DAALEIN",
    "prod-37.jpg": "YAHAN_URL_DAALEIN",
    "prod-38.jpg": "YAHAN_URL_DAALEIN",
    "prod-39.jpg": "YAHAN_URL_DAALEIN",
    "prod-40.jpg": "YAHAN_URL_DAALEIN"
}

headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}

print(f"Starting downloads into './{output_folder}/' ...\n")

for filename, img_url in image_urls.items():
    if img_url == "YAHAN_URL_DAALEIN":
        print(f"Skipped {filename}: URL not provided yet.")
        continue
        
    save_path = os.path.join(output_folder, filename)
    try:
        req = urllib.request.Request(img_url, headers=headers)
        with urllib.request.urlopen(req) as response, open(save_path, 'wb') as f:
            f.write(response.read())
        print(f"Saved: {filename}")
    except Exception as e:
        print(f"Error {filename}: {e}")

print("\nProcess finished!")