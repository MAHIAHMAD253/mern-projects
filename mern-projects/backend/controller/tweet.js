import { Tweet } from "../model/twitter.js";
import { User } from "../model/user.js";

export const tweet = async (req, resp) => {
  try {
    const { description, id } = req.body; // id ho gi login user ki  than craerte the tweeet

    if (!description || !id) {
      return resp.status(401).json({ message: "Some fields are missing" });
    }
    const user = await User.findById(id).select("-password")
    await Tweet.create({
      description,
      userId: id,
      userDetails:user
    });

    return resp
      .status(201)
      .json({ message: "Tweet created successfully", success: true });
  } catch (error) {
    console.log(error);
    return resp
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

export const deleteTweet = async (req, resp) => {
  try {
    const {id} = req.params;
    const delTweet = await Tweet.findByIdAndDelete(id);
  
    return resp
      .status(200)
      .json({
        message: "your delete tweet eare successfully",
        delTweet,
        success: true,
      });
  } catch (error) {
    console.log(error)
  }
};

export const likeOrDisLike = async (req, resp)=>{
  try {
    const LoggedInUser = req.body.id; // user ki id asad 
    const tweetId = req.params.id
    const tweet = await Tweet.findById(tweetId);

    if(tweet.like.includes(LoggedInUser)){

      await Tweet.findByIdAndUpdate(tweetId,{$pull: { like : LoggedInUser }})
      return resp.status(200).json({message:"User disLike your Tweeet"})
    } else {
      await Tweet.findByIdAndUpdate(tweetId,{$push: {like: LoggedInUser}})
      return resp.status(200).json({message:"User Like your Tweeet"})
    }
  } catch (error) {
    console.log(error)
  }
}

// i

export const getAllTweet = async (req, resp)=>{

  // loggedUser ki tweet chahiye or following user ki tweet
  try {
    const id = req.params.id; 
    const loggedInUser = await User.findById(id);// asad login
    const loggedInUserTweet = await Tweet.find({userId:id});
    const followingUserTweet = await Promise.all(loggedInUser.following.map((otherUserId)=>{
      return Tweet.find({userId:otherUserId})
    }))
    return resp.status(200).json({tweet:loggedInUserTweet.concat(...followingUserTweet)})
  } catch (error) {
    console.log(error)
  }
}

export const getFollowingTweet = async (req, resp)=>{
  try {
    const id = req.params.id;// login user ki ki id 
    const loggedInUser = await User.findById(id);
    const followingTweet = await Promise.all(loggedInUser.following.map((otherId)=>{
      return Tweet.find({userId:otherId})
    }));
    return resp.status(200).json({tweet:[].concat(...followingTweet)})
  } catch (error) {
    console.log(error)
  }
}


