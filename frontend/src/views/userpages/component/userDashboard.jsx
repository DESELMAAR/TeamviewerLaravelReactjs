import React, { useEffect, useRef, useState } from "react";
import axiosClient from "../../../axios-client";
import LoadingSpinner from "../../../components/commun_components/loadingSpinner";
import LoadingSpinnerMini from "../../../components/commun_components/loadingSpinnerMini";
import { UseStateContext } from "../../../context/ContextProvider";
import { Link } from "react-router-dom";
import Pagination from "../../adminpages/pagination";
import AlertDeleteError from "../../adminpages/alertDeleteError";

export default function ResultsUser(){
  const [orders,setOrders]=useState([]);
  const [loading,setLoading]=useState(false);

  const [errorData,setErrorData]=useState([])
  
  const [alert,setAlert]=useState(false)
  const {user,IsAdmin}=UseStateContext()

  // pagination 
  const [allData,setAllData]=useState([]);
  const [currentPage,setCurrentPage]=useState(1);
  const [itemPerPage,setItemPerPage]=useState(5);


  const lastPostIndex=currentPage * itemPerPage;
  const firstPostIndex=lastPostIndex - itemPerPage;
  const currentPosts=orders.slice(firstPostIndex,lastPostIndex);
const getUserId=localStorage.getItem("user");
    const getOrder0=()=>{
       console.log(user.IsAdmin)
        console.log(getUserId)
        setLoading(true);
          axiosClient.get(`/orders_user/${getUserId}`).then(({data})=>{
            // console.log(data.data)
            setOrders(data.data)
            setLoading(false)
      
          }).catch(err=>{
            // console.log(err)
            setLoading(false)
          })
      }



const getOrderDeleteLoading=()=>{
  if(!getUserId===null){
    axiosClient.get(`/orders_user/${getUserId}`).then(({data})=>{
      // console.log(data.data)
      setOrders(data.data)

    }).catch(err=>{
      // console.log(err)
    })
  } 
}
const getOrder=(value,choiceFilter)=>{
    axiosClient.get(`/orders_user/${getUserId}`).then(({data})=>{
   
      const resultAfterFilter=(data.data).filter((item)=>{
        const choice=(choiceFilter.current.value)

        switch (choice){
          case "orderId":
              return(
                  item.order_id.toLowerCase().includes((value.current.value).trim().toLowerCase())
               );
          case "cotumerName":
              return(
                      item.costumer_name.toLowerCase().includes((value.current.value).trim().toLowerCase())
                );
          case "costumerAccount":
              return(
                      item.costumer_account.toLowerCase().includes((value.current.value).trim().toLowerCase())
                   );
          case "orderName":
              return(
                      item.order_name.toLowerCase().includes((value.current.value).trim().toLowerCase())
                   );
          default:
              return(
                  item.order_id.toLowerCase().includes((value.current.value).trim().toLowerCase())
               );         
      }
    })
      setOrders(resultAfterFilter)
    }).catch(err=>{
      // console.log(err)
    })
}
  useEffect(()=>{
    getOrder0();
    // console.log(user.id)
    if(user.id){
        localStorage.setItem('user',user.id)
    }
    if(IsAdmin){
        localStorage.setItem('IsAdmin',IsAdmin)
    }


  },[])

  const [deleteLoading,setDeleteLoading]=useState(false)
  const handleDelete=(e)=>{
    // console.log("deleting")
    setDeleteLoading(true)
    axiosClient.delete(`/orders/${e}`).then(({data})=>{
      // console.log(data)
      // if(data)
      setErrorData(data)
      setAlert(true)

      // console.log(alert)
      setDeleteLoading(false)
      getOrderDeleteLoading();
    }).catch(err=>{

      console.log(err)
      setDeleteLoading(false)
    })
  }
const inputSearch=useRef('')
const inputChoice=useRef('')
  const handleSearch= (e)=>{
    e.preventDefault()
// console.log(e)
getOrder(inputSearch,inputChoice)
  }

    return(
      <div className="m-6 divteams ">
{/* {console.log(IsAdmin)} */}
        <div className="p-4">
             <div className="flex justify-between">
                               <p className="title_of_page ">Results section</p>

                                <div className="  ">
                                    <form className={"form_search flex content-center"} onSubmit={handleSearch}>
                                              <select ref={inputChoice} className={"selectFilter"} name="" id="">
                                                  <option value="">Filter by</option>
                                                  <option value="orderId">Order id</option>
                                                  <option value="orderName">Order name</option>
                                                  <option value="cotumerName">Cotumer Name</option>
                                                  <option value="costumerAccount">Account</option>

                                              </select>
                                        <div className="flex content-center align-middle div_input_search">
                                        <input ref={inputSearch} type="text"  placeholder="Search..."/>
                                        </div>
                                        <button type="submit"><i class="fa-solid fa-magnifying-glass"></i> </button>                        
                                    </form>
                                </div>

                            </div>
             <hr className="mb-5  border-gray-600"/>
             {alert && <AlertDeleteError errorData={errorData} setAlert={setAlert} />}

             <div>
             {loading? <LoadingSpinner />:   
             
             <table className="min-w-full">
                <thead>
                <tr className="table_head text-center text-xs md:text-sm font-thin ">
                    <th className="p-0">
                    <span className="block py-2 px-3">ID</span>
                    </th>
                    <th className="p-0">
                    <span className="block py-2 px-3">Order note</span>
                    </th>
                    <th className="p-0">
                    <span className="block py-2 px-3">Service</span>
                    </th>
                    <th className="p-0">
                    <span className="block py-2 px-3  ">Costumer Name</span>
                    </th>
                    <th className="p-0">
                    <span className="block py-2 px-3  ">Number Account</span>
                    </th>
                
                    <th className="p-0">
                    <span className="block py-2 px-3  ">Status</span>
                    </th>
                  
                    <th className="p-0">
                    <span className="block py-2 px-3  ">Date/Heure</span>
                    </th>
                    <th className="p-0">
                    <span className="block py-2 px-3  ">Action</span>
                    </th>
                  
                </tr>
                </thead>
                <tbody>
                 {currentPosts.map((order,key)=>{
                     return (<tr key={key} className=" text-xs md:text-sm text-center transition-all duration-100 bg-slate-200 text-gray-800 hover:bg-gray-300  ">
                          <td className="p-2 md:p-4">{order.order_id}</td>
                          <td className="p-2 md:p-4">{order.order_name}</td>
                          <td className="p-2 md:p-4">{order.service.map((service)=>service.Service)}</td>

                          <td className="p-2 md:p-4">{order.costumer_name}</td>
                          <td className="p-2 md:p-4">{order.costumer_account}</td>
                          <td className="p-2 md:p-4">{order.status}</td>
                          <td className="p-2 md:p-4 transition-all duration-100">{order.date.slice(0,10)}/{order.date.slice(11,19)}</td> 
                          <td className="p-2 md:p-4 flex"><Link to={"/orderDetails/"+order.id} className="detailsBtn" >Details</Link><Link onClick={()=>handleDelete(order.id)} className="deleteBtn" >Delete</Link></td> 
                          
                      </tr>)
                 })}
               
                </tbody>

              </table>}

              <div className="flex justify-between">
              <Pagination totalOrders={orders.length} 
                       itemPerPage={itemPerPage}
                       setCurrentPage={setCurrentPage}
                       currentPage={currentPage}
           
           />
              {deleteLoading && <LoadingSpinnerMini/>}
              </div>
          
             </div>

        </div>
      </div>
    )
}