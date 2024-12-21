import React, { useRef } from "react";
import axiosClient from "../../../axios-client";

export default function ModalForm({setOpenModal}){
   const fullnameRef=useRef();
   const usernameRef=useRef();
   const passwordRef=useRef();
   const dateRef=useRef();
   const postRef=useRef();
   const teamRef=useRef();


   
    const Submit=(e)=>{
        e.preventDefault();
        const Employee_Name = fullnameRef.current.value;
        const User_Name = usernameRef.current.value;
        const Password = passwordRef.current.value;
       const  Date = dateRef.current.value;
       const  Post = postRef.current.value;
       const  Team = teamRef.current.value;

       const payload ={
        Employee_Name,User_Name,Password,Date,Post,Team
       }
// console.log(payload)
        axiosClient.post('/add_Emp',payload).then((data)=>{
            // console.log(data)
        })

    }
    return (
        <div class="flex items-center justify-center fixed mx-auto ">
            
            <div class="mx-auto w-full max-w-[550px] bg-white">
            <h1 className="text-4xl mb-6 text-center font-semibold ">Add a new Employee</h1>
                <form onClick={Submit}>
                    <div class="mb-5">
                    <span className="text-red-700 float-right cursor-pointer" onClick={()=>{setOpenModal(false)}}>X</span>
                        <label for="name" class=" block text-base font-medium text-[#07074D]">
                            Full Name
                        </label>
                        <input ref={fullnameRef} type="text" name="Employee_Name" id="Employee_Name" placeholder="Full Name"
                            class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
                    </div>
                    <div class="mb-5">
                        <label for="phone" class=" block text-base font-medium text-[#07074D]">
                            User Name
                        </label>
                        <input ref={usernameRef} type="text" name="User_Name" id="User_Name" placeholder="User name"
                            class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
                    </div>
                    <div class="">
                        <label for="email" class=" block text-base font-medium text-[#07074D]">
                            Password
                        </label>
                        <input ref={passwordRef} type="password" name="Password" id="Password1" placeholder="Password"
                            class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
                    </div>
                    <div class="-mx-3 flex flex-wrap">
                        <div class="w-full px-3 sm:w-1/2">
                            <div class="">
                                <label for="date" class=" block text-base font-medium text-[#07074D]">
                                    Date
                                </label>
                                <input ref={dateRef} type="date" name="Date" id="Date1"
                                    class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
                            </div>
                        </div>
                        <div class="w-full px-3 sm:w-1/2">
                            <div class="">
                                <label for="time" class=" block text-base font-medium text-[#07074D]">
                                    Post
                                </label>
                                <input ref={postRef} placeholder="Post" type="text" name="Post" id="Post1"
                                    class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
                            </div>
                        </div>
                    </div>

                    <div class="">
                                <label for="date" class=" block text-base font-medium text-[#07074D]">
                                    Choose Team
                                </label>
                                <select ref={teamRef} type="date" name="Post" id="Post"
                                    class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" >
                                        <option value="1">team 1</option>
                                        <option value="1">team 1</option>
                                        <option value="1">team 1</option>

                                </select>
                            </div>

                    <div className="flex gap-2 mt-5">
                        <button
                            class="hover:shadow-form w-full rounded-md bg-blue-500 py-3 px-8 text-center text-base font-semibold text-white outline-none">
                            Submit
                        </button>
                        <button onClick={()=>{setOpenModal(false)}}
                            class="hover:shadow-form w-full rounded-md bg-red-700 py-3 px-8 text-center text-base font-semibold text-white outline-none">
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}