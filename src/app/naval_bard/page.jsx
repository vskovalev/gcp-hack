"use client"
import React from "react";
import { useState } from "react";
import { Chat } from "langchain";

const ChatPage = () => {
  const [message, setMessage] = useState("");
  const [responses, setResponses] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const response = await client.createChatCompletion({
      prompt: message,
      temperature: 0,
    });
    setResponses([...responses, response.data.choices[0].text]);
    setMessage("");
  };

  return (
    <div>
      <h1>Chat with Naval Ravikant</h1>
      <input
        placeholder="Enter your message"
        type="text"
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={handleSubmit}>Send</button>
      <ul>
        {responses.map((response, index) => (
          <li key={index}>{response}</li>
        ))}
      </ul>
    </div>
  );
};

export default ChatPage;