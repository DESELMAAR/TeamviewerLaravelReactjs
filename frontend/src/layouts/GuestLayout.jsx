import React from "react"
import { Navigate, Outlet } from "react-router-dom"
import Nav from "../nav/nav"
import { UseStateContext } from "../context/ContextProvider"

export default function GuestLayout(){
    const {user,token,IsAdmin}=UseStateContext();
    if(token && IsAdmin==1){
   
      return (<Navigate to="/homeadmin"/>)
     
    }else if(token && IsAdmin==0){
      return (<Navigate to="/homeuser"/>)

    }
    return(
        <>
           <Nav/>
           <div className="mt-10 ">
           <Outlet className="text-white"/>

           </div>
        </>
    )
}