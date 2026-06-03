from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
import os
import sys
import logging
from pathlib import Path

# Add parent directory to path to import backend modules
sys.path.insert(0, str(Path(__file__).parent.parent / 'Backend'))

app = Flask(__name__, 
            static_folder='.',
            static_url_path='/')

CORS(app)

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Session storage for conversation history
session_data = {
    'history': []
}

# Import backend tools
try:
    from tools import get_weather, search_web
    logger.info("Successfully imported backend tools")
except ImportError as e:
    logger.error(f"Could not import backend tools: {e}")
    get_weather = None
    search_web = None


class MockRunContext:
    """Mock context for function tools"""
    pass


@app.route('/')
def home():
    """Serve the main chat interface"""
    return app.send_static_file('index.html')


@app.route('/api/chat', methods=['POST'])
async def chat():
    """Handle chat messages"""
    try:
        data = request.json
        user_message = data.get('message', '').strip()
        history = data.get('history', [])

        if not user_message:
            return jsonify({'error': 'Empty message'}), 400

        logger.info(f"User message: {user_message}")

        # Process the message and determine if we need to use tools
        response = await process_message(user_message)

        return jsonify({
            'response': response,
            'status': 'success'
        })

    except Exception as e:
        logger.error(f"Error in chat endpoint: {e}")
        return jsonify({
            'error': str(e),
            'status': 'error'
        }), 500


async def process_message(user_message):
    """Process user message and determine if tools are needed"""
    
    # Check for weather queries
    if any(keyword in user_message.lower() for keyword in ['weather', 'temperature', 'forecast', 'climate']):
        # Extract city name from message
        words = user_message.lower().split()
        city = None
        
        keywords = ['weather', 'in', 'for', 'at']
        for i, word in enumerate(words):
            if word in keywords and i + 1 < len(words):
                city = words[i + 1]
                break
        
        if city and get_weather:
            try:
                ctx = MockRunContext()
                weather_result = await get_weather(ctx, city)
                return f"Will do, Sir! {weather_result}"
            except Exception as e:
                logger.error(f"Error getting weather: {e}")
                return "I apologize, but I couldn't retrieve the weather information at the moment."
    
    # Check for search queries
    if any(keyword in user_message.lower() for keyword in ['search', 'find', 'look up', 'tell me about']):
        query = user_message
        if search_web:
            try:
                ctx = MockRunContext()
                search_result = await search_web(ctx, query)
                return f"Of course, Sir! Here's what I found: {search_result}"
            except Exception as e:
                logger.error(f"Error searching web: {e}")
                return "I apologize, but I couldn't search the web at the moment."
    
    # Default response with Friday's personality
    responses = {
        'hi': "Greetings, Sir! At your service. Will do!",
        'hello': "Good day, Sir! How may I be of assistance?",
        'thanks': "You're most welcome, Sir. My pleasure!",
        'help': "Of course, Sir! I can assist with weather information, web searches, and more. What do you need?",
        'how are you': "Splendid, Sir! Functioning at optimal capacity. And you?",
        'joke': "I would tell you a joke, Sir, but I'm afraid my humor circuits are still being calibrated. Shall we proceed with something more practical?",
        'time': "I'm afraid I don't have access to the time, Sir. Might I suggest checking your device?",
        'default': "Check! I acknowledge your request, Sir. Is there anything else I can assist you with?"
    }
    
    user_input_lower = user_message.lower()
    
    for key, response in responses.items():
        if key in user_input_lower:
            return response
    
    return responses['default']


@app.route('/api/clear', methods=['POST'])
def clear_history():
    """Clear conversation history"""
    try:
        session_data['history'] = []
        return jsonify({'status': 'success', 'message': 'History cleared'}), 200
    except Exception as e:
        logger.error(f"Error clearing history: {e}")
        return jsonify({'error': str(e)}), 500


@app.route('/api/status', methods=['GET'])
def status():
    """Check if backend is running"""
    return jsonify({
        'status': 'online',
        'message': 'Friday Assistant is ready!',
        'tools_available': {
            'weather': get_weather is not None,
            'search': search_web is not None
        }
    }), 200


@app.errorhandler(404)
def not_found(error):
    """Handle 404 errors"""
    return jsonify({'error': 'Not found'}), 404


@app.errorhandler(500)
def server_error(error):
    """Handle 500 errors"""
    logger.error(f"Server error: {error}")
    return jsonify({'error': 'Internal server error'}), 500


if __name__ == '__main__':
    logger.info("Starting Friday Assistant Frontend Server")
    logger.info("Server running on http://localhost:8000")
    logger.info("Open your browser and navigate to http://localhost:8000")
    
    app.run(debug=True, host='localhost', port=8000, use_reloader=False)
