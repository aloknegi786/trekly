import os

def rename_images(folder_path):
    # 1. Verify the folder exists
    if not os.path.exists(folder_path):
        print(f"Error: The folder '{folder_path}' does not exist.")
        return

    # 2. Define valid image extensions
    valid_extensions = {".jpg", ".jpeg", ".png", ".gif", ".webp", ".bmp"}
    
    # 3. Get list of files
    try:
        files = os.listdir(folder_path)
    except Exception as e:
        print(f"Error accessing folder: {e}")
        return

    # Sort files to ensure order (e.g. by name)
    files.sort()

    count = 1
    renamed_count = 0

    print(f"Scanning folder: {folder_path}...\n")

    for filename in files:
        # Get file extension
        name, ext = os.path.splitext(filename)
        ext = ext.lower()

        # Check if it is an image
        if ext in valid_extensions:
            # New name: img1.jpg, img2.jpeg, etc.
            new_name = f"img{count}{ext}"
            
            old_file = os.path.join(folder_path, filename)
            new_file = os.path.join(folder_path, new_name)

            # Prevent renaming if the file is already named correctly
            if filename != new_name:
                try:
                    # Handle case where "img1.jpg" already exists from a previous run
                    if os.path.exists(new_file):
                        print(f"Skipping {filename}: Target {new_name} already exists.")
                    else:
                        os.rename(old_file, new_file)
                        print(f"Renamed: {filename} -> {new_name}")
                        renamed_count += 1
                except OSError as e:
                    print(f"Error renaming {filename}: {e}")
            
            # Always increment count so next file is img2, img3, etc.
            count += 1

    print(f"\nDone! Renamed {renamed_count} images.")

# --- YOUR PATH IS HERE ---
folder_to_rename = r"C:\Users\aloks\Downloads\Images"

rename_images(folder_to_rename)