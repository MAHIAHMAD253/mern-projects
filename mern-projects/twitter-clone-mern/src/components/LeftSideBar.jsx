import { FaHome } from "react-icons/fa";
import { FaHashtag } from "react-icons/fa";
import { IoIosNotifications } from "react-icons/io";
import { CiUser } from "react-icons/ci";
import { FaBookmark } from "react-icons/fa";
import { IoMdLogOut } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { USER_END_POINT_API } from "../../utils/constant";
import toast from 'react-hot-toast'
import { setOtherUser, setProfile, setUser } from "../redux/userSlice";


const LeftSideBar = () => {
   const {user} = useSelector(store =>store.user)
   const navigate = useNavigate();
   const dispatch = useDispatch();


   const logoutHandler = async () =>{
    try {
      const res = await axios.get(`${USER_END_POINT_API}/logout`,{
        withCredentials:true
      })
      toast.success(res.data.message)
      navigate('/login')
      dispatch(setUser(null))
      dispatch(setOtherUser(null))
      dispatch(setProfile(null))
    } catch (error) {
      console.log(error)
    }
   }
  
  return (
    <div className="w-[20%]">
      <div>
        <div>
          <img
            width={"24px"} className="ml-4"
            src="https://www.citypng.com/public/uploads/preview/hd-twitter-x-new-logo-png-735811696672788haniphkh2j.png"
            alt="twitter-logo"
          />
        </div>
        <div className="my-4">
          <Link to="/" className="flex items-center gap-2 hover:bg-gray-100 px-4 py-2 rounded-full cursor-pointer">
            <div>
              <FaHome size="24px" />
            </div>
            <h1 className="font-semibold text-lg ml-2">Home</h1>
          </Link>

          <div className="flex items-center gap-2 hover:bg-gray-100 px-4 py-2 rounded-full cursor-pointer">
            <div>
              < FaHashtag size="24px" />
            </div>
            <h1 className="font-semibold text-lg ml-2">Explore</h1>
          </div>

          <div className="flex items-center gap-2 hover:bg-gray-100 px-4 py-2 rounded-full cursor-pointer">
            <div>
              <IoIosNotifications size="24px" />
            </div>
            <h1 className="font-semibold text-lg ml-2">Notifications</h1>
          </div>

          <Link to={`/profile/${user?._id}`} className="flex items-center gap-2 hover:bg-gray-100 px-4 py-2 rounded-full cursor-pointer">
            <div>
              <CiUser size="24px" />
            </div>
            <h1 className="font-semibold text-lg ml-2">Profile</h1>
          </Link>

          <div className="flex items-center gap-2 hover:bg-gray-100 px-4 py-2 rounded-full cursor-pointer">
            <div>
              <FaBookmark size="24px" />
            </div>
            <h1 className="font-semibold text-lg ml-2">Bookmarks</h1>
          </div>

          <div onClick={logoutHandler} className="flex items-center gap-2 hover:bg-gray-100 px-4 py-2 rounded-full cursor-pointer">
            <div>
              <IoMdLogOut size="24px" />
            </div>
            <h1 className="font-semibold text-lg ml-2">Logout</h1>
          </div>

          <button className="px-4 py-2 border-none text-md bg-[#1D9BF0] rounded-full w-full text-white font-bold">POST</button>
      
        </div>
      </div>
    </div>
  );
};

export default LeftSideBar;
