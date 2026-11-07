---
title: "Ethica: a RAG chatbot for my Professional Ethics notes"
description: "Building a retrieval-augmented generation assistant for NED CT-268 lecture slides using Groq, FastEmbed, and ChromaDB."
pubDate: 2026-10-18
type: "build"
tags: ["ai", "rag", "fastapi", "python", "ned-university"]
draft: false
status: "shipped"
stack: ["FastAPI", "Uvicorn", "ChromaDB", "Groq", "FastEmbed", "Python"]
repo: "https://github.com/Ali-HF/professional-ethics-rag"
---

Midterm exams were approaching for CT-268 (Professional Ethics) at NED University, and we had six weeks of dense lecture PDFs covering engineering ethics, intellectual property, and institutional responsibilities. I wanted a way to query specific lecture case studies without manually skimming through dozens of slide decks.

That became Ethica: a local retrieval-augmented generation (RAG) assistant.

<!-- ALI: add your take here on studying for Professional Ethics at NED -->

## Honesty First: Learning RAG from Scratch

I want to be completely honest here: my goal was to learn how RAG actually works under the hood from scratch. I did not invent this pipeline from zero; I followed an existing GitHub tutorial to understand the vectorization steps, and I leaned heavily on AI tooling to help wire the pieces together.

There is no shame in building to learn. Trying to implement embeddings, vector chunking, and context prompt injection yourself gives you an intuitive sense of what LLMs can actually retrieve versus what they hallucinate.

## The Technical Stack

Instead of heavy enterprise frameworks or expensive API bills, I kept the stack lightweight and free:
- **Embeddings**: FastEmbed running locally using `BAAI/bge-small-en-v1.5`. Running embeddings locally on the CPU avoided embedding API rate limits and kept vectorization fast.
- **Vector Storage**: ChromaDB as an embedded local vector database.
- **Inference**: Groq API for lightning-fast LLM response generation with low latency.
- **Server**: FastAPI served via Uvicorn.

```python
# Extracting chunks and building the local vector store with FastEmbed
from fastembed import TextEmbedding
import chromadb

client = chromadb.PersistentClient(path="./chroma_db")
collection = client.get_or_create_collection("ethics_notes")

model = TextEmbedding(model_name="BAAI/bge-small-en-v1.5")
# Lecture slide chunks embedded and indexed locally
```

## Making It Usable for Classmates

One major problem with student dev projects is that nobody can run them without an hour of virtualenv debugging, path issues, and missing packages.

To make Ethica genuinely usable for my NED classmates, I wrote one-click launcher scripts:
- `start.bat` for Windows
- `start.sh` for Linux/macOS

The script automatically checks for Python, installs requirements inside an isolated environment, loads the Chroma database from the lecture PDFs, and launches the browser interface directly.

<!-- ALI: add your take here on classmates' reactions when they first tested Ethica before midterms -->

The entire source code and dataset are published on GitHub at [Ali-HF/professional-ethics-rag](https://github.com/Ali-HF/professional-ethics-rag).
