import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Loader2 } from 'lucide-react';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

const systemPrompt = `You are a helpful assistant for SRM University KTR Campus. You have detailed knowledge about:

1. Campus Navigation:
   - Building locations and directions
   - Shortest routes between locations
   - Nearby facilities and amenities

2. Academic Information:
   - Departments and programs
   - Course offerings
   - Faculty information
   - Class schedules

3. Campus Facilities:
   - Library resources and timings
   - Laboratory facilities
   - Sports facilities
   - Medical center
   - Food courts and cafeterias

4. Student Services:
   - Hostel accommodation
   - Transportation
   - Student support services
   - Campus activities

5. Events and Activities:
   - Current and upcoming events
   - Cultural festivals
   - Technical symposiums
   - Sports tournaments

Please provide accurate, concise information and always be helpful and friendly. If asked about directions, provide clear, step-by-step navigation instructions.`;

interface Message {
  text: string;
  isUser: boolean;
  timestamp: number;
}

const AIChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [model, setModel] = useState<any>(null);

  useEffect(() => {
    const initModel = async () => {
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const chat = model.startChat({
        history: [
          {
            role: "user",
            parts: "You are an AI assistant for SRM University. Please acknowledge.",
          },
          {
            role: "model",
            parts: "I am the SRM University campus assistant. I can help with campus information, directions, academic details, and student services.",
          },
        ],
        generationConfig: {
          maxOutputTokens: 500,
        },
      });
      setModel(chat);
    };
    initModel();
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading || !model) return;

    const userMessage: Message = {
      text: input.trim(),
      isUser: true,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const result = await model.sendMessage(input.trim());
      const response = await result.response;
      
      const botMessage: Message = {
        text: response.text() || "I'm sorry, I couldn't process that request.",
        isUser: false,
        timestamp: Date.now()
      };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Gemini AI Error:', error);
      const errorMessage: Message = {
        text: "I apologize, but I'm having trouble connecting right now. Please try again later.",
        isUser: false,
        timestamp: Date.now()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-all transform hover:scale-105 z-50"
        aria-label="Open chat assistant"
      >
        <MessageCircle className="h-6 w-6" />
      </button>

      {isOpen && (
        <div className="fixed bottom-20 right-4 w-96 bg-white rounded-lg shadow-xl z-50">
          <div className="flex justify-between items-center p-4 border-b bg-blue-600 text-white rounded-t-lg">
            <h3 className="text-lg font-semibold">SRM Campus Assistant</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-gray-200 transition-colors"
              aria-label="Close chat"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="h-96 overflow-y-auto p-4 space-y-4">
            {messages.length === 0 && (
              <div className="text-center text-gray-500 mt-4">
                <p>👋 Hi! I'm your SRM Campus Assistant.</p>
                <p className="mt-2">I can help you with:</p>
                <ul className="mt-2 space-y-1">
                  <li>• Campus navigation and directions</li>
                  <li>• Academic information</li>
                  <li>• Campus facilities</li>
                  <li>• Events and activities</li>
                  <li>• Student services</li>
                </ul>
                <p className="mt-4 text-sm">Try asking something like:</p>
                <div className="mt-2 space-y-2">
                  <button
                    onClick={() => setInput("How do I get to the Central Library?")}
                    className="text-sm text-blue-600 hover:text-blue-700"
                  >
                    "How do I get to the Central Library?"
                  </button>
                  <br />
                  <button
                    onClick={() => setInput("What facilities are available in the Tech Park?")}
                    className="text-sm text-blue-600 hover:text-blue-700"
                  >
                    "What facilities are available in the Tech Park?"
                  </button>
                </div>
              </div>
            )}
            
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[75%] p-3 rounded-lg ${
                    message.isUser
                      ? 'bg-blue-600 text-white rounded-br-none'
                      : 'bg-gray-100 text-gray-800 rounded-bl-none'
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 text-gray-800 p-3 rounded-lg rounded-bl-none">
                  <Loader2 className="h-5 w-5 animate-spin text-blue-600" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSubmit} className="border-t p-4">
            <div className="flex space-x-2">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about SRM Campus..."
                className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={isLoading}
              />
              <button
                type="submit"
                className={`bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors ${
                  isLoading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                disabled={isLoading}
              >
                Send
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default AIChatbot;