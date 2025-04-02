# 🚀 Ingestly – Web Content Q&A Tool

**Ingestly** is an intelligent, interactive tool that empowers users to scrape content from multiple URLs and ask questions based solely on the scraped content.

Whether you're a researcher, student, content analyst, or just someone looking to quickly extract insights from web articles, **Ingestly** helps you turn scattered information into focused answers—instantly.

---

## 🌟 Why Use Ingestly?

- 🔍 **Ingest from Any URL** – Easily extract content in markdown and HTML using Firecrawl.
- 🧠 **Ask Smarter Questions** – Get concise answers based only on the content you scraped.
- ⚡ **Fast & Lightweight** – Built with Flask and React for a seamless, responsive experience.
- 🔐 **Private & Local** – Your data stays local and secure. You bring the API keys.

---

## 🌍 Live Demo (Render Hosted)

You can try the app here:  
👉 **[https://ingestly-ai.onrender.com](https://ingestly-ai.onrender.com)**

> ⚠️ **Note:** This app is hosted on [Render](https://render.com)'s free Hobby tier, which may result in:
> - 🐢 **Slow initial load time**
> - ⏳ **Longer wait times during content ingestion**

### 🚀 For Best Performance:

We recommend cloning and running the app locally to experience **Ingestly** with full speed and zero delays.

---

## 🔧 Setup Instructions

### 🐍 1. Backend Setup (Python + Flask)

```bash
cd backend
python -m venv qatool
qatool\Scripts\activate      # For Windows
# or
source qatool/bin/activate   # For Mac/Linux
pip install -r requirements.txt
```

🔑 Add your API keys
Create a .env file inside the backend/ folder:

```bash
FIRECRAWL_API_KEY=your_firecrawl_api_key
GEMINI_API_KEY=your_gemini_api_key
```

### 🌐 2. Frontend Setup (React)

```bash
cd ..
cd frontend
npm install
npm run build
```

### ▶️ 3. Run the Application

```bash
cd ..
cd backend
python app.py
```

---

## 💡 Example Use Case
Enter multiple URLs.

Click “Ingest Content” to scrape their text.

Ask questions like:
“What does the second article say about climate change?”

Get a detailed answer based only on the ingested content.

---

## 🛠 Tech Stack
Frontend: React.js, HTML5, CSS3

Backend: Python, Flask

APIs: Firecrawl, Google Gemini (GenAI)

Others: dotenv, requests

---

## 🤝 Contribute or Customize
Feel free to fork this project and customize it for your own use cases!

---
