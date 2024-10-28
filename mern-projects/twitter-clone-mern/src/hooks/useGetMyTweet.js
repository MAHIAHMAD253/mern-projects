import axios from "axios";
import { TWEET_END_POINT_API } from "../../utils/constant";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAllTweet } from "../redux/TweetSlice";

const useGetMyTweet = (id) => {
  const { refresh, isActive } = useSelector((store) => store.tweet);
  const { user } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const fetchMyTweet = async () => {
    try {
      const res = await axios.get(`${TWEET_END_POINT_API}/alltweet/${id}`, {
        withCredentials: true,
      });
      dispatch(setAllTweet(res.data.tweet));
    } catch (error) {
      console.log(error);
    }
  };

  const FollowingChangeHandler = async () => {
    try {
      const res = await axios.get(
        `${TWEET_END_POINT_API}/allfollowing/${user?._id}`,
        {
          withCredentials: true,
        }
      );
      dispatch(setAllTweet(res.data.tweet));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isActive) {
      fetchMyTweet();
    } else {
      FollowingChangeHandler();
    }
  }, [isActive,refresh]);
};

export default useGetMyTweet;
