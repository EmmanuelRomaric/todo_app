'use client';
 
import { useFormState } from 'react-dom';
import Link from 'next/link';
import { createTask } from '@/app/lib/actions';
import moment from 'moment';

export default function Form() {
  const initialState = { message: '', errors: {} };
  const [state, dispatch] = useFormState (createTask, initialState);
 
 
    return (
      <div className='flex justify-center mt-4'>
          <form action={dispatch}>
           <div><input 
           type="text" 
           name="name" 
           placeholder="Task name" 
           className='w-[50vw] p-2 border my-2' 
           aria-describedby="name-error"
           />
           </div>
           <div id="name-error" aria-live="polite" aria-atomic="true">
              {state.errors?.name &&
              state.errors.name.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
                ))}
            </div>
           <div><textarea name="description" placeholder="Description" className='w-[50vw] p-2 border my-2'></textarea></div>
           <div>
              <input 
              type="date" 
              name="duedate" 
              min={moment().format('YYYY[-]MM[-]DD')}
              placeholder="Due date" 
              className='w-[50vw] p-2 border my-2' 
              aria-describedby='date-error'
              />
            </div>
            <div id="date-error" aria-live="polite" aria-atomic="true">
              {state.errors?.duedate &&
              state.errors.duedate.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
                ))}
            </div>
           <div className='flex justify-end gap-2'>
               <Link href={"/dashboard"} className='p-2 border rounded-md bg-gray-200 hover:bg-gray-400'>Cancel</Link>
               <button type="submit" className='p-2 border rounded-md bg-gray-200 hover:bg-gray-400'>Add task</button>
           </div>
          </form>
      </div>
    );
  }