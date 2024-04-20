"use client"

import React from 'react';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const LoginPage = () => {
  const radialGradientStyle = {
    background: 'radial-gradient(circle, rgba(2, 0, 36, 0) 0, #fafafa 100%)',
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const { data: sessionData, status } = useSession();
  const router = useRouter();

  if (status === 'authenticated') {
    router.push('/');
  }

  return (
    <div style={radialGradientStyle}>
      <div className="bg-white p-8 rounded shadow-md w-80">
        <Link href="/" className="text-gray-600 hover:text-gray-800">
          <ArrowLeft className="h-5 w-5 mr-2" />
          <h2 className='my-4 text-xl'>Log In to access AI Tools</h2>
        </Link>
        <h2 className="text-2xl font-bold mb-4">Log In</h2>
        {status === 'loading' ? (
          <p>Loading...</p>
        ) : (
          <button
            className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 text-white px-4 py-2 rounded-md shadow-md hover:opacity-75"
            onClick={() => signIn('google')}
          >
            Log In with Google
          </button>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
