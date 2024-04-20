"use client"
import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

import { useSession } from 'next-auth/react';




const ConversationChatbot = () => {
  const router = useRouter();
  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [chatbotName, setChatbotName] = useState('');
  const [selectedPdf, setSelectedPdf] = useState(null);

  const [emptyMessageWarning, setEmptyMessageWarning] = useState(false);
  const [emptyNameWarning, setEmptyNameWarning] = useState(false);

  const {data, status}  = useSession()

  const handleInputChange = (event) => {
    setInputMessage(event.target.value);
  };

  const handleImageChange = (event) => {
    setSelectedImage(event.target.files[0]);
  };

  const handleNameChange = (event) => {
    setChatbotName(event.target.value);
  };

  const handlePdfChange = (event) => {
    setSelectedPdf(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();


    // Check if the chatbot name is empty
    if (!chatbotName.trim()) {
      setEmptyNameWarning(true); // Show the warning
      return; // Exit the function
    }

    if (!inputMessage.trim()) {
      // Show the warning message inside the same block
      setInputMessage(''); // Clear the input field
      setEmptyMessageWarning(true); // Show the warning
      return; // Exit the function
    }

    // Hide the warning if the user entered a valid message
    setEmptyMessageWarning(false);
    setEmptyNameWarning(false);

    try {
      const userMessage = { role: 'user', content: inputMessage };
      const newMessages = [...messages, userMessage];
      setMessages(newMessages);


      // Get the user's email from the session data
      const userEmail = data?.user?.email;

      const response = await axios.post('/api/createchatbot', { messages: newMessages, chatbotName: chatbotName, userEmail: userEmail  });

      setTimeout(() => {
        setMessages((current) => [...current, response.data]);
      }, 300);

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
          <div className="w-[80px] h-[80px] mr-2 rounded-full bg-gray-300 flex items-center justify-center">
            {selectedImage ? (
              <img
                src={URL.createObjectURL(selectedImage)}
                alt="User Image"
                className="h-full w-full rounded-full"
              />
            ) : (
              <span className="text-gray-600 text-md  text-center">Upload Image</span>
            )}
          </div>
          <h2 className="text-xl font-semibold">Chat with {chatbotName || ' "select name" '}</h2>
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
          <div className="relative">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
              id="imageInput"
            />
            <label
              htmlFor="imageInput"
              className="cursor-pointer w-full bg-indigo-500 text-white px-4 py-2 rounded-md text-center hover:bg-indigo-600 transition duration-300"
            >
              Choose Image
            </label>
          </div>
          <div className="relative">
            <input
              type="text"
              value={chatbotName}
              onChange={handleNameChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-indigo-500"
              placeholder="Enter chatbot name..."
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 text-white px-4 py-2 rounded-md shadow-md hover:opacity-75"
          >
            Create Chatbot & Start Chat
          </button>
          <div className="relative">
            <input
                type="file"
                accept=".pdf"
                onChange={handlePdfChange}
                className="hidden"
                id="pdfInput"
            />
            <label
                htmlFor="pdfInput"
                className="cursor-pointer w-full bg-indigo-500 text-white px-4 py-2 rounded-md text-center hover:bg-indigo-600 transition duration-300"
            >
                Choose PDF
            </label>
            {selectedPdf && <span className="text-gray-600">{selectedPdf.name}</span>}
            </div>
        </form>
          {emptyMessageWarning && (
    <div className="text-red-500">You cannot send an empty message.</div>
  )}
    {emptyNameWarning && (
    <div className="text-red-500">Please enter a chatbot name.</div>
  )}
        
      </div>
    </div>
  );
};

export default ConversationChatbot;
