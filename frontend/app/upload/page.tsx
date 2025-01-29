
import React from 'react';
import { SignupFormDemo } from '../components/Form';


const UploadPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-800 via-indigo-800 to-slate-900 p-8 flex flex-col justify-center items-center">
      
      <div className="max-w-lg w-full bg-white bg-opacity-10 p-8 rounded-lg shadow-2xl backdrop-blur-lg">
      
        <SignupFormDemo />
      </div>
    </div>
  );
}

export default UploadPage;
