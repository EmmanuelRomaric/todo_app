import { fetchTaskById } from '@/app/lib/data';
import Form from '@/app/ui/edit-form';
import { notFound } from 'next/navigation';


export default async function Page({ params }: { params: { taskid: string } }) {

    const taskid = params.taskid;
    //console.log(taskid)
    const task = await fetchTaskById(Number(taskid));
    //console.log(task)

    if (!task) {
      notFound();
    }
   
    return (
      <div className='flex justify-center mt-4'>
        <Form taskid={task.taskid} name ={task.name} description={task.description} duedate={task.duedate}></Form>      
      </div>
    );
  }


