
import { useSelector } from "react-redux";
import useOtherUser from "../hooks/useOtherUser";
import LeftSideBar from "./LeftSideBar";
import RightSideBar from "./RightSideBar";
import { Outlet, useNavigate } from "react-router-dom";
import useGetMyTweet from "../hooks/useGetMyTweet";
import { useEffect } from "react";

const Home = () => {
   const {user} = useSelector(store =>store.user)
   const navigate = useNavigate()
   //custom hook
   useEffect(()=>{
    if(!user){
      navigate('/login')
    }
   },[])
useOtherUser(user?._id)
useGetMyTweet(user?._id)

  return (
    <div className="flex justify-between w-[80%] mx-auto">
      <LeftSideBar />
      <Outlet/>
      <RightSideBar/>
    </div>
  );
};

export default Home;
