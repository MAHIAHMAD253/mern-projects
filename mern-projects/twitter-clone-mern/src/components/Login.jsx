import { useState } from "react";
import axios from 'axios'
import { USER_END_POINT_API } from "../../utils/constant";
import {toast} from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/userSlice";


const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [input, setInput] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });

  const changeHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const loginSignHandler = () => {
    setIsLogin(!isLogin);
  };

  const submitHandler = async (e) =>{
    e.preventDefault();
    if(isLogin){
      // login
      try {
        const res = await axios.post(`${USER_END_POINT_API}/login`,input,{
          headers:{
            "Content-Type":  "application/json"
           },
           withCredentials: true,
        })
        if(res.data.success){
          navigate('/')
          dispatch(setUser(res?.data?.user))
          toast.success(res.data.message)
        }
      } catch (error) {
        console.log(error)
      }
    } else{
      //sign 
      try {
        const res = await axios.post(`${USER_END_POINT_API}/register`, input, {
         headers:{
          "Content-Type":  "application/json"
         },
         withCredentials: true,
        })
        if (res.data.success) {
          toast.success(res.data.message);
        }
      } catch (error) {
        console.log(error)
      }
    }
  }


  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <div className="flex items-center justify-evenly w-[80%]">
        <div>
          <img
            width={"400px"}
            className="ml-4"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzck30DLuKkhaiJLi65ZdPDodj6w9aPOiGJw&s"
            alt="twitter-logo"
          />
        </div>
        <div className="">
          <div className="my-5">
            <h1 className="font-bold  text-6xl">Happenning now .</h1>
          </div>
          <h1 className="mt-4 mb-2 text-2xl font-bold">
            {isLogin ? "Login" : "SignUp"}
          </h1>
          <form  onSubmit={submitHandler} className="flex flex-col w-[50%]">

          {!isLogin && (
            <>
            <input
              type="name"
              placeholder="user"
              name="name"
              value={input.name}
              onChange={changeHandler}
              className="outline-blue-500 border border-gray-800 px-3 py-2 rounded-full my-2 font-semibold"
            />
            <input
              type="username"
              placeholder="usrname"
              name="username"
              value={input.username}
              onChange={changeHandler}
              className="outline-blue-500 border border-gray-800 px-3 py-2 rounded-full my-2 font-semibold"
            />

            </>
          )}
      
              
                <input
                   type="email"
                   placeholder="email"
                   name="email"
                   value={input.email}
                   onChange={changeHandler}
                  className="outline-blue-500 border border-gray-800 px-3 py-2 rounded-full my-2 font-semibold"
                />
                <input
                  type="password"
                  placeholder="password"
                  name="password"
                  value={input.password}
                  onChange={changeHandler}
                  className="outline-blue-500 border border-gray-800 px-3 py-2 rounded-full my-2 font-semibold"
                />

            <button className="bg-[#1D9BF0] text-bold rounded-full hover:text-white px-3 py-2 border-none text-lg my-4">
              {isLogin? "Login" : "Create an Account"}
            </button>
            <h1>
              {isLogin
                ? "Do not have an account"
                : "Already have an account ?"}{" "}
              <span
                onClick={loginSignHandler}
                className="font-bold tect-blue-600 cursor-pointer"
              >
                {isLogin ? "SignUp" : "Login"}
              </span>
            </h1>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
