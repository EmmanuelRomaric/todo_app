'use client';
import { useFormState } from "react-dom";
import { deleteAccount, updatePassword, updateProfileInfo } from "../lib/actions";
import { Button } from "./button";
import { useState } from "react";
import clsx from "clsx";

export function UpdateProfileInfo() {
    const [state, action] = useFormState(updateProfileInfo, undefined)
    return (
        <form action={action} className="bg-white w-full sm:w-96 m-auto p-4 mt-4 rounded-md shadow-md">
            <h1>Profile Information</h1>
            <p className="text-gray-400 text-sm">Update your account's profile information and email address.</p>
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
        
        {state?.message && <p className='text-blue-500 font-light'>{state.message}</p>}
     
      
        <div className='grid grid-cols-4'>

        <div className='col-start-4 col-span-1 '>
        <Button className="w-full flex justify-center" type="submit">
        Save
        </Button>
        </div>
        </div>
      </form>

    );
}

export function UpdatePassword() {
    const [state, action] = useFormState(updatePassword, undefined)

    return(
        <form action={action} className="bg-white w-full sm:w-96 m-auto p-4 mt-4 rounded-md shadow-md">
            <h1>Update Password</h1>
            <p className="text-gray-400 text-sm">Ensure your account is using a long random password to stay secure.</p>

    <div className='my-4'>
      <label className='block' htmlFor="password">Current Password</label>
      <input 
          className='border w-full rounded-md p-2 focus:outline-none focus:border-2 focus:border-blue-500' 
          id="currentPassword" 
          name="currentPassword" 
          type="password" />
          {state?.errors?.currentPassword && <p className='text-red-500 font-light'>{state.errors.currentPassword[0]}</p>}
    </div>

    <div className='my-4'>
      <label className='block' htmlFor="password">New Password</label>
      <input 
          className='border w-full rounded-md p-2 focus:outline-none focus:border-2 focus:border-blue-500' 
          id="newPassword" 
          name="newPassword" 
          type="password" />
          {state?.errors?.newPassword && <p className='text-red-500 font-light'>{state.errors.newPassword[0]}</p>}
    </div>
    

    <div className='my-4'>
      <label className='block' htmlFor="password_confirmation">Confirm Password</label>
      <input 
          className='border w-full rounded-md p-2 focus:outline-none focus:border-2 focus:border-blue-500' 
          id="confirmPassword" 
          name="confirmPassword" 
          type="password" 
          />
      {state?.errors?.confirmPassword && <p className='text-red-500 font-light'>{state.errors.confirmPassword[0]}</p>}
      <div>
          {state?.message && <p className='text-red-500 font-light'>{state.message}</p>}
          
      </div>
    </div>
    <div className='grid grid-cols-4'>

        <div className='col-start-4 col-span-1 '>
        <Button className="w-full flex justify-center" type="submit">
        Save
        </Button>
        </div>
        </div>
  </form> 
    )
}

export function DeleteAccount() {
    const [state, action] = useFormState(deleteAccount, undefined)
    const [visible, setVisible] = useState(false)

    var modal = document.getElementById('id01');
    window.onclick = function(event) {
        if(event.target==modal) {
            setVisible(false)
        }
    }
    return(
    
        <div>
            <div className="bg-white w-full sm:w-96 m-auto p-4 mt-4 rounded-md shadow-md">
                    <h1>Delete Account</h1>
                    <p className="text-gray-400 text-sm">Once your account is deleted, all of its resources and data will be permanently deleted. Before deleting your account, please download any data or information that you wish to retain.</p>
            
                <div className='flex justify-end mt-8'>
                <Button className=" flex justify-center bg-red-500" onClick={()=>setVisible(true)}>
                DELETE ACCOUNT
                </Button>
                </div>
                </div>
            
              <div className={clsx('', 
                    {
                        'fixed z-10 w-full h-full top-0 left-0 bg-black overflow-auto bg-black/50 p-auto': visible,
                        '': !visible

                    })} id="id01">
                  <form action={action} className={clsx("bg-white w-full sm:w-96 m-auto p-4 mt-4 rounded-md shadow-md",
                  {
                    'invisible': !visible,
                    'visible': visible,
                  }
                  )}>
                        <h1 className="text-red-400">Are you sure you want to delete your account?</h1>
                        <p className="text-sm">Once your account is deleted, all of its resources and data will be permanently deleted. Please enter your password to confirm you would like to permanently delete your account.</p>
                        <div className='my-4'>
                      <label className='block' htmlFor="password">Password</label>
                      <input
                  className='border w-full rounded-md p-2 focus:outline-none focus:border-2 focus:border-blue-500'
                  id="password"
                  name="password"
                  type="password" />
                  {state?.errors?.password && <p className='text-red-500 font-light'>{state.errors.password[0]}</p>}
                    </div>
                    <div className='flex justify-end gap-2 mt-8'>
                    <Button className=" flex justify-center bg-black" type="button" onClick={handleClick}>
                    CANCEL
                    </Button>
                    <Button className=" flex justify-center bg-red-500" type="submit">
                    DELETE ACCOUNT
                    </Button>
                    </div>
                  </form>
              </div>
            
            
                </div>
    
    )

    function handleClick() {
        setVisible(!visible)
    }
}