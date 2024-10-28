import Avatar from "react-avatar";
import { CiSearch } from "react-icons/ci"; import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
const RightSideBar = () => {


 const {otherUsers} = useSelector(store =>store.user)
  return (
    <div className="w-[25%]">
      <div className="bg-gray-100 flex items-center rounded-full outline-none py-3">
        <input
          className="bg-transparent outline-none px-2"
          type="text"
          placeholder="Search..."
        />
        <CiSearch sixe={"20px"} className="cursor-pointer" />
      </div>
      <div className="p-4 bg-gray-100 rounded-2xl my-4">
        <h1 className="font-bold text-lg">Who to follow</h1>


        {
          otherUsers?.map((user)=>{
            return(
              <div key={user?._id} className="flex items-center justify-between ">
          <div className="flex">
            <Avatar
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgdhxZSHGknkIVZ9zZ5i7WiwDXwcT_KRfpwF25Dk8iuPKVPkXKfkG2H6o&s"
              size="40"
              round={true}
            />
            <div className="ml-3">
              <h1 className="font-bold">{user?.name}</h1>
              <p className="text-sm">{`${user?.username}`}</p>
            </div>
          </div>
          <div>
            <Link to={`/profile/${user?._id}`}><button className="px-4 py-1 bg-black text-white rounded-full">Profile</button>
            </Link>
          </div>
        </div>
            )    
          })
        }
       
      </div>
    </div>
  );
};

export default RightSideBar;
