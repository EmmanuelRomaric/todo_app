import { useFormState, useFormStatus } from "react-dom"
import { updateProfileInfo } from "../lib/actions"
import Link from "next/link"
import { Button } from "../ui/button"
import { fetchUser } from "../lib/data";
import DashboardMenu from "../ui/dashboard-menu";
import { DeleteAccount, UpdatePassword, UpdateProfileInfo } from "../ui/profile-forms";

export default async function Profile() {
    
    const userdata= await fetchUser();
    return(
    <div className ='m-4'>
        <DashboardMenu userName={userdata.name} userEmail={userdata.email}/>
        <UpdateProfileInfo />
        <UpdatePassword />
        <DeleteAccount />
    </div>
    )
}