"use client"
import React, { useState, useEffect } from 'react';
import { Image as ImageIcon, ClipboardEdit, Volume2 } from 'lucide-react';
import axios from "axios";

const TextToSpeach = () => {
  const [inputText, setInputText] = useState('');
  const [audio, setAudio] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };


  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setAudio('');
      setIsLoading(true);

      const response = await axios.post('/api/music', { prompt: inputText });

      setAudio(response.data);
      console.log("summary object tts:"+audio)

      setIsLoading(false);

    } catch (error) {
      console.error('Summarization error:', error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    console.log('audio in use effect:', audio);
    console.log('audio in use effect INSIDE:', audio[0]);
  }, [audio]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <div className="flex items-center justify-center mb-4">
          <Volume2 className="h-8 w-8 mr-2" />
          <h2 className="text-xl font-semibold">Text to Speach</h2>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <textarea
              value={inputText}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-indigo-500"
              placeholder="Enter the Text to convert into Seach"
              rows={6}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 text-white px-4 py-2 rounded-md shadow-md hover:opacity-75"
          >
            Text to Speach
          </button>
        </form>
        <div className="mt-4">
          {isLoading ? (
            <div className="border rounded-md bg-gray-300 h-40 flex items-center justify-center">
              <div className="flex items-center">
                <ClipboardEdit className="h-6 w-6 mr-2 animate-spin" />
                <span>Loading...</span>
              </div>
            </div>
          ) : null}
          {/* {audio && (
            <div>
              <h3 className="text-lg font-semibold mb-2">Summary: </h3>
              <p>{audio}</p>
              <button
                className="mt-2 bg-blue-500 text-white px-3 py-2 rounded-md shadow-md hover:bg-blue-700"
                onClick={handleTextToSpeech}
              >
                <Volume2 className="h-4 w-4 mr-2" />
                Listen to Summary
              </button>
            </div>
          )} */}
        </div>
      </div>
    </div>
  );
};

export default TextToSpeach;