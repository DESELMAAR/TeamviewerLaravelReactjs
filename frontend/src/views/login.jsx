import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../axios-client";
import { UseStateContext } from "../context/ContextProvider";
import LoadingSpinner from "../components/commun_components/loadingSpinner";

export default function Login(){
    const {setUser,user,setToken,setIsAdmin}=UseStateContext();
    const [loading,setLoading]=useState(false);
    const emailRef=useRef();
    const passwordRef=useRef();
const Submit =(e)=>{
    e.preventDefault();
    setLoading(true)
    const email=emailRef.current.value;
    const password= passwordRef.current.value;
    const payload={email,password}
    
        setLoading(true)
        axiosClient.post
          ("/login",payload).then((data)=>{
            if(data.data){
                // console.log(data)
                setUser(data.data.user)
                setToken(data.data.token)
                localStorage.setItem("user",data.data.user.id)
                localStorage.setItem("IsAdmin",data.data.user.IsAdmin)
            }
            // console.log(data.data.user.IsAdmin)
            setIsAdmin(data.data.user.IsAdmin)
            
        })
        // ("/login", { username: "a@a.a", password: "a" })
        // .then((resp) => {
        //   console.log("Login successful:", resp.data);
        // })
        // .catch((error) => {
        //   if (error.response) {
        //     console.error("Error response:", error.response);
        //   } else {
        //     console.error("Network or server error:", error.message);
        //   }
        // });
        
        
      

    setLoading(false)
}

    return(
        <>
      {loading? <LoadingSpinner/> :   <form className="mx-auto" onSubmit={Submit}>
                    <div className="space-y-12 w-80 mx-auto	 p-7 bg-slate-800	rounded-md	">
                        <div className=" border-gray-900/10 pb-12">
                        <h1 className="text-xl font-bold leading-7 text-slate-200 text-center mb-6	">Login to your account</h1>
                            <div className="sm:col-span-4">
                                <div className="mt-2">
                                    <input  placeholder="Email address" id="email" ref={emailRef} name="email" type="email" autoComplete="false" className="block outline-0 text-white bg-inherit rounded-none w-full rounded-md border-0 pl-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset  placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                                    
                                   
                                </div>
                                <div className="mt-2">
                                    <input  placeholder="Password" id="password" name="email" ref={passwordRef} type="password" autoComplete="false" className="block outline-0 text-white bg-inherit rounded-none w-full rounded-md border-0 pl-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset  placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                                </div>
                                <div className="mt-2">
                                <button type="submit" className="bg-purple-600 text-slate-200 py-1.5 font-bold	block w-full">Login</button>
                                </div>
                                <div className="mt-4">
                                <p className="text-slate-200"> Not registred ? <Link to="/register"><strong>Create new account</strong></Link></p>  
                                </div>
                            </div>
                        </div>
                    </div>
                </form>}
             
                
        </>
    )
}