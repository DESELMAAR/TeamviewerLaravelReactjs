import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
// import ModalForm from "./modalform";
import axiosClient from "../../../axios-client";
import LoadingSpinner from "../../../components/commun_components/loadingSpinner";
import LoadingSpinnerMini from "../../../components/commun_components/loadingSpinnerMini";
import Pagination from "../pagination";
import AlertDeleteError from "../alertDeleteError";
import { UseStateContext } from "../../../context/ContextProvider";
export default function Members(){
    
    const [users,setUsers]=useState([]);
    const [loading,setLoading]=useState(false);
    const [BtnLoadingDelete,setBtnLoadingDelete]=useState(false);
    // pagination 
  const [allData,setAllData]=useState([]);
  const [currentPage,setCurrentPage]=useState(1);
  const [itemPerPage,setItemPerPage]=useState(5);


  const lastPostIndex=currentPage * itemPerPage;
  const firstPostIndex=lastPostIndex - itemPerPage;
  const currentPosts=users.slice(firstPostIndex,lastPostIndex);
  const {notification ,setNotification}=UseStateContext();

    useEffect(()=>{
        getUsers0();
        // console.log(notification)
    },[])
    const getUsers0=()=>{
        setLoading(true)
        axiosClient.get('/users')
        .then(({data})=>{
            setLoading(false)
            setUsers(data.data)
            // console.log(data)
        })
        .catch(()=>{
            setLoading(false)
        })
    }
const [deleteLoading,setDeleteLoading]=useState(false)
    const getUsersDeleteLoading=()=>{
        setDeleteLoading(true)
        axiosClient.get('/users')
        .then(({data})=>{
            setUsers(data.data)
            // console.log(data)
            setDeleteLoading(false)
        })
        .catch(()=>{
            setDeleteLoading(false)

        })
    }

    const getUsers=(value,choiceFilter)=>{
// const choice="name"        
axiosClient.get('/users')
        .then(({data})=>{
            const resultAfterFilter=(data.data).filter((item)=>{
                const choice=(choiceFilter.current.value)
                switch (choice){
                    case "name":
                        return(
                            item.name.toLowerCase().includes((value.current.value).trim().toLowerCase())
                         );
                    case "email":
                        return(
                                item.email.toLowerCase().includes((value.current.value).trim().toLowerCase())
                          );
                    case "team.name":
                        return(
                                item.team.name.toLowerCase().includes((value.current.value).trim().toLowerCase())
                             );
                    default:
                        return(
                            item.name.toLowerCase().includes((value.current.value).trim().toLowerCase())
                         );
                            
                }
    
                

            })
            setUsers(resultAfterFilter)
            // console.log(data.data)
        })
        .catch(()=>{
        })
    }

    const [errorData,setErrorData]=useState([])
    const handleDelete = user=>{
        setBtnLoadingDelete(true)
        console.log((user.id))
        axiosClient.delete(`/users/${user.id}`)
        .then((data) => {
            setNotification("Member deleted successfully!!! ")
            console.log(notification)
            console.log(data)
            setErrorData(data.data)
            setBtnLoadingDelete(false)

          getUsersDeleteLoading()
        }).catch(err=>{
            console.log(err)
            setBtnLoadingDelete(false)

        })
    }
    const inputSearch=useRef('')
    const choiceFilter=useRef('')
    const handleSearch=(e)=>{
        e.preventDefault()
        getUsers(inputSearch,choiceFilter)
        // console.log(inputSearch.current.value)
        // console.log(choiceFilter.current.value)
    }
  
 
    return (
        <>
        {loading? <LoadingSpinner/>:  <div className="bg-inherit    m-6      ">
            <div className="cover_main bg-inherit p-4">
                <div className="flex justify-between">
                    <h2 className="title_of_page"> Members list:</h2>
                     <div className=" ">
                        <form className="form_search flex" onSubmit={handleSearch}>
                                              <select ref={choiceFilter} className="selectFilter " name="" id="">
                                                  <option value="">Filter by</option>
                                                  <option value="name">Name</option>
                                                  <option value="email">Login</option>
                                                  <option value="team.name">Team</option>

                                              </select>
                            <div className="flex content-center align-middle div_input_search">
                            <input ref={inputSearch} type="text"  placeholder="Search..."/>
                            </div>
                            <button type="submit"><i class="fa-solid fa-magnifying-glass"></i> </button>                        
                        </form>
                     </div>
                
                </div>
            <hr className="mb-5  border-gray-400"/>

            
          <div className="">
            <div>
                <Link  to="/members/new" className="addBtn">
                <span>
                    Add New  
                </span> 

                </Link> 

               
            </div>
           

            {/* <div></div> */}


          </div>
                    
            <div className="mt-4 divteams">
                {/* {deleteLoading && <AlertDeleteError errorData={errorData}  deleteLoading={deleteLoading} />} */}
            <table className="min-w-full">
                <thead>
                <tr className="table_head text-center text-xs md:text-sm font-thin ">
                    <th className="p-0">
                    <span className="block py-2 px-3">ID</span>
                    </th>
                    <th className="p-0">
                    <span className="block py-2 px-3">Employee Name</span>
                    </th>
                    <th className="p-0">
                    <span className="block py-2 px-3  ">Login</span>
                    </th>
                    <th className="p-0">
                    <span className="block py-2 px-3  ">Status</span>
                    </th>
                    <th className="p-0">
                    <span className="block py-2 px-3  ">Team</span>
                    </th>
                    <th className="p-0">
                    <span className="block py-2 px-3  ">Actions</span>
                    </th>
                  
                </tr>
                </thead>
                <tbody>
                {currentPosts.map((user,key)=>{
                  return ( <tr key={key} className=" text-xs md:text-sm text-center text-gray-300 hover:bg-cyan-800">
                    <td className="p-2 md:p-4">{user.id}</td>
                    <td className="p-2 md:p-4">{user.name} <span className=" font-semibold">{user.IsAdmin==1 ? "(A)":"(U)"}</span></td>
                    <td className="p-2 md:p-4">{user.email}</td>
                    <td className="p-2 md:p-4"><span className=" font-semibold">{user.IsAdmin==1 ? "Admin":"User"}</span></td>   
                    <td className="p-2 md:p-4"><span className=" font-semibold">{user.team? user.team.name:"No team yet"}</span></td>                
                    <td className="relative justify-items-center p-2 md:p-4 flex  justify-center space-x-2">
                    <Link type="submit" onClick={()=> handleDelete(user)} className="deleteBtn">
                    Delete  
                    </Link>
                    <Link  to={"/members/"+ user.id} className="editBtn  ">
                    
                    Edit  
                   
                    </Link>
                    <Link to={"/member/"+ user.id }className="detailsBtn  ">
                    
                    details  
                     
                    </Link>
                    </td>
                    </tr>)
                })} 

                </tbody>
            </table>
            <div className="flex justify-between">
            <Pagination totalOrders={users.length} 
                       itemPerPage={itemPerPage}
                       setCurrentPage={setCurrentPage}
                       currentPage={currentPage}
            />

            {BtnLoadingDelete? <LoadingSpinnerMini/>: ""}

            </div>
            
            </div>
            
            </div>  
                                       
            </div>}
          
        </>     
    )
}