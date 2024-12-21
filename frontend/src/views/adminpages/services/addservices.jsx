import { useRef } from "react"
import axiosClient from "../../../axios-client";
import { UseStateContext } from "../../../context/ContextProvider";

export default function AddService(){
const inputValue= useRef();
const {user}=UseStateContext();

const handleSubmit=(e)=>{
e.preventDefault();
const Added_By=(user.id)
const Service=(inputValue.current.value);
const payload={
    Service,Added_By
}
axiosClient.post("/services",payload).then((data)=>{
    // console.log(data)
}).catch(err=>{
    console.log(err)
})
}
    return (
        <div class=" flex flex-row items-center justify-center mt-8">
    <div class="    w-full  ">
        <form className="formtoadd " onSubmit={handleSubmit}>
            <div class="mb-4 ">
            <input ref={inputValue}  placeholder="Add new Service" class="appearance-none    w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline" id="service" type="text"/>
            </div>
            <button className="px-4 py-1  text-sm text-purple-600  font-semibold rounded-full border border-purple-400 hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2 " type="submit">
                Add New Service
            </button>
        </form>
    </div>
</div>
    )
}