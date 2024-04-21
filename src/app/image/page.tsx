// "use client"
// import React, { useState } from 'react';
// import { Image as ImageIcon, Headphones, Loader } from 'lucide-react';
// import axios from "axios";
// import { ScaleLoader } from 'react-spinners';
// import { useSession } from 'next-auth/react';
// import { useRouter } from 'next/navigation';

// const TextToImage = () => {
//   const [inputText, setInputText] = useState('');
//   const [image, setImage] = useState('');
//   const [isLoading, setIsLoading] = useState(false);

//   const {data, status}  = useSession()

//   const handleInputChange = (event) => {
//     setInputText(event.target.value);
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     console.log('Submitted text:', inputText);
  
//     try {
//       setImage(undefined)
//       setIsLoading(true);

//       // Get the user's email from the session data
//       const userEmail = data?.user?.email;

//       const response = await axios.post('/api/image', { prompt: inputText, userEmail: userEmail  });
//       console.log('API response:', response.data);
  
//       setImage(response.data[0]); 
      
  
//       // Clear the input after submission
//       //setInputText('');
//     } catch (error) {
//       console.error('API error:', error);
//       setIsLoading(false);
//     }finally {
//       router.refresh();
//     };
//   };

  
//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <div className="bg-white p-8 rounded shadow-md w-96">
//         <div className="flex items-center justify-center mb-4">
//           <ImageIcon className="h-8 w-8 mr-2" />
//           <h2 className="text-xl font-semibold">Text to Image Converter</h2>
//         </div>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div className="relative">
//             <input
//               type="text"
//               value={inputText}
//               onChange={handleInputChange}
//               className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-indigo-500"
//               placeholder="Enter a description for the image"
//             />
//           </div>
//           <button
//             type="submit"
//             className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 text-white px-4 py-2 rounded-md shadow-md hover:opacity-75"
//           >
//             Generate Image
//           </button>
//         </form>
//         <div className="mt-4">
//           {isLoading ? (
//             <div className="border rounded-md bg-gray-300 h-40 flex items-center justify-center">
//               <div className="flex items-center">
//                 <ImageIcon className="h-6 w-6 mr-2 animate-spin" />
//                 <span>Loading...</span>
//               </div>
//             </div>
//           ) :  null}
//           {image ? (
//             <div>
//               <h3 className="text-lg font-semibold mb-2">Generated Image: </h3>
              
//               <img

//                 src={image}
//                 alt="Generated"
//                 className="border rounded-md"
//                 onLoad={() => {setIsLoading(false); 
//                   console.log('Image source:', typeof image)}} // Set isLoading to false when the image loads
//               />
//             </div>) : ""
//           }
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TextToImage;

// pages/index.js
// pages/index.js
// pages/index.js
// pages/QuizBlocks.js
// pages/QuizTools.js
// pages/QuizTools.js

import Head from 'next/head';

export default function QuizTools() {
  return (
    <>
      <Head>
        <title>Quiz Tools</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
        <h2 className="text-2xl font-bold text-center mb-2">Don't forget the tools!</h2>
        <p className="mb-8">Your balance is 100 credits</p>
        <div className="flex flex-row justify-center items-center space-x-4">
          {/* Insurance Block */}
          <div className="flex flex-col items-center justify-center bg-gradient-to-r from-red-500 to-yellow-500 text-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Insurance</h3>
            <p className="mb-4">Retake the test without penalty</p>
            <p className="font-bold">25 credits</p>
          </div>

          {/* Leverage Block */}
          <div className="flex flex-col items-center justify-center bg-gradient-to-r from-red-500 to-yellow-500 text-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Leverage</h3>
            <p className="mb-4">Multiplying your test scores</p>
            <p className="font-bold">25 credits</p>
          </div>

          {/* Risk Reduction Block */}
          <div className="flex flex-col items-center justify-center bg-gradient-to-r from-red-500 to-yellow-500 text-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Risk Reduction</h3>
            <p className="mb-4">Remove one wrong answer in each task</p>
            <p className="font-bold">50 credits</p>
          </div>
        </div>
      </div>
    </>
  );
}
