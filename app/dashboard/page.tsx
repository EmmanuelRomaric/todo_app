
import Tasks from '@/app/ui/tasks';
import AppLogo from '../ui/app-logo';
import { fetchUser } from '../lib/data';
import { UserCircleIcon, ChevronDownIcon, Bars3Icon} from '@heroicons/react/24/outline';
import Link from 'next/link';
import Logout from '../ui/logout';
import { useState } from 'react';
import DashboardMenu from '../ui/dashboard-menu';

export default async function Dashboard() {
 
  const userdata= await fetchUser();
  return (
    <div className ='m-4'>


<DashboardMenu userName={userdata.name} userEmail={userdata.email}/>
             <Tasks  />
             </div>
      )

      
    }
      