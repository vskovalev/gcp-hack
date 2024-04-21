"use client"
import React from 'react';
import { Code, User,  UserPlus, Star, ImageIcon, Wrench, LayoutDashboard, MessageSquare, Music, Settings, VideoIcon,  ArrowRight, ClipboardEdit  } from "lucide-react";
import Link from 'next/link';
import { useSession, signIn, signOut } from "next-auth/react"
import Image from 'next/image'
import video from '../app/video';




const routes = [
  {
    label: 'Conversation',
    icon: MessageSquare,
    href: '/conversation',
    color: "text-violet-500",
  },
  {
    label: 'Image Generation',
    icon: ImageIcon,
    color: "text-pink-700",
    href: '/image',
  },
  {
    label: 'Text Summarization',
    icon: ClipboardEdit ,
    color: "text-green-700",
    href: '/summarization',
  },
  {
    label: 'Chat with Naval Ravikant',
    icon: User,
    color: "text-red-700",
    href: '/provelangfront',
  },
  {
    label: 'Create your Chatbot',
    icon: UserPlus,
    color: "text-purple-700",
    href: '/createchatbot',
  },
  
  
  
];

const Hero = () => {

  const {data, status}  = useSession();

    console.log("data: "+data);
    console.log("status: "+status)

    console.log("data GPT:", JSON.stringify(data, null, 2));
    console.log("status GPT:", status);


  const radialGradientStyle = {
    background: 'radial-gradient(circle, rgba(2, 0, 36, 0) 0, #fafafa 100%)',
    minHeight: '100vh',
    paddingTop: '48px',
  };
  
  const routeContainerStyle = {
    // Add your route container styling here
    // For example, you can adjust padding, margin, etc.
  };
  const courses = [
    {
      id: 1,
      title: 'Introduction to Finance',
      description: 'Learn the basics of finance.',
      price: 'Free',
      image: '/Finance.png',
    },
    {
      id: 2,
      title: 'Introduction to Finance',
      description: 'Learn the basics of finance.',
      price: 'Free',
      image: '/Finance2.png',
    },
    {
      id: 3,
      title: 'Introduction to Finance',
      description: 'Learn the basics of finance.',
      price: 'Free',
      image: '/Finance3.png',
    },
    {
      id: 4,
      title: 'Introduction to Finance',
      description: 'Learn the basics of finance.',
      price: 'Free',
      image: '/Finance4.png',
    },
    {
      id: 5,
      title: 'Introduction to Finance',
      description: 'Learn the basics of finance.',
      price: 'Free',
      image: '/Finance5.png',
    },
    {
      id: 6,
      title: 'Introduction to Finance',
      description: 'Learn the basics of finance.',
      price: 'Free',
      image: '/Finance6.png',
    },
    {
      id: 7,
      title: 'Introduction to Finance',
      description: 'Learn the basics of finance.',
      price: 'Free',
      image: '/Finance7.png',
    },
    {
      id: 8,
      title: 'Introduction to Finance',
      description: 'Learn the basics of finance.',
      price: 'Free',
      image: '/Finance8.png',
    },
    
    // ... more courses
  ];

  return (
    <div style={radialGradientStyle}>
      <div className='flex flex-row items-center mt-12 justify-center'>
        <div className='flex flex-col items-center'>
          <div className="flex items-center justify-center">
            <div>
              <h1 className="text-5xl font-extrabold text-center leading-tight mb-2">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-500">
                  Easy Finance
                </span>
              </h1>

              <p className='text-gray-300 text-center'>
              Learn Finance in easy and fun way!
              </p>

            </div>
            
            <div className="ml-14">
              {status === "authenticated" ? (
                <div className="flex items-center">
                  <Image
                    src={data.user?.image}
                    width={50}
                    height={50}
                    className='rounded-full'
                    alt="Picture of the author"
                  />
                  <button
                    className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white px-10 py-3 rounded-full shadow-md hover:opacity-75 ml-4"
                    onClick={() => signOut()}
                  >
                    Log Out
                  </button>
                </div>
              ) : (
                <button
                  className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white px-10 py-3 rounded-full shadow-md hover:opacity-75 mt-4"
                  onClick={() => signIn("google")}
                >
                  Log In
                </button>
              )}
            </div>
          </div>
        
        </div>
      </div>
      {/* HERE START THE ADDIRIONAL THINGS */}
      



      <div className="container mx-auto px-4 py-8">
        {/* <h2 className="text-3xl font-bold text-center mb-6">Featured Courses</h2> */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {courses.map((course) => (
            <div key={course.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="h-48 w-full relative"> {/* Fix the height of the container */}
                <Image 
                  src={course.image}
                  alt={course.title}
                  layout="fill"
                  objectFit="cover" // This will cover the area, cropping the image if necessary
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold">{course.title}</h3>
                <p className="text-sm text-gray-600 mt-1">{course.description}</p>
                <div className="flex items-center mt-2">
                  <Star className="w-5 h-5 text-yellow-400" />
                  <Star className="w-5 h-5 text-yellow-400" />
                  <Star className="w-5 h-5 text-yellow-400" />
                  <Star className="w-5 h-5 text-yellow-400" />
                  <Star className="w-5 h-5 text-yellow-400" />
                </div>
                <div className="flex justify-between items-center mt-3">
                  <span className="text-lg font-bold">{course.price}</span>
                  <button className="px-2 py-1 bg-blue-500 text-white text-xs font-bold uppercase rounded">Enroll</button>
                </div>
              </div>
            </div>
          ))}

          {/* {courses.map((course) => (
            <div key={course.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <Image 
                src={course.image} 
                alt="Finance course" 
                width={320} 
                height={180} 
                className="w-full"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold">{course.title}</h3>
                <p className="text-sm text-gray-600 mt-1">{course.description}</p>
                <div className="flex items-center mt-2">
                  <Star className="w-5 h-5 text-yellow-400" />
                  <Star className="w-5 h-5 text-yellow-400" />
                  <Star className="w-5 h-5 text-yellow-400" />
                  <Star className="w-5 h-5 text-yellow-400" />
                  <Star className="w-5 h-5 text-yellow-400" />
                </div>
                <div className="flex justify-between items-center mt-3">
                  <span className="text-lg font-bold">{course.price}</span>
                  <button className="px-2 py-1 bg-blue-500 text-white text-xs font-bold uppercase rounded">Enroll</button>
                </div>
              </div>
            </div>
          ))} */}
        </div>
      </div>


      {/* <div className='p-20 ml-12' style={routeContainerStyle}>
        {routes.map((route) => (
          <Link key={route.href} href={status === "authenticated" ? route.href : "/login"} className='block'>
            <div className={`p-6 border-2 mb-6 hover:bg-gray-200 flex items-center justify-between ${route.color}`}>
              <div className="flex items-center">
                <route.icon className={`h-5 w-5 mr-3`} />
                {status === "authenticated" ? route.label : "Log in to access"}
                
                
              </div>
              <ArrowRight className={`h-5 w-5`} />
            </div>
          </Link>
          
        ))}
      </div> */}
    </div>
  );
  
  
}

export default Hero;  