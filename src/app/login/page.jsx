
"use client";

import React, { useEffect } from "react";
import {Check, Eye, EyeClosed} from "@gravity-ui/icons";
import {  toast } from 'react-toastify';
import { authClient } from "../lib/auth-client";
import Image from "next/image";
import Link from "next/link";

export default function LoginPage() {
    const [isShowPassword, setIsShowPassword] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
 const onSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const userdata = Object.fromEntries(formData.entries());
console.log(userdata)
    const { data, error } = await authClient.signIn.email({
    email: userdata.email, 
    password: userdata.password, // re
    callbackURL: "/",
});
if(error){
     toast.error(error?.message ||error?.statusText|| "An error occurred while logging In.");
    setLoading(false);
}
else{
    toast.success("Logged in successfully! .");
    setLoading(false)
    setTimeout(() => {
        window.location.href = "/";
    }, 2000);
}

  };
  return (
<div className=" flex flex-col md:flex-row-reverse gap-5 items-center   justify-items-center justify-evenly  w-full p-4 ">
  <div className="flex-2">  <legend className="text-xl font-bold m-2">Login</legend>
  <form onSubmit={onSubmit} className="fieldset bg-base-200  rounded-box  border p-5">
     <h2 className="text-lg text-center text-white">Welcome back!</h2>
    <p className="text-center text-zinc-400"  >
    Please enter your credentials to log in to your account
  </p>
  <div className="h-0.5 border border-gray-200"></div>
  <fieldset className="fieldset">
    <label className="label">Email</label>
    <input type="email" className="input validator w-full" name='email' placeholder="Email" required />
    <p className="validator-hint hidden">Enter a Valid Email</p>
  </fieldset>

  <label className="fieldset">
    <span className="label">Password</span>
    <input type="password" className="input validator w-full" name="password" placeholder="Password" required />
    <span className="validator-hint hidden">Required</span>
  </label>

  <button className="btn bg-orange-400 mt-4" type="submit">
   {loading?"Logging In...":"Login"} 
    </button>
  <button className="btn btn-primary mt-1" type="reset">Reset</button>
  <p className="text-lg font-medium text-center ">New to LegalEase? 
 <Link href={"/register"}>   <u className="text-orange-300"> Register for Free</u> </Link>
  </p>
</form>
</div>
    
<div className="flex-3">
        <Image className="rounded-xl w-auto " src={'/slide1.png'} width={700} height={850} alt='slide'></Image>
    </div>
    

</div>
  );
}