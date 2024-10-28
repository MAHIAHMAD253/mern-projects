import { useSelector } from "react-redux";
import CreatePost from "./CreatePost";
import Tweet from "./Tweet";

const Feed = () => {
  const { tweet } = useSelector((store) => store.tweet);
  return (
    <div className="w-[50%] border border-gray-200">
      <div>
        <CreatePost />
        {tweet?.map((tweets,index) => (
          <Tweet key={index?._id} tweets={tweets}/>
        ))}
      </div>
    </div>
  );
};

export default Feed;
