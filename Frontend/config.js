// Friday AI Assistant - Frontend Configuration
// Modify these settings to customize the chat experience

const CONFIG = {
    // Server Settings
    API_BASE_URL: 'http://localhost:8000',
    API_TIMEOUT: 30000,  // 30 seconds
    
    // Chat Settings
    ASSISTANT_NAME: 'Friday',
    ASSISTANT_AVATAR: '🤖',
    USER_AVATAR: '👤',
    
    // Message Settings
    MAX_MESSAGE_LENGTH: 8000,
    MESSAGE_DELAY: 0,  // Delay in ms between messages (0 = no delay)
    
    // UI Settings
    THEME: {
        PRIMARY_COLOR: '#667eea',
        SECONDARY_COLOR: '#764ba2',
        ERROR_COLOR: '#f8d7da',
        SUCCESS_COLOR: '#d4edda',
    },
    
    // Features
    FEATURES: {
        VOICE_INPUT: false,  // Voice input support
        IMAGE_UPLOAD: false,  // Image upload support
        FILE_UPLOAD: false,   // File upload support
        CLEAR_HISTORY: true,  // Show clear history button
    },
    
    // Hints and Help
    WELCOME_MESSAGE: "Hi, I'm Friday, your Technical Voice Assistant.",
    PLACEHOLDER_TEXT: "Ask me anything... (weather, search, etc.)",
    INPUT_HINTS: "💡 Try: \"What's the weather in London?\" or \"Search for Python tutorials\"",
    
    // Error Messages
    ERROR_MESSAGES: {
        NETWORK_ERROR: "Network error. Make sure the backend server is running.",
        TIMEOUT_ERROR: "Request timed out. Please try again.",
        SERVER_ERROR: "Server error occurred. Please try again later.",
        EMPTY_MESSAGE: "Please enter a message before sending.",
    },
    
    // API Endpoints
    ENDPOINTS: {
        CHAT: '/api/chat',
        STATUS: '/api/status',
        CLEAR: '/api/clear',
    },
    
    // Conversation Settings
    MAX_HISTORY_LENGTH: 100,  // Maximum messages to keep in memory
    SAVE_LOCAL_STORAGE: true,  // Save conversation to browser storage
    LOCAL_STORAGE_KEY: 'friday_chat_history',
};

// Export for use in script.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG;
}
