import Avatar from "react-avatar";
import { FaRegComment } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import { CiBookmark } from "react-icons/ci";
import { MdOutlineDeleteOutline } from "react-icons/md";
import axios from "axios";
import { TWEET_END_POINT_API } from "../../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { setRefresh } from "../redux/TweetSlice";
import toast from "react-hot-toast";




const Tweet = ({tweets}) => {
  const {user} = useSelector(store =>store.user)
const dispatch = useDispatch();



  const likeOrDisLikeHandler = async (id)=>{
    try {
      const res = await axios.put(`${TWEET_END_POINT_API}/like/${id}`, {id:user?._id},{
        withCredentials:true
      })
      dispatch(setRefresh())
      toast.success(res.data.message)
    } catch (error) {
      console.log(error)
    }
  }

  // delete fetching method 

  const deleteChangeHandler = async (id)=>{
    try {
      const resp = await axios.delete(`${TWEET_END_POINT_API}/deltweet/${id}`,{
        withCredentials:true
      })
      toast.success(resp.data.message)
      dispatch(setRefresh())
    } catch (error) {
      console.log(error)
    }
  }
  
 
  return (
    <div className="border-b border-gray-200">
      <div>
        <div className="flex p-4">
          <Avatar
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgdhxZSHGknkIVZ9zZ5i7WiwDXwcT_KRfpwF25Dk8iuPKVPkXKfkG2H6o&s"
            size="40"
            round={true}
          />
          <div className="ml-2 w-full">
            <div className="flex items-center">
              <h1 className="font-bold">{tweets?.userDetails[0]?.name}</h1>
              <p className="text-gray-500 text-sm ml-2">{`${tweets?.userDetails[0]?.username}`}</p>
            </div>
            <div>
              <p>{tweets?.description}</p>
            </div>

{/* like parts and comments section */}

            <div className="flex justify-between my-3">
          
              <div className="flex items-center">
                <div className="p-2 hover:bg-green-200 rounded-full cursor-pointer">
                <FaRegComment size={"20px"}/>
                </div>
                <p className="ml-1">0</p>                
              </div>


              <div className="flex items-center">
                <div onClick={()=>likeOrDisLikeHandler(tweets?._id)} className="p-2 hover:bg-pink-200 rounded-full cursor-pointer">
                < CiHeart  size={"20px"} />
                </div>
      
                <p  className="ml-1">{tweets?.like?.length}</p>
              </div>
              <div className="flex items-center">
                <div className="p-2 hover:bg-yellow-200 rounded-full cursor-pointer">
                <CiBookmark  size={"20px"}/>
                </div>
              
                <p className="ml-1">0</p>
              </div>

              {
                user._id === tweets?.userId && (
                  <div className="flex items-center">
                  <div onClick={()=>deleteChangeHandler(tweets?._id)} className="p-2 hover:bg-red-400 rounded-full cursor-pointer">
                  <MdOutlineDeleteOutline  size={"20px"}/>
                  </div>
                </div>
                )
              }


  
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tweet;
