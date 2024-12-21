import React from "react";
import AddService from "../../views/adminpages/services/addservices";
import LeftSide from "./leftsideuserInfo";
import { UseStateContext } from "../../context/ContextProvider";
import UserMenuRacourcis from "./usermenuracourcie";
import AdminMenuRaccourcis from "./adminMenuRaccourcis";
export default function leftMenu(){
    const {locationPath}=UseStateContext();
    const userOrAdmin=localStorage.getItem("IsAdmin");

    return(
        <div className="">
            {userOrAdmin==1? <AdminMenuRaccourcis/>:<UserMenuRacourcis/>}
            {console.log(userOrAdmin)}
            
        </div>
    )
}