import { useRef, useState } from "react"
import axiosClient from "../../../../axios-client";
import LoadingSpinnerMini from "../../../../components/commun_components/loadingSpinnerMini";
export default function ModifyTeam({getValueFromChildForModify,teamToModify}){
    console.log(getValueFromChildForModify);
    const [loading,setLoading]=useState(false);
    const nameValue=useRef('')
    const commentValue=useRef()
    const handleSubmit=(e)=>{
        e.preventDefault();
       const name=(nameValue.current.value)
       const comment=(commentValue.current.value)
       const payload={
            name,
            comment
        }
        setLoading(true)
        axiosClient.put(`/teams/${teamToModify.id}`,payload).then(({data})=>{
            // console.log(data)
            getValueFromChildForModify(false)
            setLoading(false);
        }).catch(err=>{
            // console.log(err)
            setLoading(false);
        })
    }
    return(
        <div className="m-6 cover_main" >
            {loading? <LoadingSpinnerMini/>: 
            <div className="p-4">
                <p className="title_of_page">You can Eddit this team :</p> 
                <hr className="mb-5  border-gray-400"/>
                <form action="" className="formtoadd formdesign" onSubmit={handleSubmit} >
                    <input defaultValue={teamToModify.name} ref={nameValue} name="type_name" type="text" placeholder="Name" />
                    <textarea defaultValue={teamToModify.comment} ref={commentValue} type="text" placeholder="Comment" />
                    <div className="flex ">
                    <button type="submit"  className="addBtn mr-2">Edit</button> <button className="cancelBtn">Cancel</button>

                    </div>
                </form>
            </div>
            }
           
        
        </div>
    )
}