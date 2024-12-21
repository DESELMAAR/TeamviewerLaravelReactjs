import React, { useRef, useState } from "react";
// import axiosClient from "../../../../axios-client";
import axiosClient from "../../../axios-client";
import { Navigate, redirect, useNavigate } from "react-router-dom";
// import Results from "../../Results";
// import { UseStateContext } from "../../../../context/ContextProvider";
import { UseStateContext } from "../../../context/ContextProvider"; 
import ServicesList from "../../../components/commun_components/serviceList";

export default function AddOrderUser(){
    const {user}=UseStateContext()
    const OrderIdValue=useRef('');
    const OrderNameValue=useRef('');
    const CostumerNameValue=useRef('');
    const CostumerAccountValue=useRef('');
    // const AgentNameValue=useRef("");
    const StatusValue=useRef('');
    const ServiceValue=useRef('');
    const navigate=useNavigate();
    const [loading,setLoading]=useState(false);
    const [error,setErrors]=useState([])
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
        Service
    }
console.log(order_id,order_name,costumer_name,costumer_account,agent_name,status,agent_id,Service)
setLoading(true)
axiosClient.post("/orders",payload).then(({data})=>{
    // console.log(data)
    if(!data.error){
        // setErrors(data.error.errorInfo)
        navigate('/results')   
    }
    setLoading(false)
}).catch(err=>{
    // console.log(err)
    setLoading(false)

})
}
    return(
        <>
        {/* {error ? console.log(error):""} */}
        {loading? <p className="m-6 text-slate-100">Saving ...</p>:    
        
        <div className="m-6 divteams  p-6 ">
            <p className="title_of_page">Add A new Order</p>
            <hr className="mb-5  border-cyan-500"/>
             <div className="p-14 bg-card w-fit ">
                 <form action=""  onSubmit={Submit}>
                    <div className="main_form_add_order">
                        <div className="formtoadd formdesign">
                            <input ref={OrderIdValue} placeholder="Order id"  id="order_id"  name="order_id" type="text" />
                            <input ref={OrderNameValue} placeholder="Order name" id="order_name" name="order_name" type="text" />
                            <input ref={CostumerNameValue} placeholder="Costumer name" id="costumer_name" name="costumer_name"  type="text" />
                            <input ref={CostumerAccountValue} placeholder="Costumer account" id="costumer_account" name="costumer_account"  type="text" />
                            
                        </div>
                        <div className="formtoadd formdesign">
                        <input ref={StatusValue} placeholder="Status"  id="status" name="status" type="text" />
                            <select ref={ServiceValue} className="" name="" id="">
                                 <ServicesList/>
                            </select><br /> <br />

                        <button className="addBtn" type="submit">Submit</button>

                        </div>

                       
                    </div>
             
                
                 </form>
             </div>
             </div>
             }
          
            
       
        </>
     
    )
}