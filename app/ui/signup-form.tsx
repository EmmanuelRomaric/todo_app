'use client';
import { useFormState, useFormStatus } from 'react-dom';
import { signUp } from '@/app/lib/actions';
import {
    AtSymbolIcon,
    KeyIcon,
    ExclamationCircleIcon,
    QueueListIcon,
    Bars4Icon
  } from '@heroicons/react/24/outline';
  import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { Button } from './button';
import Link from "next/link";
import AppLogo from './app-logo';

export default function SignupForm() {
  const [state, action] = useFormState(signUp, undefined)
    
    return (
      <>
      <div className="">
          <AppLogo />
        </div>
        <form action={action} className="bg-white w-full sm:w-96 m-auto p-4 mt-4 rounded-md shadow-md">
            <div className='my-4'>
          <label className='block' htmlFor="name">Name</label>
          <input 
              className='border w-full rounded-md p-2 focus:outline-none focus:border-2 focus:border-blue-500' 
              id="name" 
              name="name" 
              type="text" 
              placeholder="Name" />
              {state?.errors?.name && <p className='text-red-500 font-light'>{state.errors.name}</p>}
        </div>
        
        
        <div className='my-4'>
          <label className='block' htmlFor="email">Email</label>
          <input 
              className='border w-full rounded-md p-2 focus:outline-none focus:border-2 focus:border-blue-500' 
              id="email" 
              name="email" 
              type="email" 
              placeholder="Email" />
              {state?.errors?.email && <p className='text-red-500 font-light'>{state.errors.email[0]}</p>}
        </div>
        

        <div className='my-4'>
          <label className='block' htmlFor="password">Password</label>
          <input 
              className='border w-full rounded-md p-2 focus:outline-none focus:border-2 focus:border-blue-500' 
              id="password" 
              name="password" 
              type="password" />
              {state?.errors?.password && <p className='text-red-500 font-light'>{state.errors.password[0]}</p>}
        </div>
        

        <div className='my-4'>
          <label className='block' htmlFor="password_confirmation">Confirm Password</label>
          <input 
              className='border w-full rounded-md p-2 focus:outline-none focus:border-2 focus:border-blue-500' 
              id="password_confirmation" 
              name="password_confirmation" 
              type="password" 
              />
          {state?.errors?.password_confirmation && <p className='text-red-500 font-light'>{state.errors.password_confirmation[0]}</p>}
          
        </div>
        <div className='grid grid-cols-4'>
<Link className='col-start-2 col-span-2 font-light flex justify-center items-center underline text-gray-700 hover:text-black text-sm' href={"/login"}> Already registered? </Link>
        <div className='col-start-4 col-span-1 '>
          <SignupButton />
        </div>
        </div>
      </form>
      </>
    )
  }

  export function SignupButton() {
    const { pending } = useFormStatus()
   
    return (

      <Button className="w-full flex justify-center" aria-disabled={pending}>
        {pending ? 'Submitting...' : 'Sign up'}
        </Button>

      
    )
  }