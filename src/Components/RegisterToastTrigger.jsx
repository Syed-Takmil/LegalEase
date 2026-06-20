'use client';

import { authClient } from '@/app/lib/auth-client';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

export default function RegisterToastTrigger() {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  useEffect(() => {
    // 1. Don't do anything while the auth state is still loading
    if (isPending) return;

    // 2. Once loading is done, make sure we actually have a valid user object
    if (user?.name) {
      toast.success(`Welcome, ${user.name}! Your account has been generated successfully.`);
      
      // 3. Wipe the URL clean immediately so a page refresh won't trigger this again
      if (typeof window !== 'undefined') {
        const cleanUrl = window.location.pathname; 
        window.history.replaceState({}, document.title, cleanUrl);
      }
    }
  }, [isPending, user]); // Run the effect when loading status or user data changes

  return null; 
}