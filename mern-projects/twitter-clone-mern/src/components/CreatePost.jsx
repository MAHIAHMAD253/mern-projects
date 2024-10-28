import axios from "axios";
import { useState } from "react";
import Avatar from "react-avatar";
import { CiImageOn } from "react-icons/ci";
import { TWEET_END_POINT_API } from "../../utils/constant";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {setIsActive, setRefresh } from "../redux/TweetSlice";

const CreatePost = () => {
  const {user} = useSelector(store =>store.user)
  const {isActive} = useSelector(store => store.tweet)
  const [description, setDescription] = useState("");
  const dispatch = useDispatch()

  const changeHandler = (e) => {
    setDescription(e.target.value );
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${TWEET_END_POINT_API}/create`,{ description ,id:user?._id},{
        headers:{
          "Content-Type":  "application/json"
         },
         withCredentials: true,
      })
      if(res.data.success){
        dispatch(setRefresh())
        toast.success(res.data.message)
      }
    } catch (error) {
      console.log(error)
    }
  };

const forYouHandler =()=>{
  dispatch(setIsActive(true))
}
const FollowingHandler =()=>{
dispatch(setIsActive(false))
}


  return (
    <div className="w-[100%]">
      <div>
        <div className="flex items-center justify-between ">
          <div onClick={forYouHandler} className={`${isActive ? "border-b-4 border-blue-600": "border-b border-gray-300"} cursor-pointer hover:bg-gray-300 w-full text-center px-4 py-3`}>
            <h1 className="text-gray-600 text-bold font-semibold text-lg cursor-pointer">
              For You
            </h1>
          </div>
          <div onClick={FollowingHandler} className={`${!isActive ? "border-b-4 border-blue-600": "border-b border-gray-300"}  cursor-pointer hover:bg-gray-300 w-full text-center px-4 py-3`}>
            <h1 className="text-gray-600 text-bold font-semibold text-lg cursor-pointer">
              Following
            </h1>
          </div>
        </div>
        {/* lower div  */}
        <form onSubmit={submitHandler}>
        <div className="">
          <div className="flex items-center p-4">
            <div>
              <Avatar
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgdhxZSHGknkIVZ9zZ5i7WiwDXwcT_KRfpwF25Dk8iuPKVPkXKfkG2H6o&s"
                size="40"
                round={true}
              />
            </div>
           
              <input
                className="w-full outline-none border-none text-lg"
                type="name"
                value={description.name}
                onChange={changeHandler}
                placeholder="What is  happening ??"
              ></input>
          
          </div>

          <div className="flex items-center justify-between p-3 border-b border-gary-300">
            <div>
              <CiImageOn size="24px" />
            </div>

            <button className="bg-[#1D9BF0] text-white rounded-full px-4 py-1 border-none text-lg font-semibold">
              POST
            </button>
          </div>
        </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
