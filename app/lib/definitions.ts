import { z } from 'zod'
import { fetchUser } from './data';
import bcrypt from 'bcrypt';

export type Task = {
    taskid: number;
    name: string;
    description: string;
    duedate: string;
  };

  export type User = {
    id: string;
    name: string;
    email: string;
    password: string;
  };

  export const FormSchema = z.object({
    taskid: z.string(),
    name: z.string().min(1,{
      message: 'Name is required.',
    }),
    description: z.string(),
    duedate: z.string().min(1,{
      message: 'Due date is required.',
    }),
  });

  export const CreateTask = FormSchema.omit({ taskid: true});
export const EditTask = FormSchema.omit({ taskid: true});


export type State = {
  errors?: {
    
    name?: string[];
    description?: string[];
    duedate?: string[];
  };
  message?: string | null;
}
 
 export const SignupFormSchema = z.object({
  name: z
  .string()
  .min(1, { message: 'The name field is required.' })
  .trim(),
  email: z.string().min(1, { message: 'The email field is required.' }).email({ message: 'Please enter a valid email.' }).trim(),

  password: z
  .string()
  .min(1, { message: 'The password field is required.' })
  .min(6, { message: 'The password must be at least 6 characters long' })
  .trim()
  .refine((val)=>val===SignupFormSchema.password, {message: "The password field confirmation does not match"}),

  password_confirmation: z
  .string()
  .min(1, { message: 'The password confirmation field is required.' })
  .trim(), 
 
})
;

export type FormState =
| {
    errors?: {
      name?: string[]
      email?: string[]
      password?: string[]
      password_confirmation?: string[]
    }
    message?: string
  }
| undefined


export const LoginFormSchema = z.object({
 
 email: z.string().min(1, {message: 'The email field is required.'}).trim(),
 
  password: z
  .string()
  .min(1, { message: 'The password field is required.' }).trim(),
  
});

export const updateProfileInfoFormSchema=z.object({
  name: z
  .string()
  .min(1, { message: 'The name field is required.' })
  .trim(),
  email: z.string().min(1, { message: 'The email field is required.' }).email({ message: 'Please enter a valid email.' }).trim(),
})

  export type LoginFormState =
  | {
      errors?: {
        email?: string[]
        password?: string[]
      }
      message?: string
    }
  | undefined

  export type SessionPayload = {
    
  }
  | undefined;

  export type updateProfileInfoFormState =
| {
    errors?: {
      name?: string[]
      email?: string[]
     
    }
    message?: string
  }
| undefined

export type passwordUpdateFormState =
| {
    errors?: {
      currentPassword?: string[]
      newPassword?: string[]
      confirmPassword?: string[]
    }
    message?: string
  }
| undefined


export async function PasswordUpdateFormSchema() {
  const userData =await fetchUser();
const passwordUpdateFormSchema = z.object({
  currentPassword: z
  .string()
  .min(1, { message: 'The password field is required.' })
  .trim(),

  newPassword: z
  .string()
  .min(1, { message: 'The password field is required.' })
  .min(6, { message: 'The password must be at least 6 characters long' })
  .trim(),
  
  confirmPassword: z
  .string()
  .min(1, { message: 'The password confirmation field is required.' })
  .trim(), 
 
}).refine((data)=>data.newPassword===data.confirmPassword, {message: "The password field confirmation does not match", path: ["confirmPassword"]})
.refine((data)=> bcrypt.compare(data.currentPassword, userData.password), {message: "The current password field is not correct", path: ["currentPassword"]})

return passwordUpdateFormSchema;
}

export type deleteAccountFormState =
| {
    errors?: {
      password?: string[]
    }
    message?: string
  }
| undefined

export const deleteAccountFormSchema = z.object({
  
   password: z
   .string()
   .min(1, { message: 'The password field is required.' }).trim(),
   
 }).refine(async (data)=>bcrypt.compare(data.password, (await fetchUser()).password), {message: "The password is not correct", path: ["password"]});