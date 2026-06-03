# Installation & Setup Guide

## Complete Step-by-Step Installation

### Prerequisites
- Python 3.8 or higher
- pip (Python package installer)
- A web browser
- Git (optional, for cloning)

### Step 1: Navigate to Frontend Directory

```bash
cd AVA/Frontend
```

### Step 2: Create Virtual Environment (Recommended)

**Windows:**
```bash
python -m venv venv
venv\Scripts\activate
```

**Linux/Mac:**
```bash
python3 -m venv venv
source venv/bin/activate
```

### Step 3: Install Dependencies

```bash
pip install -r requirements.txt
```

This will install:
- Flask (web framework)
- Flask-CORS (cross-origin support)
- Requests (HTTP library)
- And other required packages

**Verify installation:**
```bash
pip list
```

You should see:
- Flask 3.0.0+
- Flask-CORS 4.0.0+
- requests 2.31.0+

### Step 4: Configure the Frontend (Optional)

Copy the example environment file:
```bash
copy .env.example .env
# or on Linux/Mac
cp .env.example .env
```

Edit `.env` if needed to change:
- Flask port (default: 8000)
- Debug mode (default: True)
- Backend URL (if using remote backend)

### Step 5: Start the Server

**Option A: Automated Script**

Windows:
```bash
run.bat
```

Linux/Mac:
```bash
bash run.sh
```

**Option B: Manual Start**

```bash
python app.py
```

You should see:
```
 * Serving Flask app 'app'
 * Debug mode: on
 * Running on http://localhost:8000
```

### Step 6: Access the Chat Interface

Open your web browser and go to:
```
http://localhost:8000
```

You should see the Friday chat interface!

### Step 7: Test the Chat

1. Type "Hello" and press Enter
2. Friday should respond
3. Try asking about weather or searching
4. Test the clear history button

---


## Troubleshooting Installation

### Python Not Found
```bash
# Windows - Add Python to PATH, then restart terminal
# Linux/Mac - Use python3 instead of python
python3 --version
```

### pip Not Found
```bash
# Upgrade pip
python -m pip install --upgrade pip
# or
python3 -m pip install --upgrade pip
```

### Port 8000 Already in Use
Change the port in `app.py`:
```python
if __name__ == '__main__':
    app.run(debug=True, host='localhost', port=8000)  # Change 8000 to 8000
```

Then update `script.js`:
```javascript
const response = await fetch('http://localhost:8000/api/chat', {
```

### CORS Errors
These should be handled automatically by Flask-CORS. If issues persist:

1. Verify Flask-CORS is installed:
```bash
pip install --upgrade flask-cors
```

2. Restart the server

### Tools Not Working
Ensure Backend directory is in the correct location:
```
AVA/
├── Backend/
│   ├── agent.py
│   ├── tools.py
│   └── ...
└── Frontend/
    └── app.py
```

### Dependencies Installation Fails

Try installing individually:
```bash
pip install flask
pip install flask-cors
pip install requests
pip install langchain_community
pip install duckduckgo-search
pip install python-dotenv
```

---

## Quick Command Reference

| Command | Purpose |
|---------|---------|
| `python app.py` | Start the server |
| `pip install -r requirements.txt` | Install all dependencies |
| `pip list` | Show installed packages |
| `pip install --upgrade flask` | Upgrade a package |
| `ctrl+c` | Stop the server |

---

## Uninstalling / Cleanup

To remove the frontend:

```bash
# Deactivate virtual environment (if using venv)
deactivate

# Delete virtual environment
rmdir venv  # Windows
rm -rf venv  # Linux/Mac
```

---

## Next Steps After Installation

1. ✅ Start the server: `python app.py`
2. ✅ Open browser: `http://localhost:8000`
3. ✅ Test chat functionality
4. 📝 Customize Friday's responses in `app.py`
5. 🎨 Modify UI in `style.css`
6. ⚙️ Adjust settings in `config.js`

---

## Support & Resources

- **Flask Documentation:** https://flask.palletsprojects.com/
- **Python Docs:** https://docs.python.org/3/
- **HTTP Requests:** https://requests.readthedocs.io/

---

**Installation Complete! 🎉**

Your Friday AI Assistant chatbot is ready to use!
