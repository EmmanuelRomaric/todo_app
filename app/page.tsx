import Link from "next/link";
import AppLogo from "./ui/app-logo";

export default async function Home() {

    return (
     <div className="flex flex-col gap-4 sm:grid grid-cols-7 gap-4">
          
               <div className="col-span-5">
                    <AppLogo />
               </div>

               <div className=" flex justify-center items-center">
               <Link href={'/login'} className="hover:text-gray-600">
                    Log in
               </Link>
               </div>
          
               <div className="flex justify-center items-center">
                    <Link href={'/signup'} className="hover:text-gray-600">
                         Sign up
                    </Link>
               </div>
     </div>
        )
      }
        