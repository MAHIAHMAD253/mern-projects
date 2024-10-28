import axios from "axios";
import { USER_END_POINT_API } from "../../utils/constant";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setOtherUser } from "../redux/userSlice";

const useOtherUser = (id) => {
    const dispatch = useDispatch()
    useEffect(()=>{
        const fetchOtherUser = async ()=>{
            try {
                const res = await axios.get(`${USER_END_POINT_API}/otherUser/${id}`,{
                    withCredentials:true
                });
                dispatch(setOtherUser(res.data.otherUser))
              } catch (error) {
                console.log(error);
              }
        }
        fetchOtherUser();
    },[])
};

export default useOtherUser