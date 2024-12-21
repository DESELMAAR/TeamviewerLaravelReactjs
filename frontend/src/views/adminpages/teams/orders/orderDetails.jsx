import { useParams } from "react-router-dom"
import React, { useEffect, useState } from "react"
import axiosClient from "../../../../axios-client"
import LoadingSpinnerMini from "../../../../components/commun_components/loadingSpinnerMini"
import LoadingSpinner from "../../../../components/commun_components/loadingSpinner"
import LoadingSpinnerBlack from "../../../../components/commun_components/loadingSpinnerBlack"
export default function OrderDetails(){
const [order,setOrder]=useState([])
const [loading,setLoading]=useState(false)
const id =useParams()
useEffect(()=>{
    setLoading(true)
axiosClient.get(`/orders/${id.id}`).then(({data})=>{
    // console.log(data)
    setOrder(data)
    setLoading(false)
}).catch(err=>{
    // console.log(err)
    setLoading(false)
})
},[])
    return (
            <div className="m-6 divteams p-4">
                <div className="p-4 bg-white">
                    <p className="text-3xl font-semibold mb-3">Order details</p>
                    <hr className="mb-5  border-gray-400"/>
                    {loading? <LoadingSpinnerBlack/>: <div className="cardOrder p-4 ">
                       <p className="text-emerald-700 font-semibold text-3xl mb-2">{order.order_name}</p>
                       
                       <div className="bg-slate-200 p-4 rounded-0 mb-3">
                       <p className="text-red-800  text-xl mb-2"><strong>Order id :</strong>  {order.order_id}</p>
                        <p><strong>Costumer :</strong>   {order.costumer_name}</p>
                        <p><strong>Costumer Account :</strong>  {order.costumer_account}</p>
                       </div>
                       <div className="">
                       <p><strong>Status :</strong> <p className="border-b-2 border-green-700 text-green-500 inline-block">{order.status}</p> </p>

                        <p><strong>Agent Name :</strong>  {order.agent_name}</p>

                       </div>
                    </div>}
                   
                    
                </div>
            
            </div>
    )
}