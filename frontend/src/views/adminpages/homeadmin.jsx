import { useLocation } from 'react-router-dom';

import { UseStateContext } from '../../context/ContextProvider';
import React from "react";
import { Link } from "react-router-dom";

export default function HomeAdmin(){
    const {locationPath,setLocationPath}=UseStateContext();
    const location = useLocation();
    // console.log(location.pathname);
   
    return(
       <div className="grid gap-4 grid-cols-3 w-full mt-8 p-10  ml-4   homeadmin_div ">
           <Link to="/results" className="no-underline text-center     py-12 font-medium text-xl 	
"><h1 className="text-3xl">Results:</h1><p></p> </Link>
           <Link to="/services" className="no-underline text-center   py-12 font-medium text-xl 	
"><h1 className="text-3xl">Services:</h1>  <p></p></Link>
           <Link to="/members" className="no-underline text-center   py-12 font-medium text-xl 	
"> <h1 className="text-3xl">Employees:</h1> <p></p></Link>
           <Link to="/chat" className="no-underline text-center   py-12 font-medium text-xl 	
"><h1 className="text-3xl">Chat:</h1>  <p></p></Link>
           <Link to="/request" className="no-underline text-center   py-12 font-medium text-xl 	
"> <h1 className="text-3xl">Request:</h1> <p></p></Link>
           <Link to="/vacation" className="no-underline text-center   py-12 font-medium text-xl 	
"> <h1 className="text-3xl">Vacation:</h1> <p></p></Link>
       </div> 
    )
}