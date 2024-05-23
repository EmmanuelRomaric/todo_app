'use client';
import { useFormState, useFormStatus } from 'react-dom';
import { login } from '@/app/lib/actions';
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
        
          <div className='grid grid-cols-4'>
          <Link className='col-start-1 col-span-3 font-light flex justify-end items-center underline text-gray-700 hover:text-black text-sm' href={"/signup"}> Not yet registered? </Link>
          <div className='col-start-4 col-span-1 flex justify-end'>
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
      <Button className="" aria-disabled={pending}>
        <p>Log in</p>
      </Button>
    );
  }