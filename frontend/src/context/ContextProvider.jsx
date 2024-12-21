import { useContext } from "react";
import { useState } from "react";
import { createContext } from "react";
// create context
const StateContext = createContext({
    user: null,
    token: null,
    loading: false,
    IsAdmin:null,
    moreInfos:false,
    locationPath:true,
    notification:"",
    setLocationPath:()=>{},
    setNotification:()=> {},
    setLoading: ()=> {},
    setUser: () => {},
    setToken: () => {},
    setIsAdmin:()=> {},
    setMoreInfos:()=> {}

});
// create context provider
export const ContextProvider = ({children}) => {
    const [user, setUser] = useState({
        // name:"Abdessamad"
    });

    // debugger
    const [notification,_setNotification]=useState("")
    const [IsAdmin,setIsAdmin]=useState("")
    const [moreInfos,setMoreInfos]=useState(false)
    const [locationPath,setLocationPath]=useState(true);
    const [loading,setLoading]=useState(false);
    const [token, _setToken] = useState(localStorage.getItem('ACCESS_TOKEN'));
const setNotification=(message)=>{
    _setNotification(message);
    setTimeout(()=>{
        _setNotification("")
    },72000)
}
    const setToken = (token) => {
        _setToken(token)
        if(token){
            localStorage.setItem('ACCESS_TOKEN',token);
        }
        else{
            localStorage.removeItem('ACCESS_TOKEN');
        }
    }
    return (
        <StateContext.Provider value={{
            // pass data that we need for children pages user info and token ...
            user,
            token,
            setUser,
            setToken,
            moreInfos,
            loading,
            IsAdmin,
            locationPath,
            setLocationPath,
            setLoading,
            setNotification,
            notification,
            setIsAdmin,
            setMoreInfos
        }}>
            {/* component that will use values :user,token ..... */}
            {children}
        </StateContext.Provider>
    )
}

// export useStateContext to be used 
export const UseStateContext = () => useContext(StateContext);

// after that we can use useStateContext by import it in AdminLayout or UserLayout or DefaultLayout destructing const {user,token}=useStateContext()
// And use ContextProvider in main.jsx  <ContextProvider><RouterProvider router..../><ContextProvider/>  (to debugg use debugger to see value of token null or not)
// so if token is false we return to a login page : if(!token){return <Navigate to="/login"/>}   importing Navigate also 
// so by this we can protect our DefaultLayout pages or AdminLayout pages from not authenticated user and redirect them to GuestLayout (login page )