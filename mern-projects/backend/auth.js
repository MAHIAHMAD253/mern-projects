


// import jwt from "jsonwebtoken";
// import dotenv from 'dotenv';
// dotenv.config()

// const isAuthenticated =  (req, resp, next) => {
//   try {
//     const token = req.cookies.token;
//     console.log(token); 
//     if (!token) {
//       console.log(token)
//       return resp.status(401).json({ message: "Token not found", success: false });
//     }

//     const decode = jwt.verify(token, process.env.SECRET_KEY); 
//     userId = decode.id
//     next();
//   } catch (error) {
//     console.log(error); 
//     return resp.status(500).json({ message: "Token verification failed", }); 
//   }
// };

// export default isAuthenticated;


import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config();

const isAuthenticated = (req, resp, next) => {
  try {
    const token = req.cookies.token;
    

    if (!token) {
      return resp.status(401).json({ message: "Token not found", success: false });
    }

    const decode = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decode.userId;  // Attach userId from token payload to request object
    next();
  } catch (error) {
    console.log(error);
    return resp.status(500).json({ message: "Token verification failed", error: error.message });
  }
};

export default isAuthenticated;
