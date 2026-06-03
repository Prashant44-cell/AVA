# Friday AI Assistant - Frontend

A modern, responsive web-based chatbot interface for the Friday AI Assistant backend.

## Features

✨ **Features:**
- 💬 Real-time chat interface
- 🤖 AI-powered responses using Friday Assistant
- 🌤️ Weather information retrieval
- 🔍 Web search capabilities
- 📱 Fully responsive design (works on mobile & desktop)
- ✨ Beautiful gradient UI with animations
- 🎯 Message history tracking
- 🧹 Clear conversation history

## Project Structure

```
Frontend/
├── index.html          # Main chat interface
├── style.css           # Beautiful styling and animations
├── script.js           # Chat logic and event handling
├── app.py              # Flask API server
├── requirements.txt    # Python dependencies
└── README.md          # This file
```

## Installation

### Step 1: Install Dependencies

Make sure you have Python 3.8+ installed, then install the required packages:

```bash
cd Frontend
pip install -r requirements.txt
```

### Step 2: Run the Frontend Server

```bash
python app.py
```

You should see:
```
 * Serving Flask app 'app'
 * Running on http://localhost:8000
```

### Step 3: Open in Browser

Navigate to `http://localhost:8000` in your web browser.

## How to Use

1. **Type your message** in the input field at the bottom
2. **Press Enter** or click the send button (➤)
3. **Friday will respond** with helpful information

### Example Commands:

- **Weather:** "What's the weather in London?"
- **Search:** "Search for Python tutorials"
- **General:** "Hello Friday!", "Help me with something"

## API Endpoints

### Chat
- **POST** `/api/chat`
  - Body: `{ "message": "your message", "history": [] }`
  - Response: `{ "response": "assistant response", "status": "success" }`

### Status
- **GET** `/api/status`
  - Response: `{ "status": "online", "tools_available": {...} }`

### Clear History
- **POST** `/api/clear`
  - Response: `{ "status": "success", "message": "History cleared" }`

## Connecting to the Backend

The frontend Flask app (`app.py`) imports the tools from the Backend directory:
- `get_weather()` - Retrieves weather information
- `search_web()` - Performs web searches

Make sure the Backend is properly configured with environment variables (`.env` file) for full functionality.

## Customization

### Change the Server Port
Edit the last line in `app.py`:
```python
app.run(debug=True, host='localhost', port=8000)  # Change 8000 to your desired port
```

### Update Frontend URL
If running on a different port, update `script.js`:
```javascript
const response = await fetch('http://localhost:YOUR_PORT/api/chat', {
```

### Modify Assistant Personality
Edit the responses in `app.py` in the `process_message()` function to change Friday's responses.

## Troubleshooting

### "Cannot connect to server"
- Make sure the Flask app is running: `python app.py`
- Check that you're accessing `http://localhost:8000`

### "Tools not available"
- Verify that the Backend folder is in the correct location
- Check that `tools.py` has the required functions
- Install backend dependencies: `pip install -r ../Backend/requirements.txt`

### CORS Errors
- The flask-cors package should handle this automatically
- If issues persist, check that the frontend URL matches the Flask configuration

## Technologies Used

- **Frontend:**
  - HTML5
  - CSS3 (with animations and gradients)
  - Vanilla JavaScript (no dependencies)

- **Backend:**
  - Flask (Python web framework)
  - Flask-CORS (for cross-origin requests)
  - LiveKit Agents (connected via Backend)

## Future Enhancements

- [ ] Voice input/output integration with LiveKit
- [ ] Message persistence (save to database)
- [ ] User authentication
- [ ] Dark mode toggle
- [ ] Export chat history
- [ ] Multiple conversation tabs
- [ ] Rich message formatting (links, images, code blocks)

## License

This project is part of the AVA Assistant suite.

---

**Need Help?** Check the main README in the AVA directory for more information.
