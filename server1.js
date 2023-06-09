//importing express module
const exp=require("express");
const app=exp();
//import .env
require('dotenv').config()
const port=process.env.PORT||4001

app.listen(port,()=>console.log("server running on port number 4001"));

//connect express with react build
const path=require("path")//core module
app.use(exp.static(path.join(__dirname,'./build')))

//get mongo client
const mclient=require("mongodb").MongoClient;
mclient.connect("mongodb://127.0.0.1:27017")
.then(dbRef=>{
	//get db
	dbObj=dbRef.db("usersdb");
	console.log("DB connected successfully");
	//get collection
	let registeredUsersCollection=dbObj.collection("registeredUsersCollection");
	app.set("registeredUsersCollection",registeredUsersCollection);
})
.catch(err=>{console.log("err in connecting to DB",err)})

//import userApi and productApi
const usersApi=require("./apis/usersApi")
const productsApi=require("./apis/productsApi.js")

//forward request to usersApi when url starts with /users-api
app.use("/users-api",usersApi);

//forward request to productsApi when url starts with /products-api
app.use("/products-api",productsApi)