'use server';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import bcrypt from 'bcrypt';
import { State, CreateTask, EditTask, 
  SignupFormSchema, LoginFormSchema, updateProfileInfoFormSchema, 
  FormState, passwordUpdateFormState, PasswordUpdateFormSchema, 
  deleteAccountFormState, deleteAccountFormSchema, 
  updateProfileInfoFormState
} from '@/app/lib/definitions'
import { createSession, deleteSession } from '@/app/lib/session'
import { fetchUser } from './data';



 
 export async function createTask(prevState: State, formData: FormData) {
  

    const validatedFields = CreateTask.safeParse({
        name: formData.get('name'),
        description: formData.get('description'),
        duedate: formData.get('duedate'),
      });

      if (!validatedFields.success) {
        return {
          errors: validatedFields.error.flatten().fieldErrors,
          message: 'Missing Fields. Failed to Create Task.',
        };
      }
      const { name, description, duedate } = validatedFields.data;

      try {
  
       await sql`
     INSERT INTO tasks (name, description, duedate, user_id)
     VALUES (${name}, ${description}, ${duedate}, ${(await fetchUser()).id})
   `;
      } catch (error) {
          return {
            message: 'Database Error: Failed to Create Task.',
          };
      }

  revalidatePath('/dashboard');
  redirect('/dashboard');
  
}

export async function deleteTask(taskid: string) {

  try {
     await sql`DELETE FROM tasks WHERE taskid = ${taskid}`;
     revalidatePath('/dashboard');
     return {
      message: 'Deleted Task.'
    };
  } catch (error) {
    return {
      message: 'Database Error: Failed to Delete Task.'
    };
  }
 
}


 
 export async function editTask(taskid: string, formData: FormData) {

    const { name, description, duedate } = EditTask.parse({
        name: formData.get('name'),
        description: formData.get('description'),
        duedate: formData.get('duedate'),
      });
      try {
      await sql`
        UPDATE tasks
        SET name = ${name}, description = ${description}, duedate = ${duedate}
        WHERE taskid = ${taskid}
  `;
      } catch (error) {
         return {
          message: 'Database Error: Failed to Update Task.'
         };
      }
  revalidatePath('/dashboard');
  redirect('/dashboard');
}


export async function signUp(state: FormState, formData: FormData) {

  // 1. Validate form fields

    const validatedFields = SignupFormSchema.safeParse({
        name: formData.get('name'),
        email: formData.get('email'),
        password: formData.get('password'),
        password_confirmation: formData.get('password_confirmation')
      });

      if (!validatedFields.success) {
        return {
          errors: validatedFields.error.flatten().fieldErrors,
          message: validatedFields.error.flatten().formErrors.toString(),
        };
      }
      
      // 2. Prepare data for insertion into database
      const { name, email, password } = validatedFields.data;
      const hashedPassword = await bcrypt.hash(password, 10);

       // 3. Insert the user into the database or call an Auth Library's API
      try {
      await sql`
    INSERT INTO users (name, email, password)
    VALUES (${name}, ${email}, ${hashedPassword});
  `;
      } catch (error) {
          return {
            message: 'Database Error: Failed to create user.',
          };
      }
   
  //4. Create user session
  const data = await sql`SELECT * FROM users WHERE email = ${email}`;
  await createSession(data.rows[0].id);

  // 5. Redirect user
  redirect('/dashboard');
  
}


export async function login(state: FormState, formData: FormData) {

  // 1. Validate form fields

    const validatedFields = LoginFormSchema.safeParse({
        email: formData.get('email'),
        password: formData.get('password'),
      });

      if (!validatedFields.success) {
        return {
          errors: validatedFields.error.flatten().fieldErrors,
          message: 'Missing Fields. Failed to Log in.',
        };
      }
      
      // 2. Authenticate data
      const { email, password } = validatedFields.data;
      const data = await sql`SELECT * FROM users WHERE email = ${email}`;
      if (data.rowCount==0) {
        return {
          
          message: 'These credentials do not match our records.',
        };
      } else {
        const passwordsMatch = await bcrypt.compare(password, data.rows[0].password);

        if(!passwordsMatch) {
          return {
          
            message: 'These credentials do not match our records.',
          };

        }
      }

  // 4. Create user session
  await createSession(data.rows[0].id);

  // 5. Redirect user
  redirect('/dashboard');
  
}
 
export async function logout() {
  deleteSession()
  redirect('/login')
}

export async function updateProfileInfo(state: updateProfileInfoFormState, formData: FormData) {

   // 1. Validate form fields

  const validatedFields = updateProfileInfoFormSchema.safeParse({
      name: formData.get('name'),
      email: formData.get('email'),
    });
    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
        
      };
    }
     // 2. Update profile information
    const { name, email} = validatedFields.data;
    const userData= await fetchUser();
    try {
    await sql`
      UPDATE users
      SET name = ${name}, email = ${email}
      WHERE id = ${userData.id}
`;
    } catch (error) {
       return {
        message: 'Database Error: Failed to Update Profile Information.'
       };
    }

    return {
      message: 'The profile informations were successfully updated!'
     }

}

export async function updatePassword(state: passwordUpdateFormState, formData: FormData) {
  
   // 1. Validate form fields

   const validatedFields = await (await PasswordUpdateFormSchema()).safeParseAsync({
     currentPassword: formData.get('currentPassword'),
     newPassword: formData.get('newPassword'),
     confirmPassword: formData.get('confirmPassword')
   });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: '',
    };
  }
  
  // 2. Update the password
  const { currentPassword, newPassword, confirmPassword } = validatedFields.data;
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const userData= await fetchUser();
   try {
   await sql`
   UPDATE users
   SET password = ${hashedPassword}
   WHERE id = ${userData.id}
`;
   } catch (error) {
       return {
         message: 'Database Error: Failed to update password.',
       };
   }

   return {
    message: 'The password was successfully updated!'
   }
  }
 
export async function deleteAccount(state: deleteAccountFormState, formData: FormData) {
// 1. Validate form fields

const validatedFields = await deleteAccountFormSchema.safeParseAsync({
  password: formData.get('password'),
});

if (!validatedFields.success) {
 return {
   errors: validatedFields.error.flatten().fieldErrors,
   message: '',
 };
}

// 2. Delete the account
const { password} = validatedFields.data;
 const userData= await fetchUser();
try {
await sql`
DELETE FROM users
WHERE id = ${userData.id}
`;
} catch (error) {
    return {
      message: 'Database Error: Failed to delete account.',
    };
}

//Delete session
deleteSession();
//4. Redirect
redirect('/')

}

