import pytesseract
from PIL import Image
import spacy
import json

# Specify the Tesseract OCR executable path if it's not in PATH
pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe'

# Step 1: Extract text from image
def extract_text_from_image(image_path):
    try:
        image = Image.open(image_path)
        text = pytesseract.image_to_string(image)
        print("Extracted Text:", text)  # Debugging statement
        return text
    except Exception as e:
        print(f"Error extracting text: {e}")
        return None

# Step 2: Classify the extracted text
def classify_text(text):
    try:
        nlp = spacy.load("en_core_web_sm")
        doc = nlp(text)
        
        classified_data = {
            "dates": [],
            "organizations": [],
            "people": [],
            "misc": []
        }
        
        for entity in doc.ents:
            if entity.label_ == "DATE":
                classified_data["dates"].append(entity.text)
            elif entity.label_ == "ORG":
                classified_data["organizations"].append(entity.text)
            elif entity.label_ == "PERSON":
                classified_data["people"].append(entity.text)
            else:
                classified_data["misc"].append(entity.text)
        
        print("Classified Data:", classified_data)  # Debugging statement
        return classified_data
    except Exception as e:
        print(f"Error classifying text: {e}")
        return None

# Step 3: Convert classified data to JSON format
def convert_to_json(classified_data):
    try:
        json_data = json.dumps(classified_data, indent=4)
        return json_data
    except Exception as e:
        print(f"Error converting to JSON: {e}")
        return None

# Step 4: Process the image and get JSON output
def process_image(image_path):
    text = extract_text_from_image(image_path)
    if text:
        classified_data = classify_text(text)
        if classified_data:
            json_data = convert_to_json(classified_data)
            return json_data
    return None  # Return None if any step fails

# Define the image path
image_path = r"c:\Users\aayus\AppData\Local\Packages\5319275A.WhatsAppDesktop_cv1g1gvanyjgm\TempState\DF9028FCB6B065E000FFE8A4F03EEB38\WhatsApp Image 2024-08-30 at 21.22.43_76c7b5da.jpg"

# Run the script
json_output = process_image(image_path)

if json_output:
    print(json_output)
else:
    print("Processing failed. Please check the image and try again.")