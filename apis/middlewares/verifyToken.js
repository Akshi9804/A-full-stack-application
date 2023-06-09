//import jwt
const jwt=require("jsonwebtoken")

//import .env
require('dotenv').config()

const verifyToken=(request,response,next)=>{
	//token verification
	//get bearer
	let bearerToken=request.headers.authorization;

	//if bearer doesn't exist
	if(bearerToken===undefined){
		response.send({message:"Unauthorized request"})
	}
	//if bearer exist
	else{
		//get token
		let token=bearerToken.split(" ")[1]
		try{
			jwt.verify(token,process.env.SECRET_KEY)
			next()
		}catch(err){
			response.send({message:err.message})
		}
	}
}

//export
module.exports=verifyToken;