import React, { useEffect, useRef, useState } from "react";
import axiosClient from "../../axios-client";
import LoadingSpinner from "../../components/commun_components/loadingSpinner";
import LoadingSpinnerMini from "../../components/commun_components/loadingSpinnerMini";
import { UseStateContext } from "../../context/ContextProvider";
import { Link } from "react-router-dom";
import Pagination from "../adminpages/pagination";
import AlertDeleteError from "../adminpages/alertDeleteError";

export default function homeUser(){

  const getUserId=localStorage.getItem("user");
    const getOrder0=()=>{
        console.log(getUserId)
          axiosClient.get(`/orders_user/${getUserId}`).then(({data})=>{
            // console.log(data.data)
            setOrders(data.data)
      
          }).catch(err=>{
            // console.log(err)
          })
      }
useEffect(()=>{
  getOrder0()
},[])
  return (
    <div className="m-6">
       <p className="text-slate-200 text-2xl mb-9">welcome to your user Account , Here you find all about your orders !</p>
       <Link to="/resultuser" className="mt-10 addBtn">Results</Link>

    </div>
  )
}