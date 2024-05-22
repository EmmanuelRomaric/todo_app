import { PowerIcon } from '@heroicons/react/24/outline';
import { logout } from '../lib/actions';

 
export default function Logout() {
  return (
   
    <form className=''
    action={logout}
  >
          <button type="submit" className="flex h-[48px] w-full grow items-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
            <PowerIcon className="w-6" />
            <div className="">Sign Out</div>
          </button>
        </form>
      
  );
}