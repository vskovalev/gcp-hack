import React from 'react';
import { Settings } from 'lucide-react';

const SettingsPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md flex flex-col items-center">
        <div className="mb-4">
          <Settings size={64} />
        </div>
        <h2 className="text-2xl font-bold mb-2">Settings</h2>
        <p className="text-gray-600">
          Configure your preferences and options here.
        </p>
      </div>
    </div>
  );
};

export default SettingsPage;
