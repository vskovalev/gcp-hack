"use client"
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaBeer } from 'react-icons/fa';
import { Code,UserPlus, User, Home, ImageIcon, LayoutDashboard, MessageSquare, Music, Settings, VideoIcon, ClipboardEdit, Users  } from "lucide-react";
import { getApiLimitCount } from "../app/utils/api-limit"; // Update the path accordingly
import { MAX_FREE_COUNTS } from '../../constants'; // Update the path accordingly
import { useSession } from 'next-auth/react';
import {getCount} from "../app/getApiCountpage/page";
import { useState, useEffect } from 'react';

import { stat } from 'fs';

const routes = [
    {
      label: 'Home',
      icon: Home,
      href: '/dashboard',
      color: "text-sky-500"
    },
    {
      label: 'Conversation',
      icon: MessageSquare,
      href: '/conversation',
      color: "text-violet-500",
    },
    // {
    //   label: 'Image Generation',
    //   icon: ImageIcon,
    //   color: "text-pink-700",
    //   href: '/image',
    // },
    
    // {
    //   label: 'Text Summarization',
    //   icon: ClipboardEdit ,
    //   color: "text-green-700",
    //   href: '/summarization',
    // },
    // {
    //   label: 'Chat with Naval Ravikant',
    //   icon: User,
    //   color: "text-red-700",
    //   href: '/provelangfront',
    // },
    // {
    //   label: 'Create your Chatbot',
    //   icon: UserPlus,
    //   color: "text-purple-700",
    //   href: '/createchatbot',
    // },
    {
      label: 'Settings',
      icon: Settings,
      href: '/settings',
    },
    
    
  ];

// interface NavbarProps{
//   apiLimitCount: number;
// }

const Navbar =  () =>  {
  const {data, status}  = useSession()
  
  // Get the user's email from the session data
  const userEmail = data?.user?.email;

  return (
    <div className="bg-gray-900 text-white h-screen w-[300px] flex flex-col justify-between">
      <div>
        {/* Logo and nav container */}
        <div className="py-6 px-4 flex flex-col items-center">
          {/* Logo section */}
          <div className="text-center mb-6">
            <div className="rounded-full mt-4">
              <Image src="/logo_finance3.png" alt="Logo" className="rounded-3xl" width={180} height={50} />
            </div>
          </div>
          {/* Navigation links with flex-grow */}
          <nav className="space-y-4 flex-grow">
            {routes.map((route) => (
              <Link key={route.href} href={route.href} className='block p-3 hover:bg-gray-800'>
                <div className="flex items-center">
                  <route.icon className={`h-5 w-5 mr-3 ${route.color}`} />
                  {route.label}
                </div>
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* Upgrade button at the bottom */}
      <div className="py-6 px-4 flex justify-center">
        <Link href="/upgrade">
          <button className="bg-gradient-to-r from-red-500 to-yellow-500 text-white py-3 px-6 rounded-full w-[200px] hover:opacity-75">
            Upgrade
          </button>
        </Link>
      </div>
    </div>
  );

  // return (
  //   <div className="bg-gray-900 text-white h-screen w-[300px] flex flex-col justify-between">
  //     <div className="py-6 px-4 flex flex-col items-center">
  //       <div className="text-center mb-6">
  //         <div className="rounded-full mt-4">
  //           <Image src="/logo_ai.png" alt="Logo" className="rounded-3xl" width={180} height={50} />
  //         </div>
  //       </div>
  //       <nav className="space-y-4">
  //         {routes.map((route) => (
  //           <Link key={route.href} href={route.href} className='block p-3 hover:bg-gray-800'>
  //             <div className="flex items-center flex-1">
  //               <route.icon className={`h-5 w-5 mr-3 ${route.color}`} />
  //               {route.label}
  //             </div>
  //           </Link>
  //         ))}
  //       </nav>
  //     </div>
  //     <div className="py-6 px-4 flex justify-center mt-6">
  //     <Link href="/upgrade" className=''>
  //       <button className="bg-gradient-to-r from-red-500 to-yellow-500 text-white py-3 px-6 rounded-full w-[200px] hover:opacity-75 relative">
  //         Upgrade
  //         {/* {status === "authenticated" && (
  //           <span className="absolute -top-2 -right-2 bg-yellow-500 text-red-800 rounded-full w-6 h-6 flex items-center justify-center">
              
  //           </span>
  //         )} */}
  //       </button>
  //     </Link>

        
  //     </div>
  //     <div>
  //       {/* ... */}
  //     </div>
  //   </div>
  // );
  
}

export default Navbar;
