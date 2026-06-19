

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ChevronDown, 
  Magnifier, 
  Person, 
  ArrowRightFromSquare, 
  Bars, 
  House,
  PlanetEarth,
  Dice4
} from '@gravity-ui/icons';
import Logo from '../Logo';
import NavLink from './NavLink';
import { usePathname } from 'next/navigation';

// Pass { children } through so the main app pages and footer render inside the scroll container
export default function Navbar() {
  const path=usePathname();
  const links=<>
<NavLink href={'/'} >Home</NavLink>
  <NavLink href={'/browse'}>  Browse Lawyers</NavLink>
  <NavLink href={'/dashboard'}>DashBoard</NavLink>
  </>

  const sideLinks=<>
  
   
  <Link href={'/'}
   className={`flex gap-2 p-1 justify-items-center items-center  ${(path=='/')?'bg-default bg-base-300 p-2 text-blue-400    rounded-xl  hover:bg-default' : 'hover:bg-default'}`} > <House/> Home</Link>
  <Link href={'/browse'}
   className={`flex gap-2 p-1 justify-items-center items-center ${(path=='/browse')?' bg-default bg-base-300 p-2   rounded-xl  hover:bg-default' : 'hover:bg-default'}`} >  
   <PlanetEarth/>
   Browse Lawyers</Link>
  <Link href={'/dashboard'}
   className={`flex gap-2 p-1 justify-items-center items-center ${(path=='/dashboard')?'bg-default bg-base-300 p-2   rounded-xl  hover:bg-default' : 'hover:bg-default'}`} ><Dice4/> DashBoard</Link>
  </>
  const [searchQuery, setSearchQuery] = useState('');
  
  // Auth state states 
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [userRole, setUserRole] = useState('lawyer'); // 'client' | 'lawyer' | 'admin'
  const currentPath = '/';  // Track current path for active class indicators

  const handleSearch = (e) => {
    e.preventDefault();
    console.log(`Searching for specialties or lawyer names containing: ${searchQuery}`);
  };

  return (
    // Explicit min-h-screen enforces consistent structural heights
    <div className="drawer min-h-screen">
      <input id="navbar-drawer" type="checkbox" className="drawer-toggle" /> 
      
      {/* The main scroll window containing navbar, page content, and footer */}
      <div className="drawer-content flex flex-col min-h-screen bg-base-100">
        
        {/* --- MAIN NAVBAR CONTROLLER --- */}
        <div className="navbar bg-base-900 text-neutral-content sticky top-0 z-40 shadow-md px-4 sm:px-8 w-full">
          
          {/* --- NAVBAR START: Hamburger + Logo --- */}
          <div className="navbar-start lg:w-1/4">
            {/* Mobile Hamburger Toggle (Triggers sidebar drawer on screens smaller than 'lg') */}
            <label htmlFor="navbar-drawer" aria-label="open sidebar" className="btn btn-ghost btn-circle lg:hidden">
              <Bars/>
            </label>

            {/* Brand Identity Wrapper utilizing your custom <Logo /> component */}
            <Link href="/" >
              <Logo />
            </Link>
          </div>

          {/* --- NAVBAR CENTER: Desktop Global Search Bar --- */}
          <div className="navbar-center hidden md:flex lg:w-1/4 w-fit max-w-md">
            <form onSubmit={handleSearch} className="relative w-full">
              <input
                type="text"
                placeholder="Search lawyers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input input-bordered w-full pl-10 bg-base-200 text-sm focus:input-primary h-10 rounded-lg"
              />
              <div className="absolute left-3 top-2.5 text-gray-400">
                <Magnifier/>
              </div>
            </form>
          </div>

          {/* --- NAVBAR END: Desktop Navigation Items & Auth Trigger --- */}
          <div className="navbar-end lg:w-2/4 gap-4">
            <div className="hidden lg:flex items-center gap-4">
          {links}
              {/* Role-Based Dashboard Dropdown */}
              {/* {isLoggedIn && (
                <div className="dropdown dropdown-end">
                  <div tabIndex={0} role="button" className="btn btn-ghost btn-sm font-medium gap-1">
                    Dashboard
                    <ChevronDown/>
                  </div>
                  <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow-lg bg-base-800 rounded-box w-52 border border-gray-700 mt-2">
                    <li className="menu-title text-gray-400 text-[11px] border-b border-gray-700 pb-1 mb-1 capitalize">
                      Portal: {userRole}
                    </li>
                    {userRole === 'client' && (
                      <li><Link href="/dashboard/client/cases">My Consultations</Link></li>
                    )}
                    {userRole === 'lawyer' && (
                      <>
                        <li><Link href="/dashboard/lawyer/schedule">Manage Schedule</Link></li>
                        <li><Link href="/dashboard/lawyer/profile">Edit Profile</Link></li>
                      </>
                    )}
                    {userRole === 'admin' && (
                      <li><Link href="/dashboard/admin/verifications">Verify Lawyers</Link></li>
                    )}
                  </ul>
                </div>
              )} */}
            </div>
<div className='hidden lg:block h-6 border border-white'></div>
<div className='flex gap-3'>
  <button className='text-blue-500'>Sign In</button>
  <button className='btn btn-primary rounded-3xl'>Get Started</button>
</div>
            {/* Dynamic Auth Action CTA */}
            {/* {isLoggedIn ? (
              <button 
                onClick={() => setIsLoggedIn(false)}
                className="btn btn-error btn-sm text-white gap-2 rounded-lg font-medium shadow-sm"
              >
                <ArrowRightFromSquare/>
                <span className="hidden sm:inline">Logout</span>
              </button>
            ) : (
              <button 
                onClick={() => setIsLoggedIn(true)}
                className="btn btn-primary btn-sm text-white gap-2 rounded-lg font-medium shadow-sm"
              >
                <Person/>
                <span className="hidden sm:inline">Lawyer Login</span>
              </button>
            )} */}
          </div>
        </div>

      

      </div> 

      {/* --- MOBILE RESPONSIVE SIDEBAR DRAWER PANEL --- */}
      {/* High z-index explicitly covers up the background logo elements */}
      <div className="drawer-side z-[9999]">
        <label htmlFor="navbar-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
        {/* Solid background token (bg-base-200) prevents underlying navbar bleed-through */}
        <div className="menu p-4 w-80 min-h-full bg-base-200 text-base-content border-r border-base-300 space-y-4 shadow-xl">
          
          {/* Mobile Identity Row */}
          <div className="flex items-center justify-between pb-4 border-b border-base-300">
            <Logo />
          </div>

          {/* Mobile Search Input Option */}
          <form onSubmit={handleSearch} className="relative w-full md:hidden">
            <input
              type="text"
              placeholder="Search lawyers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input input-bordered w-full pl-10 bg-base-300 text-sm focus:input-primary h-10 rounded-lg"
            />
            <div className="absolute left-3 top-2.5 text-gray-400">
              <Magnifier/>
            </div>
          </form>

          {/* SideBar Links*/}
          <ul className="space-y-1  text-lg grid">
            {sideLinks}
            {/* {isLoggedIn && (
              <li className="pt-2">
                <span className="menu-title text-xs uppercase tracking-wider text-gray-500 px-2">Dashboard ({userRole})</span>
                <ul className="pl-2 mt-1 border-l border-base-300 ml-2 space-y-1">
                  {userRole === 'client' && (
                    <li><Link href="/dashboard/client/cases">My Consultations</Link></li>
                  )}
                  {userRole === 'lawyer' && (
                    <>
                      <li><Link href="/dashboard/lawyer/schedule">Manage Schedule</Link></li>
                      <li><Link href="/dashboard/lawyer/profile">Edit Profile</Link></li>
                    </>
                  )}
                  {userRole === 'admin' && (
                    <li><Link href="/dashboard/admin/verifications">Verify Lawyers</Link></li>
                  )}
                </ul>
              </li>
            )} */}
          </ul>
        </div>
      </div>
    </div>
  );
}