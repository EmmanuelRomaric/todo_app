'use client';
import { Bars3Icon, UserCircleIcon, XMarkIcon } from "@heroicons/react/24/outline";
import AppLogo from "./app-logo";
import Link from "next/link";
import Logout from "./logout";
import { useState } from "react";
import clsx from "clsx";

export default function DashboardMenu({userName, userEmail}) {
    const [menuIsVisible, setMenuIsVisible] = useState(false);
    
   return(
    <div className='grid grid-cols-2'>
  <div className='flex items-start justify-start'>
    <AppLogo />
  </div>
  <div className='flex items-start justify-end gap-2' id="menu">
        <MenuIconToggle onClick={handleClick}/>
  </div>
<div className={clsx('col-span-2 flex items-center justify-start',
    {
        'invisible absolute': !menuIsVisible,
        'visible': menuIsVisible
    }
)} >
    <div className='w-full'>
      <div className='h-12 w-full rounded-md bg-gray-50 p-3 text-sm font-medium md:flex-none md:justify-start md:p-2 md:px-3'>
        <div className=''>{userName}</div>
        <div className='text-gray-500'>{userEmail}</div>
      </div>

      <Link className='flex h-12 w-full grow items-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3' href={'/profile'}>
        <UserCircleIcon className="w-6"/>
        Profile
      </Link>
      <Logout />
    </div>
  
</div>
</div>
   ) 
   function handleClick() {
    setMenuIsVisible(!menuIsVisible)
        
   }

    function MenuIconToggle({onClick}) {
        
    return (
       menuIsVisible?  <XMarkIcon className="size-12 bg-gray-200 hover:bg-gray-400 rounded" onClick={onClick}/> : <Bars3Icon className="size-12 bg-gray-200 hover:bg-gray-400 rounded" onClick={onClick}/>
    )
}
}

