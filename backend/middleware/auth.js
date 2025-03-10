import jwt from 'jsonwebtoken'

const authUser = async (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1]; 

   if(!token){
    return res.status(401).json({success:false,message:"Unauthorized"})
 }
   

   try {
    
    const token_decode = jwt.verify(token, process.env.JWT_SECRET);
    req.body.userId = token_decode.id;
    next()
   } catch (error) {

    console.log(error);
    res.json({success:false, message:"Invalid Token"})
    
    
   }



}

export default authUser;