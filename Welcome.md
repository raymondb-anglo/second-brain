# Second-Brain

A smart note-taking and knowledge management system that combines Obsidian with AI-powered enhancements via OpenRouter API.

## 🚀 Features

- **AI-Powered Notes**: Enhance your notes with AI-generated insights using OpenRouter API
- **Obsidian Integration**: Directly writes to Obsidian vault as Markdown files
- **Knowledge Base**: Organize notes with tags, frontmatter, and structured metadata
- **Service Architecture**: RESTful API for note management and AI processing
- **Cross-Platform**: Works on Windows, macOS, and Linux

## 📁 Project Structure

/Second-Brain/
├── src/ # Source code
│ ├── api/ # API routes and server setup
│ ├── db/ # Database schema and connections
│ ├── services/ # Business logic (noteService, openRouter)
│ └── types/ # TypeScript type definitions
├── service-code/ # Node.js service code
├── openapi/ # API documentation
├── .gitattributes # Git line ending configuration
├── .env # Environment variables (not committed)
└── README.md # This file

## 🛠️ Setup Instructions

### Prerequisites

- Node.js (v16+)
- PostgreSQL database
- OpenRouter API key
- Obsidian app (optional, for manual note browsing)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/raymondb-anglo/second-brain.git
cd second-brain