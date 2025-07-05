import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import { ChatMessageType } from '../../types';

const ChatbotWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<ChatMessageType[]>([
    {
      id: '1',
      text: 'Halo! Saya adalah asisten kesehatan tradisional dari SehatTradisi. Ada yang bisa saya bantu?',
      sender: 'bot',
      timestamp: Date.now(),
    },
  ]);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleSendMessage = () => {
    if (message.trim() === '') return;

    const newUserMessage: ChatMessageType = {
      id: Date.now().toString(),
      text: message,
      sender: 'user',
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, newUserMessage]);
    setMessage('');

    // Simulate bot response
    setTimeout(() => {
      const botResponses = [
        'Tentu, saya bisa membantu Anda menemukan layanan yang sesuai dengan kebutuhan Anda.',
        'Kami memiliki berbagai layanan pijat tradisional yang bisa dipesan langsung ke rumah Anda.',
        'Untuk jamu herbal, kami menyediakan berbagai pilihan seperti kunyit asam dan beras kencur.',
        'Terapis kami berpengalaman dan tersertifikasi untuk memberikan pelayanan terbaik.',
        'Apakah Anda ingin saya rekomendasikan layanan berdasarkan keluhan yang Anda alami?',
      ];
      
      const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
      
      const newBotMessage: ChatMessageType = {
        id: Date.now().toString(),
        text: randomResponse,
        sender: 'bot',
        timestamp: Date.now(),
      };

      setMessages((prev) => [...prev, newBotMessage]);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {isOpen ? (
        <div className="bg-white rounded-lg shadow-xl w-80 sm:w-96 flex flex-col overflow-hidden transition-all duration-300 animate-[fadeIn_0.3s_ease-in-out]">
          <div className="bg-primary-700 text-white p-4 flex justify-between items-center">
            <h3 className="font-semibold">Konsultasi Kesehatan</h3>
            <button
              onClick={toggleChat}
              className="text-white hover:text-gray-200 transition-colors"
            >
              <X size={20} />
            </button>
          </div>
          
          <div className="flex-grow p-4 h-80 overflow-y-auto bg-gray-50">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`mb-3 ${
                  msg.sender === 'user' ? 'flex justify-end' : 'flex justify-start'
                }`}
              >
                <div
                  className={`rounded-lg p-3 max-w-[80%] ${
                    msg.sender === 'user'
                      ? 'bg-primary-700 text-white'
                      : 'bg-white text-gray-800 shadow-sm border border-gray-200'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          
          <div className="p-3 border-t flex items-center gap-2">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ketik pesan Anda..."
              className="flex-grow px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
            <button
              onClick={handleSendMessage}
              className="h-10 w-10 rounded-full bg-primary-700 text-white flex items-center justify-center hover:bg-primary-800 transition-colors"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={toggleChat}
          className="h-14 w-14 rounded-full bg-primary-700 text-white flex items-center justify-center shadow-lg hover:bg-primary-800 transition-colors"
        >
          <MessageCircle size={24} />
        </button>
      )}
    </div>
  );
};

export default ChatbotWidget;