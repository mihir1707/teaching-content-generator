# 🎓 EduSlide AI

> **AI-Powered Educational Content Creation from YouTube Videos, Web Articles, and Documents**

An intelligent teaching assistant that transforms any learning resource into comprehensive educational materials including structured notes, summaries, MCQs, and professional PowerPoint presentations. Built with a modern React frontend and a Flask RAG backend powered by Google Gemini and Pinecone.

---

## 📑 Table of Contents

- [Overview](#-overview)
- [Key Features](#-key-features)
- [Architecture](#-architecture)
- [Technology Stack](#-technology-stack)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Usage](#-usage)
- [API Endpoints](#-api-endpoints)
- [Pipeline Flow](#-pipeline-flow)
- [Project Structure](#-project-structure)

---

## 🌟 Overview

**Teaching Content Generator** is an advanced RAG (Retrieval-Augmented Generation) system that democratizes educational content creation. Whether you're a teacher preparing lectures, a student creating study materials, or a content creator developing courses, this tool automates the entire content generation pipeline.

### What Makes It Special?

- **Multi-Source Support**: Works with YouTube videos, web articles, and uploaded documents (PDF, DOCX, images)
- **Intelligent RAG Pipeline**: Uses semantic chunking, embeddings, and vector search for accurate content retrieval
- **Pedagogically Sound**: Generates content with proper structure, analogies, and real-world examples
- **Customizable Output**: Adjustable difficulty levels (beginner/intermediate/advanced) and styles (concise/detailed/exam-prep)
- **Professional Deliverables**: Auto-generates PowerPoint presentations ready for classroom use

---

## ✨ Key Features

### 🎬 YouTube Video Processing
- Automatic transcript extraction with multi-language support
- Auto-translation to English for non-English videos
- Smart handling of captions and subtitles

### 📰 Web Article Scraping
- Clean extraction of article content from any URL
- Automatic removal of ads, navigation, and irrelevant elements
- Metadata extraction (title, author, date)

### 📄 Document Upload
- Supports multiple formats: PDF, DOCX, DOC, TXT, images (PNG, JPG, TIFF)
- Advanced extraction using **Docling** (preferred) with fallback to PyPDF2, python-docx, pytesseract
- OCR capability for image-based documents

### 🧠 Intelligent Content Generation
- **Structured Notes**: 7-10 well-organized sections with key points
- **Executive Summary**: Concise overview with main takeaways
- **MCQ Generation**: High-quality multiple-choice questions with explanations
- **Glossary**: Key terms and definitions
- **Misconceptions**: Common mistakes and corrections

### 🎨 PowerPoint Generation
- Professional slide design with proper formatting
- Optimal text per slide (10-12 lines)
- Separate answer slides for MCQs
- Customizable themes and layouts

---

## 🏗 Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                    INPUT SOURCES                                 │
├──────────────┬─────────────────┬────────────────────────────────┤
│  YouTube     │   Web Article   │   File Upload                  │
│  Video URL   │   URL           │   (PDF, DOCX, Images)          │
└──────┬───────┴────────┬────────┴──────────┬─────────────────────┘
       │                 │                    │
       ▼                 ▼                    ▼
┌─────────────────────────────────────────────────────────────────┐
│                 TEXT EXTRACTION LAYER                            │
├──────────────┬─────────────────┬────────────────────────────────┤
│ youtube-     │  LangChain      │  Docling / PyPDF2 /            │
│ transcript-  │  WebBaseLoader  │  python-docx / pytesseract     │
│ api          │                 │                                 │
└──────┬───────┴────────┬────────┴──────────┬─────────────────────┘
       │                 │                    │
       └─────────────────┴────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│                    TEXT PREPROCESSING                            │
│  • Normalization  • Language Detection  • Translation (if needed)│
└──────────────────────────────┬──────────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────────┐
│                 CHUNKING (LangChain)                             │
│  • RecursiveCharacterTextSplitter                                │
│  • Token-aware chunking (tiktoken)                               │
│  • Size: 800 tokens, Overlap: 160 tokens                        │
│  • Deterministic chunk IDs (SHA-1 hash)                          │
└──────────────────────────────┬──────────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────────┐
│              EMBEDDING (SentenceTransformers)                    │
│  • Model: all-MiniLM-L6-v2                                       │
│  • Dimension: 384                                                │
│  • Local & Free (no API costs)                                  │
│  • Batch processing for efficiency                               │
└──────────────────────────────┬──────────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────────┐
│            VECTOR DATABASE (Pinecone)                            │
│  • Serverless index with cosine similarity                       │
│  • Namespace isolation per source                                │
│    - video:<video_id>                                            │
│    - article:<domain>:<hash>                                     │
│    - file:<hash>:<timestamp>                                     │
└──────────────────────────────┬──────────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────────┐
│              PLAN GENERATION (Google Gemini)                     │
│  • User inputs topic name and description                        │
│  • LLM generates content plan/outline                            │
│  • Model: gemini-3.6-flash                                       │
└──────────────────────────────┬──────────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────────┐
│                   USER APPROVAL GATE                             │
│                                                                   │
│    ┌─────────────┐              ┌─────────────┐                │
│    │   Display   │              │   User      │                │
│    │   Plan to   │─────────────▶│   Reviews   │                │
│    │   User      │              │   & Decides │                │
│    └─────────────┘              └──────┬──────┘                │
│                                         │                         │
│                        ┌────────────────┴──────────────┐         │
│                        │                                │         │
│                  Not Approved                      Approved      │
│                        │                                │         │
│                        ▼                                ▼         │
│              ┌──────────────────┐           ┌──────────────────┐│
│              │  User Inputs     │           │  Proceed to      ││
│              │  Changes/        │───┐       │  Query           ││
│              │  Modifications   │   │       │  Generation      ││
│              └──────────────────┘   │       └────────┬─────────┘│
│                                      │                │          │
│                                      │                │          │
└──────────────────────────────────────┼────────────────┼──────────┘
                                       │                │
                                       └────────┐       │
                                                │       │
                                                ▼       │
                                        ┌─────────────┐ │
                                        │ Regenerate  │ │
                                        │ Plan with   │ │
                                        │ Changes     │ │
                                        └──────┬──────┘ │
                                               │        │
                                               └────────┘
                                                        │
                                                        ▼
┌─────────────────────────────────────────────────────────────────┐
│           QUERY GENERATION (Google Gemini)                       │
│  • Generates 8 diverse retrieval queries from approved plan      │
│  • Mix of conceptual, how-to, and comparison queries            │
│  • Model: gemini-3.6-flash                                       │
└──────────────────────────────┬──────────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────────┐
│         RAG RETRIEVAL (Dense + Fusion)                           │
│  • Multi-query retrieval (5 chunks per query)                   │
│  • Reciprocal Rank Fusion (RRF) for result merging              │
│  • Final top-K selection based on style                          │
│    - Concise: 3 chunks                                           │
│    - Detailed: 8 chunks                                          │
│    - Exam-prep: 5 chunks                                         │
└──────────────────────────────┬──────────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────────┐
│         CONTENT GENERATION (Google Gemini)                       │
│  • Structured Notes with sections, key points, glossary         │
│  • Executive Summary with main takeaways                         │
│  • MCQs with explanations and difficulty distribution           │
│  • Pedagogically enhanced with analogies & examples             │
│  • Model: gemini-3.6-flash                                       │
└──────────────────────────────┬──────────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────────┐
│         PRESENTATION BUILDER (python-pptx)                       │
│  • Title slide with topic & level                               │
│  • Summary & Key Points slides                                   │
│  • Section slides (one per topic section)                        │
│  • Glossary slide                                                │
│  • MCQ slides with separate answer slides                        │
│  • Professional formatting & color schemes                       │
└──────────────────────────────┬──────────────────────────────────┘
                               │
                               ▼
                        OUTPUT FILES
        ┌───────────────┬───────────────┬────────────────┐
        │  JSON Results │  PPT File     │  Cached Data   │
        └───────────────┴───────────────┴────────────────┘
```

---

## 🛠 Technology Stack

### Core Framework
- **Flask**: Web framework for REST API
- **Python 3.8+**: Primary programming language

### NLP & AI Models
- **Google Gemini (gemini-3.6-flash)**: 
  - Query generation from topic plans
  - Content generation (notes, summaries, MCQs)
  - Pedagogical enhancement with analogies
- **SentenceTransformers (all-MiniLM-L6-v2)**: 
  - Local embedding generation (384-dim vectors)
  - Free, no API costs
  - Fast batch processing

### Text Processing
- **LangChain**: 
  - `RecursiveCharacterTextSplitter` for semantic chunking
  - `WebBaseLoader` for article scraping
  - Document loaders and text splitters
- **tiktoken**: Token counting for accurate chunk sizing
- **langdetect**: Language detection for auto-translation

### Vector Database
- **Pinecone**: 
  - Serverless vector database
  - Cosine similarity search
  - Namespace-based isolation
  - Cloud: AWS, Region: us-east-1

### Document Processing
- **Docling**: Advanced document extraction (preferred)
- **PyPDF2**: PDF text extraction (fallback)
- **python-docx**: DOCX document processing
- **pytesseract**: OCR for images and scanned documents
- **Pillow**: Image processing

### Content Extraction
- **youtube-transcript-api**: YouTube transcript fetching
- **BeautifulSoup4**: HTML parsing for web scraping
- **lxml**: Fast XML/HTML processing

### Presentation Generation
- **python-pptx**: PowerPoint generation
- Professional slide layouts
- Custom formatting and themes

### Utilities
- **python-dotenv**: Environment configuration
- **Flask-CORS**: Cross-origin resource sharing
- **requests**: HTTP client
- **deep-translator**: Language translation

---

## 📦 Installation

### Prerequisites
- Python 3.10 or higher
- Node.js 18+ and npm
- pip package manager
- (Optional) Tesseract OCR for image/scanned PDF processing

### Step 1: Clone Repository
```bash
git clone https://github.com/yourusername/Teaching-content-generator.git
cd Teaching-content-generator
```

### Step 2: Create Virtual Environment
```bash
# macOS/Linux
python3 -m venv .venv
source .venv/bin/activate

# Windows
python -m venv .venv
.venv\Scripts\activate
```

### Step 3: Install Backend Dependencies

> ⚠️ **Important:** Do NOT run `pip install -r requirements.txt` directly.
> The `docling` package pulls in PyTorch + CUDA (~1.1 GB) which may cause network timeouts.
> Use the split install steps below instead.

**Step 3a — Install core packages (fast, no GPU):**
```bash
pip install Flask>=3.0.0 flask-cors>=4.0.0 python-dotenv>=1.0.0 requests \
  youtube-transcript-api langdetect tiktoken langchain-text-splitters \
  langchain-core langchain-community langchain-google-genai google-genai \
  google-generativeai deep-translator numpy pinecone gunicorn>=21.2.0 \
  beautifulsoup4 lxml python-pptx Pillow defusedxml typing-extensions \
  PyPDF2 python-docx pytesseract scikit-learn scipy
```

**Step 3b — Install PyTorch (CPU-only, ~200 MB):**
```bash
pip install torch --index-url https://download.pytorch.org/whl/cpu
```

**Step 3c — Install sentence-transformers:**
```bash
pip install sentence-transformers --no-deps
pip install transformers huggingface-hub tokenizers
```

**Step 3d — (Optional) Install Docling for advanced document extraction:**
```bash
# Only if you have a stable, fast internet connection (downloads ~1.1 GB)
pip install docling
```
If docling is not installed, the app automatically falls back to PyPDF2 + python-docx.

### Step 4: Install Frontend Dependencies
```bash
cd frontend
npm install
cd ..
```

### Step 5: Install Tesseract (Optional, for OCR)
**Linux:**
```bash
sudo apt-get install tesseract-ocr
```

**macOS:**
```bash
brew install tesseract
```

**Windows:**
- Download from: https://github.com/UB-Mannheim/tesseract/wiki
- Add to PATH

---

## ⚙ Configuration

### Environment Variables

Create a `.env` file in the project root:

```bash
# Required API Keys
GOOGLE_API_KEY=your_google_gemini_api_key_here
PINECONE_API_KEY=your_pinecone_api_key_here

# Optional (for translation)
LT_URL=https://libretranslate.com
LT_API_KEY=your_libretranslate_key

# YouTube (not required with youtube-transcript-api)
YOUTUBE_API_KEY=optional_youtube_data_api_key
```

### Getting API Keys

**Google Gemini API:**
1. Visit: https://aistudio.google.com/app/apikey
2. Sign in with your Google account
3. Click **"Create API Key"**
4. Copy the key to `.env`

**Pinecone API:**
1. Visit: https://www.pinecone.io/
2. Sign up for free tier
3. Create a new index (or let the app auto-create)
4. Copy API key to `.env`

### Configuration Options

Edit `app/config.py` to customize:

```python
# Models
LLM_MODEL_NAME = "models/gemini-3.6-flash"  # Gemini model (updated — gemini-2.5-flash is deprecated)
EMBEDDING_MODEL_NAME = "all-MiniLM-L6-v2"  # Embedding model

# Chunking
CHUNK_SIZE = 800  # tokens per chunk
CHUNK_OVERLAP = 160  # 20% overlap
CHUNK_MIN = 600  # minimum chunk size
CHUNK_MAX = 1000  # maximum chunk size

# Retrieval
TOP_K = 8  # number of chunks to retrieve
USE_MMR = False  # Maximal Marginal Relevance

# Pinecone
PINECONE_INDEX = "teaching-content-index"
PINECONE_CLOUD = "aws"
PINECONE_REGION = "us-east-1"
PINECONE_METRIC = "cosine"
```

---

## 🚀 Usage

### Start the Backend Server

```bash
# Make sure virtual environment is active
source .venv/bin/activate  # Linux/macOS
# .venv\Scripts\activate   # Windows

# Run Flask
python3 -m flask --app app.server run --host=0.0.0.0 --port=5000
```

Backend runs on: `http://127.0.0.1:5000`

### Start the Frontend (React UI)

```bash
cd frontend
npm run dev
```

Frontend runs on: `http://localhost:8080` (or `http://localhost:5173`)

> 💡 Run the **backend and frontend in separate terminals** simultaneously.

### Health Check
```bash
curl http://localhost:5000/health
# Response: {"status": "healthy", "message": "Backend is running"}
```

### Quick Examples

#### 1. YouTube Video Processing
```python
import requests

response = requests.post('http://127.0.0.1:5000/api/youtube/pipeline', json={
    "video": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    "plan": "Explain the main concepts and key takeaways",
    "topics": ["Machine Learning Basics"],
    "level": "beginner",
    "style": "detailed"
})

result = response.json()
ppt_file = result['_ppt_path']
```

#### 2. Web Article Processing
```python
response = requests.post('http://127.0.0.1:5000/api/article/pipeline', json={
    "url": "https://example.com/article",
    "plan": "Summarize the main arguments and conclusions",
    "topics": ["Climate Change"],
    "level": "intermediate",
    "style": "concise"
})
```

#### 3. File Upload Processing
```bash
curl -X POST -F "file=@document.pdf" \
     -F "plan=Extract key information about the topic" \
     -F "topics=Data Science" \
     -F "level=advanced" \
     -F "style=exam-prep" \
     http://127.0.0.1:5000/api/file_upload/pipeline
```

---

## 🔌 API Endpoints

### Health Check
```http
GET /api/health
```
Returns system configuration and status.

### YouTube Pipeline
```http
POST /api/youtube/pipeline
Content-Type: application/json

{
  "video": "string (URL or video ID)",
  "plan": "string (topic description)",
  "topics": ["string"],
  "level": "beginner|intermediate|advanced",
  "style": "concise|detailed|exam-prep"
}
```

### Article Pipeline
```http
POST /api/article/pipeline
Content-Type: application/json

{
  "url": "string (article URL)",
  "plan": "string (topic description)",
  "topics": ["string"],
  "level": "beginner|intermediate|advanced",
  "style": "concise|detailed|exam-prep"
}
```

### File Upload Pipeline
```http
POST /api/file_upload/pipeline
Content-Type: multipart/form-data

file: binary (PDF, DOCX, image file)
plan: string
topics: string (comma-separated)
level: string
style: string
```

### Download PPT
```http
GET /api/download/ppt/<filename>
```

---

## 🔄 Pipeline Flow

### Phase 1: Content Extraction
1. **Source Detection**: Identify input type (YouTube/Article/File)
2. **Text Extraction**: 
   - YouTube: Transcript API
   - Article: LangChain WebBaseLoader
   - File: Docling/PyPDF2/python-docx/OCR
3. **Preprocessing**: Clean, normalize, detect language
4. **Translation**: Auto-translate non-English content

### Phase 2: Chunking & Embedding
1. **Semantic Chunking**: 
   - RecursiveCharacterTextSplitter
   - Token-aware (800 tokens/chunk, 160 overlap)
   - Hierarchical splitting (paragraphs → sentences → words)
2. **Embedding Generation**:
   - SentenceTransformers (all-MiniLM-L6-v2)
   - Batch processing (64 texts/batch)
   - 384-dimensional vectors
3. **Vector Storage**:
   - Upsert to Pinecone with namespace
   - Store chunk text in metadata

### Phase 3: Retrieval & Generation
1. **Query Generation**:
   - Gemini generates 8 diverse queries from plan
   - Mix of conceptual, procedural, and comparison questions
2. **Dense Retrieval**:
   - Embed each query (local, free)
   - Search Pinecone (5 chunks per query)
   - RRF fusion of all results
   - Select top-K based on style
3. **Content Generation**:
   - **Notes**: Structured sections with bullets, key points, glossary
   - **Summary**: Concise overview with main ideas
   - **MCQs**: Quality questions with explanations
4. **PPT Generation**:
   - Professional slide deck
   - Proper formatting and layout
   - Ready for classroom use

### Phase 4: Output
1. Save JSON results to `data/outputs/`
2. Generate PowerPoint presentation
3. Return downloadable PPT link
4. Cache for future reference

---

## 📁 Project Structure

```
Teaching-content-generator/
├── app/
│   ├── __init__.py
│   ├── api.py                    # Flask app factory & health endpoint
│   ├── config.py                 # Configuration & environment variables
│   ├── server.py                 # Flask server entry point
│   │
│   ├── controllers/              # Request handlers
│   │   ├── article_pipeline_controller.py
│   │   ├── combined_controller.py
│   │   ├── file_upload_controller.py
│   │   ├── topic_name_controller.py
│   │   └── yt_pipeline_controller.py
│   │
│   ├── main/                     # Pipeline orchestrators
│   │   ├── main_article.py       # Article processing pipeline
│   │   ├── main_combined.py      # Multi-source combined pipeline
│   │   ├── main_file_upload.py   # File upload pipeline
│   │   ├── main_topic_name.py    # Topic-based pipeline
│   │   └── main_youtube.py       # YouTube processing pipeline
│   │
│   ├── prompts/                  # LLM prompt templates
│   │   └── notes.py
│   │
│   ├── routes/                   # Flask route definitions
│   │   ├── article_pipeline_routes.py
│   │   ├── combined_routes.py
│   │   ├── download_helper.py
│   │   ├── file_upload_routes.py
│   │   ├── plan_routes.py
│   │   ├── topic_name_routes.py
│   │   └── yt_pipeline_routes.py
│   │
│   └── services/                 # Core business logic
│       ├── chunker.py            # Text chunking (LangChain + tiktoken)
│       ├── embeddings.py         # Embedding generation (SentenceTransformers)
│       ├── file_extractor.py     # Document extraction (Docling/PyPDF2/OCR)
│       ├── generate_plan.py      # Plan generation from topics
│       ├── generate_queries.py   # Query generation from plans (Gemini)
│       ├── generator.py          # Content generation (Gemini RAG)
│       ├── pinecone_index.py     # Vector database operations
│       ├── ppt_builder.py        # PowerPoint generation
│       ├── retriever.py          # RAG retrieval with RRF fusion
│       ├── translate.py          # Language translation
│       ├── web_article.py        # Web scraping (LangChain)
│       └── youtube.py            # YouTube transcript extraction
│
├── data/                         # Generated outputs & cache
│   ├── article_outputs/
│   ├── file_upload_outputs/
│   └── outputs/
│
├── frontend/                     # React + Vite + TypeScript frontend
│   ├── src/
│   │   ├── components/           # Layout, Navbar, UI components
│   │   ├── pages/                # Landing, SelectOption, generate pages
│   │   │   └── generate/         # YouTube, Article, Document, Combined, TopicOnly
│   │   ├── services/             # API service calls
│   │   └── index.css             # Global design system
│   ├── package.json
│   └── vite.config.ts
│
├── .env                          # Environment variables (create this — see Configuration)
├── .gitignore
├── README.md
├── requirements.txt              # Python dependencies (see Installation notes)
└── installed.txt                 # Verified installed package list
```

---

## 🎯 Use Cases

### For Teachers
- Convert lecture videos into structured notes
- Generate quiz questions from course materials
- Create professional presentations from articles
- Prepare study guides at different difficulty levels

### For Students
- Transform video lectures into study notes
- Create flashcards and MCQs for exam prep
- Summarize research papers and articles
- Build presentations for class projects

### For Content Creators
- Repurpose video content into written materials
- Generate course outlines from existing content
- Create supplementary materials automatically
- Scale content production efficiently

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

## 📄 License

This project is licensed under the MIT License.

---

## 🐛 Known Issues & Fixes

### `generate_plan.py` — Gemini API call fix
The original code used an invalid conversation structure (`role: "model"` as the first message).
This was fixed by moving the system prompt into `system_instruction` in `GenerativeModel`.

### Gemini model deprecation
`gemini-2.5-flash` is no longer available for new users.
Updated to `models/gemini-3.6-flash` in `app/config.py`.

### Docling installation timeout
`docling` pulls in PyTorch + CUDA (~1.1 GB) which can cause network timeouts during pip install.
Install it separately and optionally — the app works without it using PyPDF2 fallback.

---

## 🙏 Acknowledgments

- **Google Gemini (gemini-3.6-flash)** for powerful LLM capabilities
- **Pinecone** for efficient vector search
- **SentenceTransformers** for free local embeddings
- **LangChain** for excellent text processing tools
- **React + Vite + TailwindCSS** for the modern frontend UI
- **Docling** for advanced document extraction (optional)

**Made with ❤️ for educators and learners everywhere**


