import React, { useRef, useState } from "react"
import { Link } from "react-router-dom"
import axiosClient from "../axios-client";
import { UseStateContext } from "../context/ContextProvider";
export default function Register(){
    const nameRef=useRef();
    const emailRef=useRef();
    const passwordRef=useRef();

    const password_confirmationRef=useRef();
    const {setUser,setToken}=UseStateContext();


const Submit =(e)=>{
    e.preventDefault();
   
    const name= nameRef.current.value;
    const email=emailRef.current.value;
    const password= passwordRef.current.value;
    const passwordConfirmation= password_confirmationRef.current.value;
   


    const payload=({name,email,password,passwordConfirmation});

     axiosClient.post("register",payload).then(({data})=>{
         setUser(data.user);
         setToken(data.token);
        //  console.log(data);
     }).catch(err=>{
         const response=err.response;
         if(response && response.status===422){
            //  console.log(response.data.errors)
         }
     });
}
    return(
        <>
                <form className="mx-auto w-96 NavColor"  onSubmit={Submit} encType="multipart/form-data" >
                    <div className="space-y-12 w-96 mx-auto	 p-7 register	rounded-md	">
                        <div className=" border-gray-900/10 pb-12">
                        <h1 className="text-xl font-bold leading-7 text-slate-200 text-center	mb-6">Register a new account</h1>                   
                            <div className="sm:col-span-4">
                                <div className="mt-4">
                                    <input  ref={nameRef}  placeholder="Name" id="name" name="name" type="text" autoComplete="false" className="block outline-0	 bg-inherit rounded-none w-full rounded-md border-0 pl-3 py-1.5 text-white	 shadow-sm ring-1 ring-inset  placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>                    
                                </div>              
                                <div className="mt-4">
                                    <input ref={emailRef}   placeholder="Email address" id="email" name="email" type="email" autoComplete="false" className="block bg-inherit outline-0	 rounded-none w-full rounded-md border-0 pl-3 py-1.5 text-white	 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>                      
                                </div>
                                <div className="mt-4">
                                    <input ref={passwordRef}    placeholder="Password" id="password" name="email" type="password" autoComplete="false" className="block outline-0	 bg-inherit rounded-none w-full rounded-md border-0 pl-3 py-1.5 text-white	 shadow-sm ring-1 ring-inset  placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>               
                                </div>
                                <div className="mt-4">
                                    <input ref={password_confirmationRef}    placeholder="Password Confirmation" id="passwordconf" name="email" type="password" autoComplete="false" className="block outline-0	 bg-inherit rounded-none w-full rounded-md border-0 pl-3 py-1.5 text-white	 shadow-sm ring-1 ring-inset  placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>               
                                </div>
                             
                                <div className="mt-6">
                                <button type="submit" className="bg-purple-600 text-slate-200 py-1.5 font-bold	block w-full">Register</button>       
                                </div>
                                <div className="mt-4">
                                <p className="text-slate-200"> Already Have An Account ? <Link to="/login"><strong>Connect now</strong></Link></p>   
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
        </>
    )
}