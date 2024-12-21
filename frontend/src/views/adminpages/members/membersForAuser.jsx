import React from "react";

export default function MembersForAuser({teamForMemberss}){
    
    return (
        <div className="cover_main m-6">
{/* {console.log(teamForMemberss)} */}
<div>
<p className="title_of_page m-4">List of members</p>
<hr className="mb-5  border-gray-500"/>

<div className="grid grid-cols-2 lg:grid-cols-3 sm:grid-cols-1  gap-3 p-4">

    {teamForMemberss.map((teamForMember,key)=>{
       return (
        <>
        <p className={"list_members p-3 bg-cyan-800 text-white text-center font-bold text-3xl hover:bg-cyan-700 transition-all duration-500 cursor-pointer"} key={key}>{teamForMember.name}</p>
        </>
       
       )
    })}
</div>
</div>

        </div>
    )
}