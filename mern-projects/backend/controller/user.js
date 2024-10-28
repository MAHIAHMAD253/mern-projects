import { User } from "../model/user.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { Tweet } from "../model/twitter.js";

export const register = async (req, resp) => {
  try {
    const { name, username, email, password } = req.body;
  

    const user = await User.findOne({ email });
    if (user) {
      return resp
        .status(400)
        .json({ message: "user already exists", success: false });
    }

    const hashPassword = await bcryptjs.hash(password, 10);

    await User.create({
      name,
      username,
      email,
      password: hashPassword,
    });

    return resp
      .status(200)
      .json({message: "user register successfully !!", success: true });
  } catch (error) {
    console.log(error);
  }
};

// export const login = async (req, resp) => {
//   try {
//     const { email, password } = req.body;
//     if (!email || !password) {
//       return resp.status(401).json({ message: "some filed are missing" });
//     }

//     const user = await User.findOne({ email });
//     if (!user) {
//       return resp.status(401).json({ message: "this email user are not foud" });
//     }

//     const isPasswordMatch = await bcryptjs.compare(password, user.password);
//     if (!isPasswordMatch) {
//       return resp
//         .status(401)
//         .json({ message: "doest not match the password " });
//     }

//     const tokenData = {
//       userId: user._id,
//       };

//     const token = jwt.sign(tokenData, process.env.SECRET_KEY, {
//       expiresIn: "1d",
//     });

//     const userResp = {
//       _id: user._id,
//       name: user.name,
//       username: user.user,
//       email: user.email,
//     };
//     return resp
//       .status(200)
//       .cookie(token, { httpOnly: true, sameSite: "strick" })
//       .json({
//         message: "this user are login",
//         success: true,
//         user: userResp
//       });
//   } catch (error) {
//     console.log(error);
//   }
// };

export const login = async (req, resp) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return resp.status(401).json({ message: "Some fields are missing" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return resp.status(401).json({ message: "This email user is not found" });
    }

    const isPasswordMatch = await bcryptjs.compare(password, user.password);
    if (!isPasswordMatch) {
      return resp.status(401).json({ message: "Password does not match" });
    }

    const tokenData = {
      userId: user._id,
    };

    const token = jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: "1d" });

    const userResp = {
      _id: user._id,
      name: user.name,
      username: user.username,  // fixed this typo too, should be user.username, not user.user
      email: user.email,
    };

    return resp
      .status(200)
      .cookie("token", token, { httpOnly: true, sameSite: "Strict" })
      .json({
        message: "User logged in successfully",
        success: true,
        user: userResp
      });
  } catch (error) {
    console.log(error);
    return resp.status(500).json({ message: "Internal server error" });
  }
};


export const logout = async (req, resp) => {
  try {
    return resp.status(200).cookie("token", "", { maxAge: 0 }).json({
      message: "Logged out successFully",
      success: true,
    });
  } catch (error) {
    return resp.status(500).json({ message: "internal server" });
  }
};

export const bookMark = async (req, resp)=>{
  try {
    const LoggedInUser = req.body.id; // user ki id 
    const tweetId = req.params.id
    const tweet = await Tweet.findById(tweetId);

    if(tweet.like.includes(LoggedInUser)){

      await Tweet.findByIdAndUpdate(tweetId,{$pull: { like : LoggedInUser }})
      return resp.status(200).json({message:"Remove from bookmark"})
    } else {
      await Tweet.findByIdAndUpdate(tweetId,{$push: {like: LoggedInUser}})
      return resp.status(200).json({message:"Save your bookmark"})
    }
  } catch (error) {
    console.log(error)
  }
}

export const getMyProfile = async (req, resp)=>{
  try {
    const userId = req.params.id; // loggged user by id 
    const user = await User.findById(userId).select("-password"); 
    if(!user){
      return resp.status(401).json({message:"userId not found"})
    }
    return resp.status(200).json({user, success: true})
  } catch (error) {
console.log(error)
  }
}

export const otherUser = async (req , resp)=>{
  try {
    const id = req.params.id;
    const otherUser = await User.find({_id:{$ne:id}}).select("-password")
    if(!otherUser){
      return resp.status(401).json({message:"other user not fou d"})
    }
    return resp.status(200).json({otherUser, success:true})
  } catch (error) {
    console.log(error)
  }
}

export const follower = async (req, resp)=>{
  try {
    const loggedUserId = req.body.id; // asad login user id ha
    const userId = req.params.id; //  ahamd user id han 
    const LoggedInUser = await User.findById(loggedUserId);
    const user = await User.findById(userId) 

if(!user.followers.includes(loggedUserId)){ // asad 
  await user.updateOne({$push:{followers: loggedUserId}})
  await LoggedInUser.updateOne({$push:{following: userId}})
} else {
  return resp.status(400).json({message:`USer already followed to${user.name}`,sucess:true})
}
 return resp.status(200).json({message:`${LoggedInUser.name} just follow to ${user.name}`, success:true})

  } catch (error) {
    console.log(error)
  }
}

export const unFollow = async (req, resp)=>{
  try {
    const loggedInUserId = req.body.id;
    const UserId = req.params.id;
    const LoginUser = await User.findById(loggedInUserId); // ahmad ki id 
    const user = await User.findById(UserId) // saad ki params my id di han 

    if(LoginUser.following.includes(UserId)){ // saad 
      await user.updateOne({$pull:{followers:loggedInUserId}})
      await LoginUser.updateOne({$pull:{following:UserId}})
    } else {
      return resp.status(400).json({message:` user yet follower${user.name}`,sucess:true})
    }
     return resp.status(200).json({message:`${LoginUser.name} just unfollow to ${user.name}`, success:true})

  } catch (error) {
    console.log(error)
  }
}