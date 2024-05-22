import Image from "next/image";
import Link from "next/link";

export default function AppLogo() {
    return (
        <div className="flex justify-center sm:justify-normal">
            <Link href={"/"} className="flex items-center">
                        <div className='mx-2'>
                             <Image className=""
                                  src="/todo-svgrepo-com.svg"
                                  height={48}
                                  width={48}
                                  alt="Applivation logo"
                             />
                        </div>
                        <div className='text-xl'>
                        todoapp
                        </div>
                   </Link>
        </div>
    );
}