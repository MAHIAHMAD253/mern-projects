import axios from "axios";
import { USER_END_POINT_API } from "../../utils/constant";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setProfile } from "../redux/userSlice";

const useGetProfile = (id) => {
    const dispatch = useDispatch()
    useEffect(()=>{
        const fetchMyProfile = async ()=>{
            try {
                const res = await axios.get(`${USER_END_POINT_API}/profile/${id}`,{
                    withCredentials:true
                });
                dispatch(setProfile(res.data.user))
              } catch (error) {
                console.log(error);
              }
        }
        fetchMyProfile();
    },[id])
};

export default useGetProfile