import { createBrowserRouter } from "react-router-dom";
import AdminLayout from "./layouts/AdminLayout";
import HomeAdmin from "./views/adminpages/homeadmin";
import Teams from "./views/adminpages/teams";
import Services from "./views/adminpages/services/services";
import Results from "./views/adminpages/Results";
import Members from "./views/adminpages/members/members";

// import Results from "./views/userpages/resultsuser";

import UserLayout from "./layouts/UserLayout";
import HomeUser from "./views/userpages/homeuser";
import GuestLayout from "./layouts/GuestLayout"; 
import Register from "./views/register";
import Login from "./views/login";
// import AddOrderUser from "./views/userpages/addordersuser";
import AddOrderadmin from "./views/adminpages/teams/orders/addorders";
import Resultsusers from "./views/userpages/resultsuser";
import UserForm from "./views/adminpages/members/userform";
import Details from "./views/adminpages/members/details";
import TeamsList from "./views/adminpages/teams/teamsList";
import MembersForAuser from "./views/adminpages/members/membersForAuser";
import OrderDetails from "./views/adminpages/teams/orders/orderDetails";
import AddOrderUser from "./views/userpages/component/addorder";
import ResultsUser from "./views/userpages/component/userDashboard";
// import OrderDetails from "./views/adminpages/teams/orders/orderDetails";

const router = createBrowserRouter([
    {
        path:"/",
        element:<AdminLayout/>,
        children:[
            {
                path:"/homeadmin",
                element:<HomeAdmin/>,
            },
            {
                path:"/teams",
                element:<TeamsList/>,
            },
            {
                path:"/services",
                element:<Services/>,
            },
            {
                path:"/results",
                element:<Results/>,
            },
            {
                path:"/orderdetails/:id",
                element:<OrderDetails/>,
            },
            {
                path:"/members",
                element:<Members/>,
            },
            {
                path:"/member/:id",
                element:<Details/>,
            },
            {
                path:"/members/new",
                element:<UserForm key="userCreate"/>,
            },
            {
                path:"/members/:id",
                element:<UserForm key="userUpdate"/>,
            },
            {
                path:"/usersmembers/:id",
                element:<MembersForAuser />,
            },
            {
                path:"/addorders",
                element:<AddOrderadmin/>,
            }
        ]
    },
    {
        path:"/",
        element:<UserLayout/>,
        children:[
            {
                path:"/homeuser",
                element:<HomeUser/>,
            },
            {
                path:"/addorder",
                element:<AddOrderUser/>,
            },
           
            {
                path:"/resultsUser",
                element:<Resultsusers/>,
            },
            {
                path:"/resultuser",
                element:<ResultsUser/>,
            }
           
        ]
    },
    {
        path:"/",
        element:<GuestLayout/>,
        children:[
            {
                path:"/login",
                element:<Login/>,
            },
            {
                path:"/register",
                element:<Register/>,
            }
        ]
    }
])

export default router;