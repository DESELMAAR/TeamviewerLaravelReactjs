import React from "react";
// import {motion} from 'framer-motion';
// import { animated } from '@react-spring/web'
import Nav from "../nav/nav";
import LeftMenu from "../components/commun_components/LeftMenu";
import { Link, Navigate, Outlet } from "react-router-dom";
import { UseStateContext } from "../context/ContextProvider";
import InfoLogout from "../components/commun_components/info_logout";
import LeftSide from "../components/commun_components/leftsideuserInfo";
import LoadingSpinner from "../components/commun_components/loadingSpinner";
import NavAdmin from "../nav/nav";

export default function AdminLayout(){
    
    const {user,token,setUser,setToken,loading,notification,setNotification,setLoading,IsAdmin}= UseStateContext();
    console.log(IsAdmin)
    // debugger;
    if(!token ){
        return <Navigate to="/login"/>
    }else if(token &&  user.IsAdmin==0){
        return <Navigate to="/homeuser"/>

    }

    const closeAlert =(e)=>{
        e.preventDefault()
        setNotification("")
            }
    return(
        <> 
                

        {loading && <LoadingSpinner/>}
        {!loading &&   <>
        
        <InfoLogout/>
           <NavAdmin/>
           <div className=" flex layoutAdminBody">
                <aside className=" pt-4 pl-4">
                    <LeftSide/>
                    <LeftMenu/>
                </aside>
                <main className="w-3/4 ">
                {notification &&  <div className="flex items-center w-200 m-10 bg-blue-500  text-white text-lg font-bold px-4 py-3" role="alert" 
                >
                    <button onClick={closeAlert} className="text-red-950" >x</button>
                    <svg class="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M12.432 0c1.34 0 2.01.912 2.01 1.957 0 1.305-1.164 2.512-2.679 2.512-1.269 0-2.009-.75-1.974-1.99C9.789 1.436 10.67 0 12.432 0zM8.309 20c-1.058 0-1.833-.652-1.093-3.524l1.214-5.092c.211-.814.246-1.141 0-1.141-.317 0-1.689.562-2.502 1.117l-.528-.88c2.572-2.186 5.531-3.467 6.801-3.467 1.057 0 1.233 1.273.705 3.23l-1.391 5.352c-.246.945-.141 1.271.106 1.271.317 0 1.357-.392 2.379-1.207l.6.814C12.098 19.02 9.365 20 8.309 20z"/></svg>
                    <p>{notification}</p>

                   
             </div>}
                    <Outlet/>

                   
                </main>
           
           </div>
        </>}
      
          
               
        </>
    )
}