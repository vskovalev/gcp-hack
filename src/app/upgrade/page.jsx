// "use client"
// import React from 'react';
// import axios from "axios";
// import { useState, useEffect } from "react";
// import PricingCard from '../../components/PricingCard';

// import { getCount } from '../getApiCountpage/page';



// const Upgrade = () => {

//     const [prices, setPrices] = useState([]);
//    // const [count, setCount] = useState(0);



    

//     useEffect(() => {
//     fetchPrices()
//     }, [])

    

//     const fetchPrices = async () => {
//         const {data} = await axios.get('/api/getproducts')
//         setPrices(data)
//         console.log("PRICING: "+JSON.stringify(data))
//   } 

//   return (
//     <div className="flex items-center justify-center h-screen bg-gray-100">
//       <div className='flex flex-col justify-center items-center p-10 py-14 bg-white p-0 rounded shadow-md'>
//         <h2 className="text-2xl font-semibold mb-4">
//           <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-yellow-500">
//             Upgrade to Pro Version 
//           </span>
          
//         </h2>
//         <div className="">
//           <PricingCard prices={prices} />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Upgrade;





"use client"
import React from 'react';
import axios from "axios";
import { useState, useEffect } from "react";
import PricingCard from '../../components/PricingCard';
import { useSession } from 'next-auth/react';
// import { getCount } from '../getApiCountpage/page';



const Upgrade = () => {

    const [prices, setPrices] = useState([]);
    const {data, status}  = useSession();
    const [count, setCount] = useState(0);

    // Get the user's email from the session data
    const userEmail = data?.user?.email;
   

    useEffect(() => {
    fetchPrices();
    fetchApiCounts();
    }, [])

    

    const fetchPrices = async () => {
        const {data} = await axios.get('/api/getproducts')
        setPrices(data)
        console.log("PRICING: "+JSON.stringify(data))
  } 
  const fetchApiCounts = async () => {
    try {
      const response = await axios.post('/api/getapicount', {
        userEmail: userEmail,
      });
  
      const apiCount = response.data; // Assuming the API response is a number
  
      setCount(apiCount);
    } catch (error) {
      console.error('Error fetching API count:', error);
    }
  };

  
  const apiCountPercentage = (count / 5) * 100;
  
  // return (
  //   <div className="flex items-center justify-center h-screen bg-gray-100">
  //     <div className="flex flex-col justify-center items-center p-10 py-14 bg-white rounded shadow-md">
  //       <h2 className="text-2xl font-semibold mb-4">
  //         <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-yellow-500">
  //           Upgrade to Pro Version
  //         </span>
  //       </h2>
  //       <div>
  //         <PricingCard prices={prices} />
  //       </div>
        
  //       <p className="bg-gradient-to-r from-red-500 to-yellow-500 text-white py-3 px-6 rounded-full w-[200px] hover:opacity-75 relative mt-4 text-center">
  //         {count}/5 Free Generations
  //       </p>
        
  //       <div className="relative w-[200px] h-4 mt-2 bg-gray-300 rounded-full">
  //         <div
  //           className="absolute h-full bg-gradient-to-r from-red-500 to-yellow-500 rounded-full"
  //           style={{ width: `${apiCountPercentage}%` }}
  //         ></div>
  //       </div>
  //     </div>
  //   </div>
  // );
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="flex flex-col justify-center items-center p-10 py-14 bg-white rounded shadow-md">
        <h2 className="text-2xl font-semibold mb-4">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-yellow-500">
            Upgrade to Pro Version
          </span>
        </h2>
        <div>
          <PricingCard prices={prices} />
        </div>
        
        <p className="bg-gradient-to-r from-red-500 to-yellow-500 text-white py-3 px-6 rounded-full w-[200px] hover:opacity-75 relative mt-4 text-center">
          <span>{count}/5</span> <span className="ml-2">Free Generations</span>
        </p>
        
        <div className="relative w-[200px] h-4 mt-2 bg-gray-300 rounded-full">
          <div
            className="absolute h-full bg-gradient-to-r from-red-500 to-yellow-500 rounded-full"
            style={{ width: `${apiCountPercentage}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};


export default Upgrade;





