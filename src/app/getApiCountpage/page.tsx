"use client"
import { useSession } from 'next-auth/react';
import axios from "axios";



export const getCount = async () => {
    
    const {data, status}  = useSession()

    // Get the user's email from the session data
    const userEmail = data?.user?.email;

    

    try {
        const response = await axios.post('/api/getapicount', { userEmail: userEmail  });

        console.log("the api count is: "+response)
        return response;
     
      
      
    } catch (error) {
      console.error('error', error);
      
    } 
};
  
