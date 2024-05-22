import { fetchTasks } from '@/app/lib/data';
import Link from "next/link";
import { UpdateTask, DeleteTask } from '@/app/ui/buttons';
import { PlusIcon} from '@heroicons/react/24/outline';
import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime';
import Logout from './logout';
import moment from 'moment';

dayjs.extend(relativeTime);

export default async function Tasks() {
  
    const tasks = await fetchTasks();
  
    return (
      <div className="">
        <div className="flex justify-center">
          <h1 className="text-4xl font-bold my-4">My tasks</h1>
        </div>
          
        <div>
          { (tasks).map( (task) => {
            
      
          return (
          <div key={task.taskid} className="grid grid-cols-4 gap-4 border-b">
              <div className="col-span-3 row-span-2">
                <div>{task.name}</div>
                <div className="text-gray-500">{task.description}</div>
                <div className="text-blue-500">By {moment(task.duedate).calendar().split(' at ')[0]}</div>
              </div>
              <div className="flex gap-2 justify-end mt-4">
                  <UpdateTask taskid={task.taskid.toString()} />
                  <DeleteTask taskid={task.taskid} />
              </div>
        
          </div>
        
        )})}
        </div>
        <div className="flex justify-start mt-4">
            <Link href={"/add"} className="flex justify-start gap-2 p-2 border rounded-md bg-gray-200 hover:bg-gray-400">
              <PlusIcon className="w-5"/>
              <span>Add task</span>
            </Link>
        </div>
      </div>
    );
  }