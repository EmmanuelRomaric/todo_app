import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { deleteTask } from '@/app/lib/actions';
import { revalidatePath } from 'next/cache';

export function UpdateTask({ taskid }: { taskid: string }) {
  revalidatePath(`/${taskid}/edit`)
    return (
        <Link href={`/${taskid}/edit`} className="p-2 border rounded bg-gray-200 hover:bg-gray-400">
          <PencilIcon className="w-5"/>
        </Link>
    );
  }
  
  export function DeleteTask({ taskid }: { taskid: string }) {
    const deleteTaskWithId = deleteTask.bind(null, taskid);
    
    return (
      <form action={deleteTaskWithId}>
        <button className="rounded-md border p-2 bg-gray-200 hover:bg-gray-400">
          <span className="sr-only">Delete</span>
          <TrashIcon className="w-5" />
        </button>
      </form>
    );
  }