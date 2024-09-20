from flask import Flask, request, jsonify
import os
from rembg import remove
from PIL import Image
from werkzeug.utils import secure_filename
import uuid
from flask_cors import CORS

UPLOAD_FOLDER = 'static/upload_images/'
OUTPUT_FOLDER = 'static/output_images/'
ALLOWED_EXTENSIONS = set(['.png', '.jpg', '.jpeg'])

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:8080"}})
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['MAX_CONTENT_LENGTH'] = 20 * 1000 * 1000

@app.route("/api/removebg", methods=['POST', 'OPTIONS'])
def removebg():
    if request.method == "POST":
        file = request.files['file']
        
        if file.filename == '':
            return jsonify({
                "message": "No selected file"
            }), 400
        
        if file and os.path.splitext(file.filename)[-1] not in ALLOWED_EXTENSIONS:
            return jsonify({
                "message": "Wrong file extension"
            }), 400
            
        filename = secure_filename(file.filename)
        file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
        
        input_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        input_name = os.path.splitext(filename)[0] 
        
        try:
            input = Image.open(input_path)
            output = remove(input)
            output_path = os.path.join(OUTPUT_FOLDER, f"{input_name}-{str(uuid.uuid4())[:6]}.png")
            output.save(output_path)
            return jsonify({
                "result": "success",
                "url": f"{output_path}"
            }), 200
        except Exception as e:
            print(e)
            return jsonify({
                "message": "Error"
            }), 400

if __name__ == "__main__":
    #clear_image()
    app.run(host="0.0.0.0", debug=True, port=5100, threaded=True)