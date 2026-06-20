


'use client';

import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { authClient } from '../lib/auth-client';
import Link from 'next/link';

export default function SignUpPage() {
const [loading,setLoading]=useState(false)
  const handleSubmit = async(e) => {
    e.preventDefault();
    setLoading(true)
     const Formdata=new FormData(e.currentTarget);
     const userdata=Object.fromEntries(Formdata)
    if (userdata.password !== userdata.confirm) {
      toast.error("Passwords do not match!");
      setLoading(false)
      return;
    }
    const { data, error } = await authClient.signUp.email({
    name: userdata.name, // required
    email: userdata.email, // required
    password: userdata.password, // required
    callbackURL: "/",
});

if(error){
toast.error(error?.message || error?.statusText)
setLoading(false)
return
}
else{
    toast.success("Registration Successful");
setLoading(false)
window.location.href='/?registered=true'

}

  };

  return (
    <div className="flex min-h-100 items-center justify-center bg-[#0a0a0a] p-3">
      
      {/* 1. OUTER CONTAINER (Defines the shape and cuts off the spinning bleed) */}
      <div className="relative w-full max-w-md h-fit rounded-2xl overflow-hidden bg-neutral-900 p-1">
        
        {/* 2. THE SPINNING BACKGROUND LAYER (This handles the orange tracing beam) */}
        <div className="absolute inset-[-200%] bg-[conic-gradient(from_0deg,transparent_60%,#FFA500_100%)] animate-border-spin z-0" />

        {/* 3. YOUR INNER ACTUAL FORM CONTENT */}
        <form 
          onSubmit={handleSubmit}
          className="fieldset relative w-full bg-[#0d0d0d] rounded-[14px] p-6 z-10 space-y-2.5 border-base-300 border text-neutral-200"
        >
             <h2 className='text-2xl font-bold text-center'>
                {loading?"Creating Account...":"Create Account"}</h2>
  <p className='text-center text- text-zinc-400'  >
    Fill in the Fields below to create your account for free
  </p>

  <div className='h-0.5 border border-warning'></div>
          {/* FULL NAME FIELD */}
          <fieldset className="fieldset">
            <label className="label">User Name</label>
            <input 
              type="text" 
              name='name'
              className="input validator w-full bg-neutral-900" 
              placeholder="user Name" 
              required 
            />
            <p className="validator-hint hidden">Required</p>
          </fieldset>

          {/* EMAIL FIELD */}
          <fieldset className="fieldset">
            <label className="label">Email</label>
            <input 
              type="email" 
              className="input validator w-full bg-neutral-900" 
              placeholder="Email" 
              name="email"
              required 
            />
            <p>Must be at least 8 characters with 1 uppercase and 1 number</p>
            <p className="validator-hint hidden">Invalid Email</p>
          </fieldset>

  {/* PASSWORD FIELD */}
         <div className='flex gap-2'>
          <label className="fieldset">
            <span className="label">Password</span>
            <input 
              type="password" 
              className="input validator bg-neutral-900" 
              placeholder="Password" 
            name="password"
              required 
            />
            <span className="validator-hint hidden">Required</span>
          </label>

          {/* CONFIRM PASSWORD FIELD */}
          <label className="fieldset">
            <span className="label">Confirm Password</span>
            <input 
              type="password" 
              className="input validator bg-neutral-900" 
              placeholder="Confirm Password" 
            name="confirm"
              required 
            />
            <span className="validator-hint hidden">Required</span>
          </label>
         </div>

          {/* BUTTON ACTIONS */}
          <div className="flex flex-col gap-2 pt-2">
            <button className="btn bg-primary text-white border-none hover:bg-primary/80" type="submit">
              {loading? "Creating Account ...":"Create Account"}
            </button>
          </div>

          <p className="text-lg font-medium text-center ">Already Have an Account
           <Link href={"/login"}>   <u className="text-orange-300"> Log In</u> </Link>
            </p>
        </form>

      </div>
    </div>
  );
}