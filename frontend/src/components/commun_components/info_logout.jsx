import { UseStateContext } from "../../context/ContextProvider"; 
import axiosClient from "../../axios-client";
import React from "react";
import { Link } from "react-router-dom";

export default function InfoLogout(){
    const onLogout=(e)=>{
        e.preventDefault();
        axiosClient.post("/logout").then(({})=>{
            setUser(null)
            setToken(null)
            localStorage.clear()
        })
    }
    const {user,token,setUser,setToken}=UseStateContext();
    return(
        <div className={user.IsAdmin==1? "bg-black px-8":" px-8"}>
            <div className="flex justify-between">
            <div><span>{user.IsAdmin==1? <span className="font-semibold text-slate-200">Administrator</span> :<span className="font-semibold text-slate-200">User</span>}</span></div>
            <div className="text-slate-200">Welcome home Mr. <strong className="mr-5 text-slate-300">{user.name} </strong><Link className="text-red" onClick={onLogout}>Logout</Link></div>
            </div>
            </div>
    )
}