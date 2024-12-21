import { useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axiosClient from "../../../axios-client.js";
import { UseStateContext } from "../../../context/ContextProvider";
import LoadingSpinner from "../../../components/commun_components/loadingSpinner";
export default function UserForm() {
  const navigate = useNavigate();
  let {id} = useParams();
  const [user, setUser] = useState({
    id: null,
    name: '',
    email: '',
    IsAdmin:'',
    Team:'',
    password: '',
    password_confirmation: ''
  })
  const [errors, setErrors] = useState(null)
  const [loading, setLoading] = useState(false)
  const {notification,setNotification} = UseStateContext()
  const [teams,setTeams]=useState([])

  if (id) {
    useEffect(() => {
      setLoading(true)
      axiosClient.get(`/users/${id}`)
        .then(({data}) => {
          setLoading(false)
          setUser(data)
        })
        .catch(() => {
          setLoading(false)
        })
    }, [])
  }
 const [smalLoading,setSmaleLoading]=useState(false)
  useEffect(() => {
    setSmaleLoading(true)
    axiosClient.get("/teams").then(({data})=>{
      setTeams(data.data)
      setSmaleLoading(false)
    }).catch(err=>{
      // console.log(err)
      setSmaleLoading(false)
    })
  }, [])
  const onSubmit = ev => {
    ev.preventDefault()
    if (user.id) {
      // debugger
        axiosClient.put(`/users/${user.id}`, user).then(() => {
          setNotification("Member updated successfully ! ")
          // console.log(notification)
          navigate('/members')
      
              })
              .catch(err => {
                  // console.log(err)
                const response = err.response;
                if (response && response.status === 422) {
                  setErrors(response.data.errors)
                }
              })
    } else {
        // debugger
      axiosClient.post(`/users`, user).then(({data}) => {
        // console.log(data)
       

       navigate('/members')
       if(data.status===200){
        setNotification("Member Created successfully ! ")

      }
        })
        .catch(err => {
            console.log(err)
          const response = err.response;
          if (response && response.status === 422) {
            setErrors(response.data.errors)
          }
        })
    }
  }
  return (
    <>
      <div className="card animated fadeInDown m-6 cover_main">
        {loading && (
          <LoadingSpinner/>
        )}
        {errors &&
          <div className="alert">
            {Object.keys(errors).map(key => (
              <p key={key}>{errors[key][0]}</p>
            ))}
          </div>
        }
        {!loading && (
          <>
           <p className="title_of_page">{user.id? "Edit User":"Add A new User"}</p>
           <hr className="mb-5  border-gray-400"/>

            <div className={"mx-auto bg-card flex items-center justify-center  " }>
            <div className={"w-fit  rounded "} >
           
            <div className="mx-auto w-full max-w-[550px] p-8  flex  justify-start">
                
                <form onSubmit={onSubmit} className="formtoadd formdesign">
                <input className="" value={user.name} onChange={ev => setUser({...user, name: ev.target.value})} placeholder="Name"/>
                <input className=""  value={user.email} onChange={ev => setUser({...user, email: ev.target.value})} placeholder="Email"/>
                <select value={(user.IsAdmin)}  onInput={ev => setUser({...user, IsAdmin: ev.target.value})} className="" name="is_admin" id="is_admin">
                    {!user.id? <option value="">Choose Status</option>:""}
                    <option  value="1">Administrator</option>
                    <option value="0">User</option>
                </select>

                <input className="" autoComplete="false" type="password" onChange={ev => setUser({...user, password: ev.target.value})} placeholder="Password"/>
                <input className="" autoComplete="false" type="password" onChange={ev => setUser({...user, password_confirmation: ev.target.value})} placeholder="Password Confirmation"/>
                <select value={user.Team}  onInput={ev => setUser({...user, Team: ev.target.value})} className="" name="Team" id="Team">
                <option   value="">Chose a team</option>

                  {teams.map((team,key)=>{
                   return (
                   <option key={key}  value={team.id}>{ team.name}</option> )

                  })}
                </select>
                <button className="addBtn">Save</button>
            </form>
            </div>
            </div>
            
            </div>
          </>
              
      
       
        )}
      </div>
    </>
  )
}