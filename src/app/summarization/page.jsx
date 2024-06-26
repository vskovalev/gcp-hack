// "use client"
// import React, { useState, useEffect } from 'react';
// import { Image as ImageIcon, ClipboardEdit } from 'lucide-react';
// import { HfInference } from '@huggingface/inference';
// import { HfAgent, LLMFromHub, defaultTools } from '@huggingface/agents';
// import { ScaleLoader } from 'react-spinners';
// import axios from "axios";
// import { useSession } from 'next-auth/react';

// const TextSummarizer = () => {
//   const [inputText, setInputText] = useState('');
//   const [summary, setSummary] = useState('');
//   const [isLoading, setIsLoading] = useState(false);

//   const {data, status}  = useSession()

//   const handleInputChange = (event) => {
//     setInputText(event.target.value);
//   };

//   // Use useEffect to log the summary when it changes
  

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     try {
//       setSummary('');
//       setIsLoading(true);

//       // Get the user's email from the session data
//       const userEmail = data?.user?.email;

//       const response = await axios.post('/api/summerizer', { 
//         prompt: inputText,
//         userEmail: userEmail });
      
//       setSummary(response.data.summary_text);
      
//       setIsLoading(false);
      
      
//     } catch (error) {
//       console.error('Summarization error:', error);
//       setIsLoading(false);
//     } finally {
//       router.refresh();
//     };
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <div className="bg-white p-8 rounded shadow-md w-96">
//         <div className="flex items-center justify-center mb-4">
//           <ClipboardEdit className="h-8 w-8 mr-2" />
//           <h2 className="text-xl font-semibold">Text Summarizer</h2>
//         </div>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div className="relative">
//             <textarea
//               value={inputText}
//               onChange={handleInputChange}
//               className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-indigo-500"
//               placeholder="Enter text to summarize"
//               rows={6}
//             />
//           </div>
//           <button
//             type="submit"
//             className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 text-white px-4 py-2 rounded-md shadow-md hover:opacity-75"
//           >
//             Summarize Text
//           </button>
//         </form>
//         <div className="mt-4">
//           {isLoading ? (
//             <div className="border rounded-md bg-gray-300 h-40 flex items-center justify-center">
//               <div className="flex items-center">
//                 <ClipboardEdit className="h-6 w-6 mr-2 animate-spin" />
//                 <span>Summarizing...</span>
//               </div>
//             </div>
//           ) : null}
//           {summary && (
//             <div>
//               <h3 className="text-lg font-semibold mb-2">Summary: </h3>
//               <p>{summary}</p>
              
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TextSummarizer;

// pages/index.js

// pages/index.js
// pages/index.js



import Head from 'next/head';

export default function Home() {
  return (
    <div>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Kantumruy:wght@300;400;700&display=swap" />
      </Head>
      <div className="container mx-auto px-4">
        <div className="bg-gray-200 p-4 rounded-lg">
          <img className="mx-auto" src="/image-1@2x.png" alt="" />
          <div className="video-container py-4">
            <video width="930" height="530" controls>
              <source src="/welcome.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
          <img className="mx-auto" src="/screenshot-20240421-at-0430-1@2x.png" alt="" />
          <div className="text-center py-4">
            <h1 className="text-xl font-bold">Welcome to EasyFinance!</h1>
            <p>Welcome to EasyFinance by the Raise NameError better team is not defined,</p>
            {/* Add additional paragraphs here as needed */}
          </div>
          {/* Add further content here as needed */}
        </div>
      </div>
    </div>
  );
}
