import os
from flask import Flask, request, jsonify, send_from_directory, abort
from dotenv import load_dotenv
from backend.scraper import scrape_content
import google.genai as genai

# Load environment variables from .env file
load_dotenv()

# Retrieve API keys from environment variables
FIRECRAWL_API_KEY = os.getenv("FIRECRAWL_API_KEY")
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

# Initialize the Gemini client using google.genai
client = genai.Client(api_key=GEMINI_API_KEY)
model_name = "gemini-2.0-flash"  # Use the appropriate model per your Vertex AI setup
types = genai.types

# Commenting this part because we are deploying frontend and backend separately on render
# Compute absolute path for the React build folder
# build_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), '../frontend/build'))
# print("Build folder (React build):", build_dir)

# Commenting this part because we are deploying frontend and backend separately on render
# app = Flask(__name__, static_folder=None)  # We'll serve static files manually
app = Flask(__name__)

# Commenting this part because we are deploying frontend and backend separately on render
# @app.route('/')
# def serve_react_app():
#     index_path = os.path.join(build_dir, 'index.html')
#     if not os.path.exists(index_path):
#         print("index.html not found at:", index_path)
#         abort(404)
#     return send_from_directory(build_dir, 'index.html', mimetype='text/html')

# For render only
@app.route('/', methods=['GET', 'HEAD'])
def health_check():
    return '', 200

# @app.route('/static/<path:filename>')
# def serve_static(filename):
#     static_dir = os.path.join(build_dir, 'static')
#     file_path = os.path.join(static_dir, filename)
#     if not os.path.exists(file_path):
#         print("Static file not found:", file_path)
#         abort(404)
#     return send_from_directory(static_dir, filename)

@app.route('/ingest', methods=['POST'])
def ingest_content_endpoint():
    data = request.json
    urls = data.get('urls', [])
    content = scrape_content(urls)
    return jsonify({'content': content})

@app.route('/ask', methods=['POST'])
def ask_question():
    data = request.json
    question = data.get('question', '')
    content = data.get('content', '')
    
    if not question or not content:
        return jsonify({'error': 'Question or content missing!'}), 400

    answer = generate_answer(content, question)
    return jsonify({'answer': answer})

def generate_answer(content, question):
    # Create a prompt that combines the scraped content and the user's question
    prompt = f"Given the following content:\n{content}\nAnswer the following question:\n{question}"
    try:
        # Use the Gemini client from google.genai to generate an answer.
        # Here we assume the client.models.generate_content method returns an object with a .text attribute.
        response = client.models.generate_content(
            model=model_name,
            contents=[prompt]
        )
        return response.text.strip()
    except Exception as e:
        return f"An error occurred: {e}"

# Commenting this part because we are deploying frontend and backend separately on render
# if __name__ == '__main__':
#     app.run(debug=True)