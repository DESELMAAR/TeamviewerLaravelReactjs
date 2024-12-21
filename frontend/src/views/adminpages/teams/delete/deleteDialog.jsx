import React, { useState } from "react";
import axiosClient from "../../../../axios-client";

export default function DeleteDialog({handleResponseToParent,value,setLoading}){
    const [deleteResponse,setDeleteResponse]=useState(true)
    const deleteItem=()=>{
        axiosClient.delete(`/teams/${value.id}`).then(({data})=>{
            // console.log(data)
            setDialog(false)
            handleResponseToParent(true)

        }).catch(err=>{
            console.log(err)
        })
    }
    return (
        
        <div class="bg-tomato-200 border-green-600 text-red-800 border-l-4 p-4" role="alert">
{/* {console.log(value.id)} */}
                <p class="font-bold">
                    Are you sur to <strong className="text-red">delete</strong> this group ?
                </p>
                <div>
                <button onMouseOver={()=>{setDeleteResponse(true)}} onMouseLeave={()=>{setDeleteResponse(true)}}  onClick={deleteItem} className="detailsBtn">Yes</button>

                <button onClick={()=>{
                    handleResponseToParent(deleteResponse)

                }} className="editBtn">No</button>
                </div>
        </div>
    )
}