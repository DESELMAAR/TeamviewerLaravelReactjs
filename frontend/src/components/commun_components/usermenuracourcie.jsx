import React from "react";
import { Link } from "react-router-dom";

export default function UserMenuRacourcis(){
    return (
        <div className="grid gap-2 UserMenuRacourcis">
           <Link to="/resultuser">My Results</Link>
           <Link to="/addorder">Add New Order</Link>
           <Link>Contact Administrator</Link>

        </div>
    )
}