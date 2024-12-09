import { Outlet, useNavigate } from "react-router-dom"
import AuthContext from "../../context/AuthContext"
import { useContext, useEffect } from "react"
export default function AdminLayout(){
    // const navigate = useNavigate();
    // const {userId,role,token} = useContext(AuthContext);
    // useEffect(()=>{
    //     if(!userId && !role && !token  ){
    //         navigate('/');
    //     }
    // },[token,userId,role])
    return <Outlet/>
}