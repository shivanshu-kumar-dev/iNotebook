const jwt = require('jsonwebtoken');
const JWT_SECRET='letslearnnodejswithharry'

// const fetchuser=(req,res,next)=>{
//     const token=req.header('auth-token')
//     if(!token){
//         res.status(401).send({error:"please authenticate the valid token"})
//     }
//     try {
//         const data=jwt.verify(token,JWT_SECRET)
//         req.user=data
//         next()
//     } catch (error) {
//         res.status(401).send({error:"please authenticate the valid token"})
//     }
// }
const fetchuser = (req, res, next) =>
  //Get user frm jwt token and add id to req object
  {
    const token = req.header("auth-token");

    if (!token) {
      res.status(401).send({ error: "Invalid Token" });
    }
    try {
      const data = jwt.verify(token, JWT_SECRET);

      req.user = data.user;

      next();
    } catch (error) {
      res.status(401).send({ error: "Please authenticate with a valid token" });
    }
  };

module.exports=fetchuser;