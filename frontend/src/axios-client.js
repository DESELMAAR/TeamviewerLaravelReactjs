
// import axios from "axios";
// import { UseStateContext } from "./context/ContextProvider";

// const axiosClient = axios.create({
//   baseURL: `http://127.0.0.1:8000/api`,
// });

// axiosClient.interceptors.request.use((conf) => {
//   const token = localStorage.getItem("ACCESS_TOKEN");
//   if (token) {
//     conf.headers.Authorization = `Bearer ${token}`;
//   }
//   return conf;
// });

// axiosClient.interceptors.response.use(
//   (resp) => {
//     return resp;
//   },
//   (error) => {
//     const { response } = error; // Correctly extract the `response` property
//     if (response) {
//       if (response.status === 401) {
//         localStorage.removeItem("ACCESS_TOKEN");
//         // Optionally redirect to login page or notify user
//       } else if (response.status === 404) {
//         console.error("Resource not found:", response.config.url);
//       }
//     } else {
//       // Handle cases where the error does not have a response
//       console.error("Network error or server did not respond:", error.message);
//     }
//     throw error; // Re-throw error so it can be handled in calling code
//   }
// );

// export default axiosClient;




import axios from "axios"
import { UseStateContext } from "./context/ContextProvider";
const axiosClient =axios.create({
    baseURL:`http://127.0.0.1:8000/api`
})



axiosClient.interceptors.request.use((conf)=>{
    const token = localStorage.getItem("ACCESS_TOKEN")
    conf.headers.Authorization=`Bearer ${token}`;
    return conf;
});

axiosClient.interceptors.response.use((resp)=>{
    return resp
},
(error)=>{
    const {resp}=error;
    if(resp.status === 401){
        localStorage.removeItem("ACCESS_TOKEN");
    } else if (response.status === 404) {
      }
    throw error;
}
);

export default axiosClient;