const jwt=require("jsonwebtoken");
const userModel = require("../models/userModel");
const verifyToken = (req, res, next) => {
    const token = req.headers.token;
  
    if (!token) {
      return res.status(401).send('Access token not provided');
    }
  
    try {
      const decoded = jwt.verify(token,"this is a secret key");
      req.user = decoded;
      next();
    } catch (error) {
      return res.status(401).send('Access token invalid');
    }
  };

const authorization=async (req,res,next)=>{
    try{
    let token=req.headers.token
    const decoded = jwt.verify(token,"this is a secret key");
    let userId=req.params.userId
    const user=await userModel.findOne({_id:userId})
    if(!user) res.status(403).send({status:false,messege:"no user exist with this userId"});
    if(decoded.userId!==user.userId) res.status(403).send({message:"you are not authorized"})
    next();
    }catch(err){
        return res.status(403).send(err);
    }
    
}

  module.exports={verifyToken,authorization}
  