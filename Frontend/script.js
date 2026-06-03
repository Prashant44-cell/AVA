class ChatBot {
    constructor() {
        this.chatMessages = document.getElementById('chatMessages');
        this.messageInput = document.getElementById('messageInput');
        this.sendBtn = document.getElementById('sendBtn');
        this.clearBtn = document.getElementById('clearBtn');
        this.isLoading = false;
        this.conversationHistory = [];
        
        this.initEventListeners();
        this.addWelcomeMessage();
    }

    initEventListeners() {
        this.sendBtn.addEventListener('click', () => this.sendMessage());
        this.messageInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.sendMessage();
            }
        });
        this.clearBtn.addEventListener('click', () => this.clearChat());
    }

    addWelcomeMessage() {
        // Welcome message is already in HTML
        this.conversationHistory = [];
    }

    async sendMessage() {
        const message = this.messageInput.value.trim();
        
        if (!message || this.isLoading) return;

        // Add user message to chat
        this.addMessage(message, 'user');
        this.messageInput.value = '';
        this.messageInput.focus();

        // Add to conversation history
        this.conversationHistory.push({ role: 'user', content: message });

        // Show loading animation
        this.isLoading = true;
        this.sendBtn.disabled = true;
        const loadingId = this.addLoadingMessage();

        try {
            // Send message to backend
            const response = await fetch('http://localhost:8000/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message: message,
                    history: this.conversationHistory
                })
            });

            // Remove loading message
            this.removeMessage(loadingId);

            if (!response.ok) {
                throw new Error('Failed to get response from server');
            }

            const data = await response.json();
            const assistantMessage = data.response;

            // Add assistant response to chat
            this.addMessage(assistantMessage, 'assistant');

            // Add to conversation history
            this.conversationHistory.push({ role: 'assistant', content: assistantMessage });

        } catch (error) {
            console.error('Error:', error);
            this.removeMessage(loadingId);
            this.addMessage(
                `Error: ${error.message}. Make sure the backend server is running on http://localhost:8000`,
                'assistant',
                'error'
            );
        } finally {
            this.isLoading = false;
            this.sendBtn.disabled = false;
        }
    }

    addMessage(content, sender, type = 'normal') {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message ${type === 'error' ? 'error-message' : ''}`;
        messageDiv.id = `msg-${Date.now()}`;

        const avatar = sender === 'user' ? '👤' : '🤖';
        
        const messageContent = document.createElement('div');
        messageContent.className = 'message-content';
        
        const messageParagraph = document.createElement('p');
        messageParagraph.textContent = content;
        
        messageContent.appendChild(messageParagraph);

        const avatarDiv = document.createElement('div');
        avatarDiv.className = 'message-avatar';
        avatarDiv.textContent = avatar;

        messageDiv.appendChild(avatarDiv);
        messageDiv.appendChild(messageContent);

        this.chatMessages.appendChild(messageDiv);
        this.scrollToBottom();

        return messageDiv.id;
    }

    addLoadingMessage() {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message assistant-message loading-message';
        messageDiv.id = `loading-${Date.now()}`;

        const avatar = document.createElement('div');
        avatar.className = 'message-avatar';
        avatar.textContent = '🤖';

        const messageContent = document.createElement('div');
        messageContent.className = 'message-content';

        const messageParagraph = document.createElement('p');
        messageParagraph.innerHTML = '<span class="dot"></span><span class="dot"></span><span class="dot"></span>';

        messageContent.appendChild(messageParagraph);

        messageDiv.appendChild(avatar);
        messageDiv.appendChild(messageContent);

        this.chatMessages.appendChild(messageDiv);
        this.scrollToBottom();

        return messageDiv.id;
    }

    removeMessage(messageId) {
        const messageElement = document.getElementById(messageId);
        if (messageElement) {
            messageElement.remove();
        }
    }

    scrollToBottom() {
        this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
    }

    clearChat() {
        if (confirm('Are you sure you want to clear the chat history?')) {
            this.chatMessages.innerHTML = '';
            this.conversationHistory = [];
            this.addWelcomeMessage();
            
            // Notify backend to clear session
            fetch('http://localhost:8000/api/clear', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                }
            }).catch(err => console.log('Note: Could not clear backend session'));
        }
    }
}

// Initialize chat when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new ChatBot();
});
