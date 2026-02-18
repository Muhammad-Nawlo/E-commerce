import {Search} from "lucide-react";

export default function SearchBar() {
    return (
        <div className='hidden sm:flex items-center gap-2 rounded-md ring-1 ring-gray-200 px-2 py-1 shadow-md'>
            <Search className='w-4 h-4 text-gray-200'/>
            <input type="text" id='search' className='text-sm outline-0' placeholder='Search...'/>
        </div>
    );
}