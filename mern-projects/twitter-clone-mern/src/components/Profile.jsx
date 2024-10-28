import { useDispatch, useSelector } from "react-redux";
import useGetProfile from "../hooks/useGetProfile";
import Avatar from "react-avatar";
import { IoArrowBackSharp } from "react-icons/io5";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { USER_END_POINT_API } from "../../utils/constant";
import toast from "react-hot-toast";
import { followingUpDate } from "../redux/userSlice";
import { setRefresh } from "../redux/TweetSlice";
const Profile = () => {
  const {profile,user} = useSelector(store => store.user)
  const dispatch = useDispatch();
  const { id } = useParams();
  useGetProfile(id);

  const fllowAndUnfollow  = async  () =>{
    if(user?.following?.includes(id)){
      //unfollow
      try {
        const res = await axios.post(`${USER_END_POINT_API}/unfollow/${id}`, {id:user?._id},{
          withCredentials: true
        })
        toast.success(res.data.message)
        dispatch(followingUpDate(id))
        dispatch(setRefresh())
    
      } catch (error) {
        toast.error(error.response.data.message)
        console.log(error)
      }
    } else {
      try {
        const res = await axios.post(`${USER_END_POINT_API}/follower/${id}`,{id:user?._id},{
          withCredentials:true
        })
        toast.success(res.data.message)
        dispatch(followingUpDate(id))
        dispatch(setRefresh())  
      } catch (error) {
        toast.error(error.response.data.message)
        console.log(error)
      }
    }
  }




  return (
    <div className="w-[50%] border-r border-l border-gray-100">
      <div>
        <div className="flex items-center  py-2">
          <Link
            to="/"
            className="p-2 rounded-full hover:bg-gray-200 hover:cursor-pointer "
          >
            <IoArrowBackSharp size="24px" />
          </Link>
          <div className="ml-3">
            <h1 className="font-bold text-lg">{profile?.name}</h1>
            <p className="text-sm text-gray-500">10 post</p>
          </div>
        </div>

        <img src="https://wallpapers.com/images/hd/technology-linkedin-background-dce01jsbpnn0z2ej.jpg" />
        <div className="absolute top-56 ml-2 border-4 border-white rounded-full">
          <Avatar
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgdhxZSHGknkIVZ9zZ5i7WiwDXwcT_KRfpwF25Dk8iuPKVPkXKfkG2H6o&s"
            size="130"
            round={true}
          />
        </div>
        <div className="text-right m-4">

          {profile?._id === user?._id ? (
            <button className="px-3 py-2 hover:bg-gray-200    rounded-full border border-gray-400">
              Edit Profile
            </button>
          ) : (
            < button  onClick={fllowAndUnfollow} className="px-3 py-2   bg-black text-white  rounded-full border border-gray-400">{user?.following?.includes(id) ? "Following": "Follow"}</button>
          )}


        </div>
        <div className="m-4">
          <h1 className="font-bold text-xl">{profile?.name}</h1>
          <p>{`${profile?.username}`}</p>
        </div>
        <div className="m-4 text-sm">
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dicta
            iusto voluptates, consectetur eius tempore aspernatur rerum at fuga
            voluptate quis veniam perferendis natus laborum dolorum blanditiis
            modi officia ab nostrum!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
