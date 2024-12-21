
import React, { useEffect, useRef } from "react";
import { useLocation } from 'react-router-dom';
import { useState } from "react";
import axiosClient from "../../../axios-client";
import LoadingSpinner from "../../../components/commun_components/loadingSpinner";
import { Link } from "react-router-dom";
import { UseStateContext } from "../../../context/ContextProvider";
import BtnLoading from "../../../components/commun_components/BtnLoading";
import BtnLoadingAdd from "../../../components/commun_components/BtnLoadingAdd";
import LoadingSpinnerMini from "../../../components/commun_components/loadingSpinnerMini";
import Pagination from "../pagination";

export default function Services(){
  const [services,setServices]=useState([])
  const [loading,setLoading]=useState(false)
  const [resetVAlue,setResetValue]=useState('')
  const [btnLoading,setBtnLoading]=useState(false)
  const [btnLoadingAdd,setBtnLoadingAdd]=useState(false);
  const location = useLocation();
  const inputValue= useRef();
  const {user}=UseStateContext();
  // pagination 
  const [allData,setAllData]=useState([]);
  const [currentPage,setCurrentPage]=useState(1);
  const [itemPerPage,setItemPerPage]=useState(5);


  const lastPostIndex=currentPage * itemPerPage;
  const firstPostIndex=lastPostIndex - itemPerPage;
  const currentServices=services.slice(firstPostIndex,lastPostIndex);

const handleSubmit=(e)=>{
e.preventDefault();
const Added_By=(user.id)
const Service=(inputValue.current.value);

const payload={
    Service,Added_By
}
setBtnLoadingAdd(true)
axiosClient.post("/services",payload).then((data)=>{
    // console.log(data)
    GetService00();
    setResetValue('')
    setBtnLoadingAdd(false)

}).catch(err=>{
    // console.log(err)
    setResetValue('')
    setBtnLoadingAdd(false)
})
}

const GetService=()=>{
  setLoading(true)
  axiosClient.get("/services").then(({data})=>{
    setServices(data.data)
    // console.log(data.data)
    setLoading(false)
   }).catch(err=>{
    console.log(err)
    setLoading(false)

  })
}

const GetService0=(value)=>{
  axiosClient.get("/services").then(({data})=>{
    const resultAfterFilter=(data.data).filter((item)=>{
      return(
         item.Service.toLowerCase().includes((value.current.value).trim().toLowerCase())
      );

  })
   
    setServices(resultAfterFilter)
    // console.log(data.data)
    // console.log(resultAfterFilter);
   }).catch(err=>{
    console.log(err)

  })
}
const GetService00=()=>{
  axiosClient.get("/services").then(({data})=>{
   
    setServices(data.data);
    // console.log(data.data)
    // console.log(resultAfterFilter);
   }).catch(err=>{
    console.log(err)

  })
}

  useEffect(()=>{
        GetService();
     },[])
  // delete service
  const handleDelete=(id)=>{
    setBtnLoading(true)

    axiosClient.delete(`/services/${id}`).then((data)=>{
      // console.log(data)
      GetService00()
      setBtnLoading(false)


    }).catch(err=>{
      console.log(err)
      setBtnLoading(false)

    })
    // console.log(id)
    GetService0()
  }
const inputSearch=useRef('')
  const handleSearch =(e)=>{
e.preventDefault()
GetService0(inputSearch)
  }
    return(
      <>
      {/* {  console.log(location.pathname)} */}
      {loading ? <LoadingSpinner/> :   
<>
<div classNameName="servicemain">
      
             

  <div className=" mx-4 pl-8 pr-8 pb-0 overflow-auto mt-16 ">
                           <div className="flex justify-between">
                            <p className="title_of_page">List Services:</p>

                                <div className="mt-1 ">
                                    <form className="form_search flex" onSubmit={handleSearch} >
                                        <div className="flex content-center align-middle div_input_search">
                                        <input ref={inputSearch} type="text"  placeholder="Search..."/>
                                        </div>
                                        <button type="submit"><i class="fa-solid fa-magnifying-glass"></i> </button>                        
                                    </form>
                                </div>

                            </div>
   
   <div>{btnLoading? <LoadingSpinnerMini/>:""}</div> 
   <hr className="mb-5  border-gray-400"/>


   <div className="relative mt-4 overflow-auto">
     <div className="overflow-x-auto ">
       
         <table className="min-w-full   ">
         <thead>

           <tr className=" text-center text-xs md:text-sm font-thin table_head">
             <th className="p-0">
               <span className="block py-2 px-3 ">ID</span>
             </th>
             <th className="p-0">
               <span className="block py-2 px-3 ">Services</span>
             </th>
             <th className="p-0">
               <span className="block py-2 px-3 ">Date</span>
             </th>
             <th className="p-0">
               <span className="block py-2 px-3 ">Added By</span>
             </th>
             <th className="p-4 text-xs md:text-sm">Actions</th>
           </tr>
         </thead>

         <tbody>
         {currentServices.map((service,key)=>{
          return ( <tr key={key} className=" text-xs md:text-sm hover:bg-cyan-900 text-center text-gray-300">
             <td className="p-2 md:p-4">{service.id}</td>
             <td className="p-2 md:p-4">{service.Service}</td>
             <td className="p-2 md:p-4">{service.Date.slice(0,10)}/{service.Date.slice(11,19)}</td>
             <td className="p-2 md:p-4">{service.user.name===null ? "no user":service.user.name}</td>
             <td className="relative p-2 md:p-4 flex justify-center space-x-2">
           <Link onClick={
             ()=>{
               handleDelete(service.id)
             }} className="deleteBtn">
           <span>
            Delete
                 
           </span>  
           </Link>
           <Link to="" className="editBtn">
           <span >
               Edit  
           </span>  
           </Link>
             </td>
           </tr>)
            })}
         
         </tbody>
       </table>
       <Pagination totalOrders={services.length} 
                       itemPerPage={itemPerPage}
                       setCurrentPage={setCurrentPage}
                       currentPage={currentPage}
           
           />
       <div className=" flex flex-row items-center mb-4 justify-center mt-8">
           <div className="    w-full  ">
               <form className="formtoadd " onSubmit={handleSubmit}>
                   <div className="mb-4 ">
                   <input ref={inputValue} value={resetVAlue} onChange={(e)=>{setResetValue(e.currentTarget.value)}}  placeholder="Add new Service" className="appearance-none    w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline" id="service" type="text"/>
                   </div>
                   <div className="flex">
                        <button className="addBtn" type="submit">
                        <div className="flex">Add New Service   </div> 
                        </button><div className="ml-2">{btnLoadingAdd? <LoadingSpinnerMini/>:""}</div>
                   </div>
                   
               </form>
           </div>
       </div>
       
       
    
     
     


     </div>

   </div>

   </div>



    
</div>
</>


}
   
      </>

      
       
    )
}