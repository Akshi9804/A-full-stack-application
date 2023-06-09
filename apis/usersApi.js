//create express usersApi
const exp=require("express");
const usersApi=exp.Router();

//user api
//import express async handler
const expressAsyncHandler=require("express-async-handler")

//import bcryptjs
const bcryptjs=require("bcryptjs");

//import jwt
const jwt=require("jsonwebtoken")

//import multerObj
const multerObj=require("./middlewares/cloudConfig")

//import verifyToken
const verifyToken=require("./middlewares/verifyToken");
const { response } = require("express");

//body parser
usersApi.use(exp.json())

//import .env
require('dotenv').config()


//register user
//public route
usersApi.post("/register-user",multerObj.single('photo'),expressAsyncHandler(async(request,response)=>{

	//get collections object
	const registeredUsersCollection=request.app.get("registeredUsersCollection");

	//get user from client
	const newUser=JSON.parse(request.body.user);//request.body.user==string...so parse


	//check for duplicate user
	let userOfDB=await registeredUsersCollection.findOne({username:newUser.username});

	//if user existed
	if(userOfDB!==null){
		response.status(200).send({message:"user already existed"})
	}
	//if user doesn't exist
	else{
		//add CDN link of cloudinary image to user Object
		newUser.image=request.file.path;
		//hash the password
		let hashedPassword=await bcryptjs.hash(newUser.password,6);

		//replace password with hashed password
		newUser.password=hashedPassword;

		//insert in db
		await registeredUsersCollection.insertOne(newUser);
		response.status(201).send({message:"user registered"})
	}

}))

//protected route
usersApi.get("/test",verifyToken,(request,response)=>{
	response.send({message:"Message from protected route"})
})

//get user
//protected route
usersApi.get("/get-user/:username",verifyToken,expressAsyncHandler(async(request,response)=>{

	//get collections object
	const registeredUsersCollection=request.usersApi.get("registeredUsersCollection");

	//get username
	let usernameOfUrl=request.params.username;

	//find user by username
	let user=await registeredUsersCollection.findOne({username:usernameOfUrl});

	//send response
	response.status(200).send({message:"user",payload:user});
}))

//remove user
//protected user
usersApi.delete("/delete-user/:username",verifyToken,expressAsyncHandler(async(request,response)=>{

	//get collections object
	const registeredUsersCollection=request.usersApi.get("registeredUsersCollection");

	//get username
	let usernameOfUrl=request.params.username;

	//delete user
	await registeredUsersCollection.deleteOne({username:usernameOfUrl})

	//send response
	response.send({message:"user removed"})
}))

//user login
//public route
usersApi.post("/login-user",expressAsyncHandler(async(request,response)=>{

	//get collections object
	const registeredUsersCollection=request.app.get("registeredUsersCollection");

	//get user credentials
	let userCredentialsObj=request.body;
	console.log(userCredentialsObj)
	//find in db
	let userOfDB=await registeredUsersCollection.findOne({username:userCredentialsObj.username})

	//if username is invalid
	if(userOfDB===null){
		response.status(200).send({message:"Invalid username"})
	}
	//if username is valid
	else{
		//compare passwords
		let isEqual=await bcryptjs.compare(userCredentialsObj.password, userOfDB.password)

		//if passwords doesn't match
		if(isEqual===false){
			response.status(200).send({message:"Invalid password"})
		}
		//if passwords match
		else{
			//create JWT token
			let signedJWTToekn=jwt.sign({username:userOfDB.username},process.env.SECRET_KEY,{expiresIn:"1h"})

			//send token in response
			response.status(201).send({message:"Login success",payload:signedJWTToekn,user:userOfDB})

		}
	}
}))

//protected route
usersApi.get("/test",verifyToken,(request,response)=>{
	response.send({message:"Reply from protected route"})
})

//export module
module.exports=usersApi;