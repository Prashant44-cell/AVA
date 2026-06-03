#!/bin/bash

# Friday AI Assistant - Frontend Startup Script for Linux/Mac

echo "============================================="
echo "  Friday AI Assistant - Frontend Server"
echo "============================================="
echo ""

# Check if Python is installed
if ! command -v python3 &> /dev/null; then
    echo "[ERROR] Python 3 is not installed"
    echo "Please install Python 3.8+ from https://www.python.org"
    exit 1
fi

echo "[INFO] Checking for required packages..."

# Check if Flask is installed
python3 -c "import flask" 2>/dev/null
if [ $? -ne 0 ]; then
    echo "[INFO] Installing dependencies..."
    pip3 install -r requirements.txt
    if [ $? -ne 0 ]; then
        echo "[ERROR] Failed to install dependencies"
        exit 1
    fi
fi

echo ""
echo "[SUCCESS] All dependencies are installed!"
echo ""
echo "Starting Friday Assistant Frontend..."
echo ""
echo "========================================="
echo "Server will start on: http://localhost:8000"
echo "Open your browser and navigate to the URL above"
echo "Press Ctrl+C to stop the server"
echo "========================================="
echo ""

python3 app.py
