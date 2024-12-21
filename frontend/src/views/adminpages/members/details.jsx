import { Link, useParams } from "react-router-dom"
import axiosClient from "../../../axios-client"
import { useEffect, useState } from "react"
import LoadingSpinner from "../../../components/commun_components/loadingSpinner";

export default function Details(){
    const [users,setUsers]=useState([]);
    const [loading,setLoading]=useState(false)
    const {id}=useParams()
    useEffect(()=>{
            setLoading(true);
        axiosClient.get(`/users/${id}`).then(({data})=>{
            // console.log(data)
            setUsers(data)
         setLoading(false)
        }).catch((err)=>{
            console.log(err)
            setUsers(data)
        })
    },[])
    return (

        <div className=" m-6">
  
                     {loading?  <LoadingSpinner/>:  <>
                     <p className="title_of_page">User Details :</p>
                     <hr className="mb-5  border-gray-400"/>
                                 <div class=" flex items-center justify-center  p-4">
                                    
                                  <div class=" bg-blue-50  -2 p-8 max-w-2xl w-full neon-border">
                                     
                                      <h2 class="text-xl font-bold text-center  mb-2 neon-text">{users.name}</h2>
                                      <p class="text-center text-pink-300 mb-4"></p>
                                      <div class="border-t border-blue-500 pt-4 space-y-2">
                                      <p class="text-black"><span class="font-semibold text-blue-700">Address email:</span> {users.email}</p>
                                          <p class="text-black"><span class="font-semibold text-blue-700">Date of Entry:</span> {users.created_at}</p>
                                          <p class="text-black"><span class="font-semibold text-blue-700">Team:</span>{users.team? users.team.name:"No team yet !"}</p>
                                          <p class="text-black"><span class="font-semibold text-blue-700">Post:</span> {users.Post}</p>
                                          <p class="text-black"><span class="font-semibold text-blue-700">Status:</span> {!users.IsAdmin ==1 ? "User":"Administrator"}</p>
                                      </div>
                                      <div class="mt-6 flex justify-center space-x-4">
                                          <Link to={"/members/"+ users.id} class="px-4 py-1  text-sm text-purple-600  font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2">
                                              Modify
                                          </Link>
                                          <Link class="px-4 py-1  text-sm text-red-600  font-semibold rounded-full border border-red-600 hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2">
                                              Delete
                                          </Link>
                                      </div>
                                  </div>
                                 </div>
                     </>}
                   
                   
               
 
        </div>
    )
}