import { useContext,useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
export default function ProfileLayout() {
  const { token, userId } = useContext(AuthContext);
  const navigate = useNavigate();
  // useEffect(() => {
  //     if(!token || !userId){
  //       navigate("/auth?mode=login");
  //     }
  // },[token,userId]);
  return <Outlet />;
}
