
"use client"
import React, { useState } from 'react';
import { ClipboardEdit, Send, Bot } from 'lucide-react';
import axios from 'axios';
import Router from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

const ConversationChatbot = () => {
  const router = useRouter();
  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const {data, status}  = useSession()

  const handleInputChange = (event) => {
    setInputMessage(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const userMessage = { role: 'user', content: inputMessage };
      const newMessages = [...messages, userMessage];
      setMessages(newMessages);

      // Get the user's email from the session data
      const userEmail = data?.user?.email;

      const response = await axios.post('/api/chat', { 
        messages: newMessages,
        userEmail: userEmail });

      setTimeout(() => {
        setMessages((current) => [...current, response.data]);
      }, 300);

      setInputMessage(''); // Clear the input field
      // form.reset();
      setInputMessage(''); // Clear the input field
    } catch (error) {
      console.error('Chatbot error:', error);
    } finally {
      router.refresh();
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md max-w-xl w-full">
        <div className="flex items-center justify-center mb-4">
          <img
            src="/navalface.png" // Reference the image in the public folder
            alt="Naval Ravikant"
            className="h-8 w-8 mr-2 rounded-full w-[80px] h-[80px]" // You might need to adjust the size
          />
          <h2 className="text-xl font-semibold">Chat with Naval Ravikant</h2>
        </div>
        <div className="border-t pt-2 mb-4" style={{ maxHeight: '300px', overflowY: 'auto' }}>
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.role === 'user' ? 'justify-end' : 'justify-start'
              } mb-2`}
            >
              <div
                className={`p-2 rounded-lg ${
                  message.role === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-800'
                }`}
                style={{ alignSelf: message.role === 'user' ? 'flex-end' : 'flex-start' }}
              >
                {message.content}
              </div>
            </div>
          ))}
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <input
              type="text"
              value={inputMessage}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-indigo-500"
              placeholder="Type your message..."
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 text-white px-4 py-2 rounded-md shadow-md hover:opacity-75"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default ConversationChatbot;
