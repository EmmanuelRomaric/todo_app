import { editTask } from '@/app/lib/actions';
import Link from 'next/link';
import {Task} from '@/app/lib/definitions'
import moment from 'moment';

export default async function EditTaskForm({taskid, name, description, duedate}:{taskid: number; name: string; description: string; duedate: string;}) {
   
    const editTaskWithId = editTask.bind(null, taskid);
   
    return (
      <div className='flex justify-center mt-4'>
          <form action={editTaskWithId}>
           <div>
              <input 
                type="text" 
                name="name" 
                placeholder="Task name" 
                className='w-[50vw] p-2 border my-2' 
                defaultValue = {`${name}`} 
                required 
                />
           </div>
           <div>
            <textarea 
              name="description" 
              placeholder="Description" 
              className='w-[50vw] p-2 border my-2'>
                  {description}
            </textarea>
            </div>
           <div>
              <input 
                      type="date" 
                      name="duedate" 
                      min={moment().format('YYYY[-]MM[-]DD')}
                      placeholder="Due date" 
                      className='w-[50vw] p-2 border my-2' 
                      defaultValue={`${duedate}`} 
                />
           </div>
           <div className='flex justify-end gap-2'>
               <Link 
                  href={"/dashboard"} 
                  className='p-2 border rounded-md bg-gray-200 hover:bg-gray-400'>
                  Cancel
               </Link>
               <button 
                  type="submit" 
                  className='p-2 border rounded-md bg-gray-200 hover:bg-gray-400'>
                  Edit task
               </button>
           </div>
          </form>
      </div>
    );
  }
