import { useEffect, useState } from "react";
import { UseStateContext } from "../../context/ContextProvider"
import axiosClient from "../../axios-client";
import MoreInfos from "./moreInfos";
import LoadingSpinner from "./loadingSpinner";

export default function LeftSide(){
    const {user,token,setUser,loading,setToken,moreInfos,setMoreInfos}=UseStateContext();
    const [users,setUsers]=useState("");
    useEffect(()=>{
        getUser();
    },[])
    const getUser=()=>{
        axiosClient.get("/user").then(({data})=>{
            setUser(data)
        })
    }

    const moreInfoss2=()=>{
        setMoreInfos(true)
    }

    return (
        <>
          <div class="py-8  userinfo  px-8 max-w-sm mx-auto  mt-2 bg-white backdrop-blur w-80  space-y-2 sm:py-4  sm:space-y-0 sm:space-x-6">
            <div className="sm:flex sm:items-center gap-3 mb-4">
            <img class="block mx-auto h-20 rounded-full sm:mx-0 sm:shrink-0" src="https://tailwindcss.com/img/erin-lindford.jpg" alt="Woman's Face"/>
            <div class="text-center space-y-2 sm:text-left">
                <div className="space-y-0.5 ">
                    <p class="UserInfoLeftMenu_name">
                    {(user.name)}
                    </p>
                    <p class="UserInfoLeftMenu_post">
                    {(user.Post)}
                    </p>
                </div> 
                {!moreInfos? <button onClick={moreInfoss2} className="leftMenuBtn">More Infos</button>:""}
            </div>

          </div>
    {moreInfos? <div ><hr />
      <MoreInfos/>
        </div>:""}

    
</div>

        </>
  
    )
}