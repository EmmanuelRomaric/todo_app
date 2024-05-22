import { sql } from '@vercel/postgres';
import { cookies } from 'next/headers';
import { decrypt } from './session';

export async function fetchTasks () {

  const cookie = cookies().get('session')?.value
  const session = await decrypt (cookie)
  const id = session.userId as number;
  const data = await sql`SELECT * FROM tasks WHERE user_id=${id}`; 
  return data.rows;
    
  }
  
  export async function fetchTaskById(taskid: number) {
    
    try {
      const data = await sql`
        SELECT * FROM tasks
        WHERE taskid=${taskid};
      `;
      console.log(taskid)
      console.log(data.rows)
      return data.rows[0];
      }
    catch (error) {
      console.error('Database Error:', error);
      throw new Error('Failed to fetch task.');
    }
   
  }

  export async function fetchUser() {
    const cookie = cookies().get('session')?.value
    const session = await decrypt (cookie)
    const id = session.userId as number;
    const user_data = await sql`SELECT * FROM users WHERE id=${id}`
    const  userdata = user_data.rows[0]
    return userdata;
  }