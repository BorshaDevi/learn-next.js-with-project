import { Input } from "@/components/ui/input";
import { CiSearch } from "react-icons/ci";
const Header=()=>{
    return(
          <div className="fixed top-0 left-0 right-0 bg-yellow-100  z-50">
          <div className="border-b">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
               <div className="flex items-center justify-between h-16">
                <div className="flex items-center">
                    <h1 className="text-2xl cursor-pointer font-bold font-serif tracking-tight">
                      <span className="bg-black rounded-full text-white px-2 py-1  border border-yellow-500">
                        M
                      </span>
                      <span className="ml-1">
                        Marg Ltd
                      </span>
                    </h1>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="relative hidden md:block ">
                     <Input
                      type="text"
                     placeholder="Search blogs..."
                     className="w-full h-10 px-4 py-2 border border-gray-100 bg-white rounded-md focus:outline-none focus:ring focus:border-yellow-200"
                     />
                     <CiSearch className=""/>
                  </div>

                </div>
               </div>
            </div>
          </div>
          </div>
    )
}
export default Header;