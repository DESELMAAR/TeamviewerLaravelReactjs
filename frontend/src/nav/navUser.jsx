import { Link } from "react-router-dom";
import { UseStateContext } from "../context/ContextProvider";

export default function NavUser(){
  const {user,token,IsAdmin}=UseStateContext();
  // debugger
  if(token){
    const SoutNav={style:"my-2 block   py-1 font-semibold   text-white transition duration-200 hover:text-black/80 hover:ease-in-out focus:text-black/80 active:text-black/80 motion-reduce:transition-none text-gray-800 dark:hover:text-pink-900 dark:focus:text-red-900 dark:active:text-red-900 md:mx-2"}
    return (
      <nav  className= "sticky  top-0   NavColor   flex-no-wrap relative flex w-full items-center justify-between    	bg-black lg:flex-wrap lg:justify-start lg:py-4 font-medium  " >
        <div className="flex w-full flex-wrap items-center justify-between px-3 ">
          <button
            className="block border-0 bg-transparent px-2 text-black/50 hover:no-underline hover:shadow-none focus:no-underline focus:shadow-none focus:outline-none focus:ring-0 dark:text-neutral-200 lg:hidden"
            type="button"
            data-twe-collapse-init
            data-twe-target="#navbarSupportedContent1"
            aria-controls="navbarSupportedContent1"
            aria-expanded="false"
            aria-label="Toggle navigation">
            <span
              className="[&>svg]:w-7 [&>svg]:stroke-black/50 dark:[&>svg]:stroke-neutral-200">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor">
                <path
                  fill-rule="evenodd"
                  d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"
                  clip-rule="evenodd" />
              </svg>
            </span>
          </button>
      
          <div
            className="!visible hidden flex flex-wrap w-full justify-between  basis-[100%] items-center lg:!flex lg:basis-auto "
            id="navbarSupportedContent1"
            data-twe-collapse-item>
            <a
              className="mb-4 me-5 ms-2 mt-3 flex items-center text-neutral-900 hover:text-neutral-900 focus:text-neutral-900 dark:text-neutral-200 dark:hover:text-neutral-400 dark:focus:text-neutral-400 lg:mb-0 lg:mt-0"
              href="#">
              <img
                src="https://tecdn.b-cdn.net/img/logo/te-transparent-noshadows.webp"
                style={{ height: "15px" }}
                alt="TE Logo"
                loading="lazy" />
            </a>
            <ul
              className="list-style-none mx-auto flex flex-col ps-0 lg:flex-row"
              data-twe-navbar-nav-ref>
              <li className="mb-4 lg:mb-0 lg:pe-2" data-twe-nav-item-ref>
                <Link to="/homeuser"
                  className="text-black/60 transition duration-200 hover:text-black/80 hover:ease-in-out focus:text-black/80 active:text-black/80 motion-reduce:transition-none dark:text-white dark:hover:text-white/80 dark:focus:text-white/80 dark:active:text-white/80 lg:px-2"
                  href="#"
                  data-twe-nav-link-ref
                  >Dashboard</Link>
              </li>
              {/* ********************************************** */}
              <li className="mb-4 lg:mb-0 lg:pe-2" data-twe-nav-item-ref>
              <div class="mx-auto flex px-3   items-center justify-center  ">
    <div class="group relative cursor-pointer ">
 <div class="flex items-center justify-between mx-4 ">
            <Link to="/addorder" class="menu-hover  dark:text-white font-medium transition duration-200 hover:text-black/80 hover:ease-in-out focus:text-black/80 active:text-black/80 motion-reduce:transition-none dark:text-white dark:hover:text-white/80 dark:focus:text-white/80 dark:active:text-white/80  " >
            Add Order

  
            </Link>
          
        </div>
      

        
    </div>
</div>
              </li>
  
          
              <li className="mb-4 lg:mb-0 lg:pe-2" data-twe-nav-item-ref>
                <Link
                  className="text-black/60 transition duration-200 hover:text-black/80 hover:ease-in-out focus:text-black/80 active:text-black/80 motion-reduce:transition-none dark:text-white dark:hover:text-white/80 dark:focus:text-white/80 dark:active:text-white/80 lg:px-2"
                  href="#"
                  data-twe-nav-link-ref
                  >Contact</Link>
              </li>
            </ul>

         
          </div>
      
          
        </div>
      </nav>
          )
  }
  
}