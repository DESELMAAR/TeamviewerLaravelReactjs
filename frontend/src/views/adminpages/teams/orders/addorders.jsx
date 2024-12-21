import React, { useRef, useState,useEffect } from "react";
import axiosClient from "../../../../axios-client";
import { Navigate, redirect, useNavigate } from "react-router-dom";
// import Results from "../../Results";
import { UseStateContext } from "../../../../context/ContextProvider";
import LoadingSpinnerMini from "../../../../components/commun_components/loadingSpinnerMini";
// import ServicesList from "../../../../components/commun_components/serviceList"

export default function AddOrderadmin(){
    const [services,setServices]=useState([])

    const {user}=UseStateContext()
    const OrderIdValue=useRef('');
    const OrderNameValue=useRef('');
    const CostumerNameValue=useRef('');
    const CostumerAccountValue=useRef('');
    const ServiceValue=useRef('');
    // const AgentNameValue=useRef("");
    const StatusValue=useRef('');
    const navigate=useNavigate();
    const [loading,setLoading]=useState(false);
    const [error,setErrors]=useState([]);
const Submit=(e)=>{
    e.preventDefault();
    const order_id=OrderIdValue.current.value;
    const order_name=OrderNameValue.current.value;
    const costumer_name=CostumerNameValue.current.value;
    const costumer_account=CostumerAccountValue.current.value;
    const agent_name=user.name;
    const status=StatusValue.current.value;
    const agent_id=user.id;
    const Service=ServiceValue.current.value;

    const payload={
        order_id,
        order_name,
        costumer_name,
        costumer_account,
        agent_name,
        status,
        agent_id,
        Service}
// console.log(payload)
setLoading(true)
axiosClient.post("/orders",payload).then(({data})=>{
    // console.log(data)
    if(!data.error){
        navigate('/results')   
    }
    setLoading(false)
}).catch(err=>{
    // console.log(err)
    setLoading(false)

})
}
const GetService=()=>{
    axiosClient.get("/services").then(({data})=>{
        if(data.data){
            setServices(data.data)

        }
    //   console.log(data.data)
     }).catch(err=>{
      console.log(err)
  
    })
  }
  
//   debugger
  
    useEffect(()=>{
          GetService();
       },[])

    return(
        <>
        {loading? <p className="m-6 text-slate-100"><LoadingSpinnerMini/></p>:    
        
        <div className="m-6 divteams  p-6 ">
            <p className="title_of_page">Add new Order</p>
            <hr className="mb-5  border-gray-400"/>
             <div className="p-14 bg-card w-fit ">
                 <form action=""  onSubmit={Submit}>
                  
                 <div className="grid grid-cols-2 gap-7">
                  
                 <div className="formtoadd formdesign">
                 <input ref={OrderIdValue} placeholder="Order id"  id="order_id"  name="order_id" type="text" />
                 <input ref={OrderNameValue} placeholder="Order name" id="order_name" name="order_name" type="text" />
                 <input ref={CostumerNameValue} placeholder="Costumer name" id="costumer_name" name="costumer_name"  type="text" />
                 <input ref={CostumerAccountValue} placeholder="Costumer account" id="costumer_account" name="costumer_account"  type="text" />
                 <input ref={StatusValue} placeholder="Status"  id="status" name="status" type="text" />
                 </div>
                 <div className="mr-4 addorderAdmin ">
                    <label htmlFor="service_choice" className="text-slate-200 text-lg ">Choose Product</label><br />
                   <select ref={ServiceValue} name="service_choice"  id="service_choice" className="bg-cyan-600 mt-2 service_choice ">

                    {services.map((service,key)=>{
                       return (<option key={key} value={service.id}>{service.Service}</option> )

                    })}
                    </select><br />
                    <button className="addBtn mt-4" type="submit">Submit</button>
                    </div>
                   
                 </div>
                 

                 </form>
             </div>
        
             </div>
             }
          
            
       
        </>
     
    )
}