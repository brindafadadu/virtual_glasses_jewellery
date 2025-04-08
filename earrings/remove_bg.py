from rembg import remove
from PIL import Image
import io

#load image
with open("earrings2.png", "rb") as f:
    input_data = f.read()

#remove background
output_data = remove(input_data)

#save result
with open("earrings_no_bg.png", "wb") as out:
    out.write(output_data)
