import React from "react";
import { UseStateContext } from "../../context/ContextProvider";
export default function MoreInfos(){
    const {user,setUser,setMoreInfos,moreInfos}=UseStateContext()
    // const [moreInfos,setMoreInfos]=useState(false);

    const moreInfoss=()=>{
        if(!moreInfos){
            setMoreInfos(true)

        }else{
            setMoreInfos(false)

        }
    
    }
return (
    <>
     <div className="moreInfos rounded-2xl  "> 
            <div>
                <strong className="text-blue-900">Entry Date: </strong>
                <span className="text-blue-500">{(user.created_at).slice(0,10)}</span>
            </div>

            <div>
                <strong className="text-blue-900">Post: </strong> 
                <span className="text-blue-500">{(user.Post)}</span>
            </div>
            <div>
                <strong className="text-blue-900">Team: </strong> 
                <span className="text-blue-500">{(user.Team)}</span>
            </div>
            <button onClick={moreInfoss} className="px-4  mt-4 py-1 btninfouser text-sm text-purple-600 font-semibold rounded-full border border-purple-600 hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2 ">Hide</button>
        </div> 
    </>
)
}