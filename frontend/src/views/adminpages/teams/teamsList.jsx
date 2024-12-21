import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../../../axios-client";
import LoadingSpinner from "../../../components/commun_components/loadingSpinner";
import LoadingSpinnerMini from "../../../components/commun_components/loadingSpinnerMini";
import AddTeam from "./addTeam/addTeam";
import ModifyTeam from "./modifyTeam/modifyTeam";
import MembersForAuser from "../members/membersForAuser";
import Pagination from "../pagination";
import PaginationTeam from "./paginationTeam";
export default function TeamsList(){
    const [teams,setTeams]=useState([]);
    const [loading,setLoading]=useState(false);
    const [visible,setVisible]=useState(false);

    // pagination 
  const [allData,setAllData]=useState([]);
  const [currentPage,setCurrentPage]=useState(1);
  const [itemPerPage,setItemPerPage]=useState(2);


  const lastPostIndex=currentPage * itemPerPage;
  const firstPostIndex=lastPostIndex - itemPerPage;
  const currentTeams=teams.slice(firstPostIndex,lastPostIndex);

    useEffect(()=>{
        getTeams();
    },[])
    const getTeams=()=>{
        setLoading(true)
        axiosClient.get("teams").then(({data})=>{
            setTeams(data.data)
            setLoading(false)
        }).catch(err=>{ 
            console.log(err)
            setLoading(false)
        })
    }
    const getTeams0=(value)=>{
        // console.log(value.current.value)
        axiosClient.get("teams").then(({data})=>{
            const resultAfterFilter=(data.data).filter((item)=>{
                return(
                   item.name.toLowerCase().includes((value.current.value).trim().toLowerCase())
                );

            })
            setTeams(resultAfterFilter)
            // console.log(data.data)
            // console.log(resultAfterFilter)

        }).catch(err=>{ 
            console.log(err)
        })
    }
    const [itemToDelete,setItemToDelete]=useState([])
    const handleDelete=(e)=>{
        console.log("clicked");
        console.log(e);
            setVisible(true)
            setItemToDelete(e)
    }
const [LoadingDelet,setLoadingDelet]=useState(false);
const DeleteYes=()=>{
        setLoadingDelet(true)
        axiosClient.delete(`/teams/${itemToDelete.id}`).then(({data})=>{
            getTeams0()
            setVisible(false)
            setLoadingDelet(false)
        }).catch(err=>{
            console.log(err)
            setLoadingDelet(false)
        })
    }
const handleNo=()=>{
    setVisible(false)
    console.log('no')
}
const [displayAddTeam,setDisplayAddTeam]=useState(false);
const handleAdd=()=>{
    setDisplayAddTeam(true)
}
const getValueFromChild = (response)=>{
    setDisplayAddTeam(response);
    getTeams0();
}
const [displayModifyTeam,setdisplayModifyTeam]=useState(false)
const [teamToModify,setTeamToModify]=useState([])
const handleModify=(e)=>{
    setdisplayModifyTeam(true);
    setTeamToModify(e)
}
const getValueFromChildForModify=(response)=>{
    setdisplayModifyTeam(response)
    getTeams0();
}
const [membersListForUser,setMembersListForUser]=useState(false);
const [teamForMemberss,setTeamForMembers]=useState([])
const handleMembersListFrUser=(e)=>{
// console.log(e)
setMembersListForUser(true)
setTeamForMembers(e.user)
}

const searchInput=useRef('');
const handleSearch=(e)=>{
    e.preventDefault();
    getTeams0(searchInput)
    console.log(searchInput.current.value)
    if(searchInput.current.value){
        console.log(searchInput.current.value)
    }else{
        console.log("nothing")

    }

}
    return (
        <>
        {membersListForUser? <MembersForAuser teamForMemberss={teamForMemberss}/> :  <>
            <div>
          
          {displayModifyTeam? <ModifyTeam teamToModify={teamToModify} getValueFromChildForModify={getValueFromChildForModify} />:
              <>
              {displayAddTeam? <AddTeam getValueFromChild={getValueFromChild}/>:
                  <div>
                  {loading? <LoadingSpinner/>:   
                          <section class=" antialiased m-6 divteams p-4">
                            <div className="flex justify-between">
                            <button onClick={handleAdd} className="addBtn mb-4 font-semibold">Add a Team</button>

                                <div className=" ">
                                    <form className="form_search flex" onSubmit={handleSearch}>
                                        <div className="flex content-center align-middle div_input_search">
                                        <input ref={searchInput} type="text"  placeholder="Search..."/>
                                        </div>
                                        <button type="submit"><i class="fa-solid fa-magnifying-glass"></i> </button>                        
                                    </form>
                                </div>

                            </div>
                              <hr className="mb-5  border-gray-400"/>
                              <div className={visible? "bg-tomato-200 text-red-800 border-l-4 p-4":"hidden"} role="alert">
                                  {LoadingDelet? <LoadingSpinnerMini/>:
                                  <div>
                                  <p class="font-bold">
                                          Are you sur to <strong className="text-red">delete</strong> this group : <strong className="text-black">{itemToDelete.name}</strong>  ?
                                      </p>
                                      <div className="flex gap-2">
                                      <button onClick={DeleteYes}  className="deleteBtn font-bold text-red">Yes</button>
                                      <button onClick={handleNo}  className="editBtn font-bold">No</button>
                                      </div>
                                  </div>
                                  }
                              </div>
                              {currentTeams.map((team,key)=>{
                                  return(
                                 <>
                                   <div key={key} class="h-full mt-4 ">
                                          <div class="max-w-2xl card_group  ">
                                              <div class="px-6 py-5">
                                                  <div class="flex items-start">
                                                      <svg class="fill-current flex-shrink-0 mr-5" width="30" height="30" viewBox="0 0 30 30">
                                                          <path class="text-indigo-300" d="m16 14.883 14-7L14.447.106a1 1 0 0 0-.895 0L0 6.883l16 8Z" />
                                                          <path class="text-indigo-200" d="M16 14.619v15l13.447-6.724A.998.998 0 0 0 30 22V7.619l-14 7Z" />
                                                          <path class="text-indigo-500" d="m16 14.619-16-8V21c0 .379.214.725.553.895L16 29.619v-15Z" />
                                                      </svg>
                                                      <div class="flex-grow truncate">
                                                          <div class="w-full sm:flex justify-between items-center mb-3">
                                                              <h2 class="text-2xl leading-snug font-extrabold text-gray-800 truncate mb-1 sm:mb-0">Team {team.name}</h2>
                                                              <div class="flex-shrink-0 flex items-center space-x-3 sm:ml-2">  
                                                                  <button class="flex items-center text-left text-sm font-medium text-gray-800 hover:text-white group focus:outline-none focus-visible:border-b focus-visible:border-indigo-100">
                                                                  <i className="fa-solid mr-2 fa-users"></i>
                                                                      <span>{team.user.length} <span class="sr-only">comments</span></span>
                                                                  </button> 
                                                              </div>
                                                          </div>
                                                          <div class="flex items-end justify-between whitespace-normal">
                                                              <div class="max-w-md text-gray-800">
                                                                  <p class="mb-2">{team.comment}</p>
                                                              </div>
                                                          </div>
                                                      </div>
                                                  </div>
                                                  <div className="btns flex justify-end gap-2 mt-2">
                                                      <button onClick={()=>{handleDelete(team)}}   className="deleteBtn">Delete</button>
                                                      <Link onClick={()=>handleMembersListFrUser(team)}  className="detailsBtn">Members</Link>
                                                      <button onClick={()=>{handleModify(team)}} className="editBtn">Modify</button>
                                                  </div>
                                              </div>
                                          </div>
                                      </div>
                                  
                               
                                 </>
                                    
                                )
                              })}  

                                    <PaginationTeam totalTeams={teams.length}
                                                  itemPerPage={itemPerPage}
                                                  setCurrentPage={setCurrentPage}
                                                  currentPage={currentPage}
                                   />
                          </section> }
                      
                  </div>
              }
               </>
          }
          </div>  
           </>}
        </>
        
      
          
    )
}