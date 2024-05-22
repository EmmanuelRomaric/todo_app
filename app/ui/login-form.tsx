'use client';
import { useFormState, useFormStatus } from 'react-dom';
import { login } from '@/app/lib/actions';
import {
    AtSymbolIcon,
    KeyIcon,
    ExclamationCircleIcon,
    Bars4Icon,
  } from '@heroicons/react/24/outline';
  import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { Button } from './button';
import Link from 'next/link';
import AppLogo from './app-logo';


export default function LoginForm() {
  const [state, dispatch] = useFormState(login, undefined);
    return (
      <>
        <div className="">
          <AppLogo />
        </div>
        <form action={dispatch} className="bg-white w-full sm:w-96 m-auto p-4 mt-4 rounded-md shadow-md">
        <div className='my-4'>
          <label className='block' htmlFor="email">Email</label>
          <input 
              className='border w-full rounded-md p-2 focus:outline-none focus:border-2 focus:border-blue-500' 
              id="email" 
              name="email" 
              type="email" 
              placeholder="Email" />
          {state?.errors?.email &&  <p className='text-red-500 font-light'>{state.errors.email[0]}</p>}

        </div>
       
        
      
        <div className='my-4'>
          <label className='block' htmlFor="password">Password</label>
          <input 
              className='border w-full rounded-md p-2 focus:outline-none focus:border-2 focus:border-blue-500' 
              id="password" 
              name="password" 
              type="password" />
          {state?.errors?.password && <p className='text-red-500 font-light'>{state.errors.password}</p>}
        </div>

        {state?.message && <p className='text-red-500 font-light'>{state.message}</p>}
        <div className='flex'>
          <div className='basis-2/3'></div>
          <div className='basis-1/3'>
       <LoginButton />
       </div>
       </div>
      
      </form>
      </>
    )
  }

  function LoginButton() {
    const { pending } = useFormStatus();
   
    return (
      <Button className="mt-4 w-full" aria-disabled={pending}>
        Log in <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
      </Button>
    );
  }