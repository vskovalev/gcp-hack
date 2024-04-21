

// import React from 'react';
// import axios from 'axios';
// const PricingCard = ({ prices }) => {


//   // POST request 
// const handleSubscription = async (e, priceId) => {
//   e.preventDefault();
//   const { data } = await axios.post('/api/stripe_pay',
//   {
//     priceId: priceId
//   },
//   {
//     headers: {
//       "Content-Type": "application/json",
//     },
//   }
//   );
//   window.location.assign(data)
// }
//   return (
//     <div className="flex justify-center space-x-4 shadow-lg">
//       {prices.map((price) => (
//         <div key={price.id} className="bg-white p-8 rounded shadow-md w-80">
//           <h3 className="text-xl font-semibold mb-2">
//             <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-yellow-500">
//               {price.product.name}
//             </span>
//           </h3>
//           <p className="text-gray-600 mb-4">
//             Price: {price.unit_amount / 100} {price.currency.toUpperCase()}
//           </p>
//           <div className="bg-gradient-to-r from-red-500 to-yellow-500 text-white py-6 px-8 rounded-lg shadow-md">
//             <h4 className="text-lg font-semibold mb-2">Pro Plan</h4>
//             <p className="text-gray-200 mb-4">Unlock all premium features</p>
//             <div className="flex justify-between flex-col items-center">
//               <span className="text-xl font-semibold mr-2 mt-42 ">
//                 ${price.unit_amount / 100}/month
//               </span>
//               <button className="bg-white text-red-500 py-2 mt-4 px-4 rounded-full hover:bg-red-500 hover:text-white hover:opacity-75 transition-colors duration-300" onClick={(e) => handleSubscription(e, price.id)}>
//                 Upgrade Now
//               </button>
//             </div>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default PricingCard;



// import React from 'react';
// import axios from 'axios';

// const PricingCard = ({ prices }) => {
//   // POST request 
//   const handleSubscription = async (e, priceId) => {
//     e.preventDefault();
//     try {
//       const { data } = await axios.post('/api/stripe_pay', 
//         { priceId },
//         { headers: { "Content-Type": "application/json" } }
//       );
//       window.location.assign(data);
//     } catch (error) {
//       console.error('Error during subscription process:', error);
//       // Handle this error appropriately
//     }
//   };

//   // Find the first price that equals 10 EUR
//   const price = prices.find(p => p.unit_amount === 1000);

//   return price ? (
//     <div className="flex justify-center space-x-4 shadow-lg">
//       <div className="bg-white p-8 rounded shadow-md w-80">
//         <h3 className="text-xl font-semibold mb-2">
//           <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-yellow-500">
//             {price.product.name}
//           </span>
//         </h3>
//         <p className="text-gray-600 mb-4">
//           Price: {price.unit_amount / 100} {price.currency.toUpperCase()}
//         </p>
//         <div className="bg-gradient-to-r from-red-500 to-yellow-500 text-white py-6 px-8 rounded-lg shadow-md">
//           <h4 className="text-lg font-semibold mb-2">Pro Plan</h4>
//           <p className="text-gray-200 mb-4">Unlock all premium features</p>
//           <div className="flex flex-col items-center">
//             <span className="text-xl font-semibold mb-4">
//               ${price.unit_amount / 100}/month
//             </span>
//             <button 
//               className="bg-white text-red-500 py-2 px-4 rounded-full hover:bg-red-500 hover:text-white hover:opacity-75 transition-colors duration-300" 
//               onClick={(e) => handleSubscription(e, price.id)}
//             >
//               Upgrade Now
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   ) : null;
// };

// export default PricingCard;









import React from 'react';
import axios from 'axios';

const PricingCard = ({ prices }) => {
  // POST request 
  const handleSubscription = async (e, priceId) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('/api/stripe_pay', 
        { priceId },
        { headers: { "Content-Type": "application/json" } }
      );
      window.location.assign(data);
    } catch (error) {
      console.error('Error during subscription process:', error);
      // Handle this error appropriately
    }
  };

  // Find the first price that equals 10 EUR
  const price = prices.find(p => p.unit_amount === 1000);

  return price ? (
    <div className="flex justify-center space-x-4 shadow-lg">
      <div className="bg-white p-8 rounded shadow-md w-80 ">
        <h3 className="text-xl font-semibold mb-2">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-yellow-500">
            {/* {price.product.name} */}
            Single User Plan
          </span>
        </h3>
        <p className="text-gray-600 mb-4">
          {/* Price: {price.unit_amount / 100} {price.currency.toUpperCase()} */}
        </p>
        <div className="bg-gradient-to-r from-red-500 to-yellow-500 text-white py-6 px-8 rounded-lg shadow-md">
          <h4 className="text-lg font-semibold mb-2">Pro Plan</h4>
          <p className="text-gray-200 mb-4">Unlock all premium features</p>
          <div className="flex flex-col items-center">
            <span className="text-xl font-semibold mb-4">
              ${price.unit_amount / 100}/month
            </span>
            <button 
              className="bg-white text-red-500 py-2 px-4 rounded-full hover:bg-red-500 hover:text-white hover:opacity-75 transition-colors duration-300" 
              onClick={(e) => handleSubscription(e, price.id)}
            >
              Upgrade Now
            </button>
          </div>
        </div>
      </div>

      {/* Non-Stripe-linked Block */}
      <div className="bg-white p-8 rounded shadow-lg w-80">
        <h3 className="text-x1 font-semibold mb-2 mt-2">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-blue-500">
            Company Plan
          </span>
        </h3>
        {/* <p className="text-gray-600 mb-4">
          A flexible plan tailored to your needs.
        </p> */}
        <div className="bg-gradient-to-r from-green-500 to-blue-500 text-white py-6 px-8 rounded-lg shadow-md">
          <h4 className="text-lg font-semibold mb-2">Company Plan</h4>
          <p className="text-gray-200 mb-4">Unlock all premium features.</p>
          <div className="flex flex-col items-center">
            <span className="text-xl font-semibold mb-4">
              $8 per user/month
            </span>
              <button 
                className="bg-white text-red-500 py-2 px-4 rounded-full hover:bg-red-500 hover:text-white hover:opacity-75 transition-colors duration-300" 
                onClick={(e) => handleSubscription(e, price.id)}
              >
                Upgrade Now
              </button>
          </div>
        </div>
      </div>
    </div>
  ) : null;
};

export default PricingCard;
