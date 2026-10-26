import os
import urllib.request

output_folder = "assets"
os.makedirs(output_folder, exist_ok=True)

print(f"Starting downloads into './{output_folder}/' ...\n")

for i in range(1, 41):
    filename = f"prod-{i}.jpg"
    save_path = os.path.join(output_folder, filename)
    
    # Using unique seed URLs so each product gets its own consistent image
    img_url = f"https://picsum.photos/seed/product{i}/600/800"
    
    try:
        urllib.request.urlretrieve(img_url, save_path)
        print(f"Saved: {filename}")
    except Exception as e:
        print(f"Error {filename}: {e}")

print("\nAll 40 images downloaded successfully!")