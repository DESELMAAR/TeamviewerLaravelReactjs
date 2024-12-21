import React from "react"
import Nav from "../nav/nav"
import { Navigate, Outlet } from "react-router-dom"
import { UseStateContext } from "../context/ContextProvider"
import InfoLogout from "../components/commun_components/info_logout"
import LeftSide from "../components/commun_components/leftsideuserInfo"
import LeftMenu from "../components/commun_components/LeftMenu";
import NavAdmin from "../nav/nav"
import NavUser from "../nav/navUser"

export default function UserLayout(){
    const {token,IsAdmin,user,loading}=UseStateContext()
    if(!token){
        return <Navigate to="/login"/>
    }else if(token && user.IsAdmin==1){
        return <Navigate to="/homeadmin"/>

    }
    return(
        <> 
                {/* {console.log("fron userlayoutu",user)}



                {console.log("from userlayoutu",IsAdmin)} */}


        {loading && <LoadingSpinner/>}
        {!loading &&   <>
        
        <InfoLogout/>
           <NavUser/>
           <div className="main flex">
                <aside className=" pt-4 pl-4">
                    <LeftSide/>
                    <LeftMenu/>
                </aside>
                <main className="w-3/4 ">
                    <Outlet/>
                </main>
           
           </div>
        </>}
      
          
               
        </>
    )
}