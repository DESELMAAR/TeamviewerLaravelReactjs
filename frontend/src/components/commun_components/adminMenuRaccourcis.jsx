import React from "react";
import { Link } from "react-router-dom";

export default function AdminMenuRaccourcis(){
    return (
        <div className="grid gap-2 UserMenuRacourcis">
            <Link to="/results" >All Results</Link>
            <Link to="/teams">Teams</Link>
            <Link to="/members">Members</Link>
            <Link to="/members/new">Add a New Employee</Link>
            <Link to="/services">Services</Link>

        </div>
    )
}