#!/bin/bash

# Setup script for RAG feature

echo "🚀 Setting up NotebookLLM RAG Feature..."
echo ""

# Check if .env exists
if [ ! -f ".env" ]; then
    echo "📝 Creating .env file..."
    cp .env.example .env
    echo "⚠️  Please edit .env and add your MISTRAL_API_KEY"
    echo ""
else
    echo "✅ .env file exists"
fi

# Check if Mistral API key is set
if grep -q "your_mistral_api_key" .env; then
    echo "⚠️  WARNING: Mistral API key not configured in .env"
    echo "   Get your key from: https://console.mistral.ai/"
    echo ""
fi

# Update nginx config
if [ ! -f "nginx/nginx.conf.backup" ]; then
    echo "📝 Backing up nginx config..."
    cp nginx/nginx.conf nginx/nginx.conf.backup
fi

echo "📝 Updating nginx config for RAG support..."
cp nginx/nginx.conf.rag nginx/nginx.conf

# Create backend directories
echo "📁 Creating backend directories..."
mkdir -p backend/uploads
mkdir -p backend/chroma_db

# Set permissions
echo "🔒 Setting permissions..."
chmod 755 backend/uploads
chmod 755 backend/chroma_db

echo ""
echo "✅ Setup complete!"
echo ""
echo "Next steps:"
echo "1. Edit .env and add your MISTRAL_API_KEY"
echo "2. Run: docker-compose up --build"
echo "3. Open http://localhost in your browser"
echo "4. Upload a PDF and start asking questions!"
echo ""
echo "For local development:"
echo "  Terminal 1: cd backend && pip install -r requirements.txt && uvicorn app.main:app --reload --port 5000"
echo "  Terminal 2: npm install && npm run dev"
echo ""
echo "📖 See RAG_SETUP.md for detailed documentation"

