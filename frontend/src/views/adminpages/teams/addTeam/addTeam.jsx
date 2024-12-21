import { useRef, useState } from "react"
import axiosClient from "../../../../axios-client";
import LoadingSpinnerMini from "../../../../components/commun_components/loadingSpinnerMini";
export default function AddTeam({getValueFromChild}){
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
        axiosClient.post(`/teams`,payload).then(({data})=>{
            // console.log(data)
            getValueFromChild(false)
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
                <p className="title_of_page">You can add a new Team ?</p> 
                <hr className="mb-5  border-gray-400"/>
                <form action="" className="formtoadd formdesign" onSubmit={handleSubmit} >
                    <input ref={nameValue} name="type_name" type="text" placeholder="Name" />
                    <textarea ref={commentValue} type="text" placeholder="Comment" />
                    <div className="flex">
                    <button className="addBtn mr-2">Add</button>
                    <button className="cancelBtn">Cancel</button>
                    </div>
                </form>
            </div>}
        </div>
    )
}