"use client"

import { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

export default function PasswordInput({name}:{name:string}) {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
       <label htmlFor="password" className="flex flex-col my-4 relative  ">
      <span className='text-white'> Password</span>
   
      <input
        type={showPassword ? 'text' : 'password'}
        name={name}
        id="password"
        minLength={8}
        placeholder='Password'
        required
        className="border-2 p-1 w-full  rounded-sm mt-2"
      />
      <button
        type="button"
        onClick={togglePasswordVisibility}
        className="absolute inset-y-0 right-0 px-3 top-1/2 flex items-center"
        aria-label="Toggle password visibility"
      >
        {showPassword ? <FaEyeSlash /> : <FaEye />}
      </button>
      
      </label>
    </>
  );
}
