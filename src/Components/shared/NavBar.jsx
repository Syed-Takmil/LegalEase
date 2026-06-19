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

// 1. ADD CHILDREN HERE so your homepage content/banner hooks inside the container
export default function Navbar({ children }) {
  const path = usePathname();
  
  const links = (
    <>
      <NavLink href={'/'}>Home</NavLink>
      <NavLink href={'/browse'}>Browse Lawyers</NavLink>
      <NavLink href={'/dashboard'}>DashBoard</NavLink>
    </>
  );

  const sideLinks = (
    <>
      <Link 
        href={'/'}
        className={`flex gap-2 rounded-xl p-2 justify-items-center items-center ${path === '/' ? 'bg-base-300 text-orange-500' : 'hover:text-orange-500'}`}
      > 
        <House/> Home
      </Link>
      <Link 
        href={'/browse'}
        className={`flex rounded-xl gap-2 p-2 justify-items-center items-center ${path === '/browse' ? 'bg-base-300 text-orange-500' : 'hover:text-orange-300 hover:bg-base-300'}`}
      >  
        <PlanetEarth/> Browse Lawyers
      </Link>
      <Link 
        href={'/dashboard'}
        className={`flex rounded-xl gap-2 p-2 justify-items-center items-center ${path === '/dashboard' ? 'text-orange-500 bg-base-300' : 'hover:text-orange-300 hover:bg-base-300'}`}
      >
        <Dice4/> DashBoard
      </Link>
    </>
  );

  const [searchQuery, setSearchQuery] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [userRole, setUserRole] = useState('lawyer');

  const handleSearch = (e) => {
    e.preventDefault();
    console.log(`Searching for: ${searchQuery}`);
  };

  return (
    <div className="drawer mx-auto w-full min-h-screen">
      <input id="navbar-drawer" type="checkbox" className="drawer-toggle" /> 
      
      <div className="drawer-content flex flex-col w-full min-h-screen bg-base-100">
        
        {/* --- MAIN NAVBAR CONTROLLER --- */}
        <div className="navbar border-neutral-900 bg-[#0a0a0a] text-neutral-content sticky top-0 z-40 shadow-md p-0 md:px-4 lg:px-8 w-full">
          
          <div className="navbar-start lg:w-1/4">
            <label htmlFor="navbar-drawer" aria-label="open sidebar" className="btn btn-ghost btn-circle lg:hidden">
              <Bars/>
            </label>
            <Link href="/" >
              <Logo />
            </Link>
          </div>

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

          <div className="navbar-end lg:w-2/4 gap-4">
            <div className="hidden lg:flex items-center gap-4">
              {links}
            </div>
            <div className='hidden lg:block h-6 border border-neutral-700'></div>
            <div className='flex gap-3 px-2 sm:px-0'>
              <button className='text-orange-500 font-medium text-sm'>Sign In</button>
              <button className='btn btn-sm sm:btn-md bg-orange-400 border-none text-black rounded-3xl hover:bg-orange-500'>Get Started</button>
            </div>
          </div>
        </div>

        {/* 2. THE MAGICAL CONTENT GAP FIXER */}
        {/* Your banner component now lives inside here cleanly right against the navbar menu line */}
        <main className="flex-grow w-full">
          {children}
        </main>

      </div> 

      {/* --- MOBILE RESPONSIVE SIDEBAR DRAWER PANEL --- */}
      <div className="drawer-side z-[9999]">
        <label htmlFor="navbar-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
        <div className="menu p-4 w-80 min-h-full bg-base-200 text-base-content border-r border-base-300 space-y-4 shadow-xl">
          <div className="flex items-center justify-between pb-4 border-b border-base-300">
            <Logo />
          </div>
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
          <ul className="space-y-1 text-lg grid">
            {sideLinks}
          </ul>
        </div>
      </div>
    </div>
  );
}