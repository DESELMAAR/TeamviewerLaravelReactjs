
import React, { useEffect, useRef } from "react";
import { useState } from "react";
// import axiosClient from "../../../axios-client";
import axiosClient from "../../axios-client";

export default function ServicesList(){
  const [services,setServices]=useState([])
const GetService=()=>{
  axiosClient.get("/services").then(({data})=>{
    if(data.data){
        setServices(data.data)
    }
    console.log(data.data)
   }).catch(err=>{
    console.log(err)

  })
}

  useEffect(()=>{
        GetService();
     },[])
  
    return(
      <>
     
      {services.map((service,key)=>{
         return (<option key={key} value={service.id}>{service.Service}</option> )

      })}
 
      
      </>

      
       
    )
}