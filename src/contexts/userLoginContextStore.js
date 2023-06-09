import React,{useState} from 'react'
import { loginContext } from './loginContext'
import axios from 'axios'


function UserLoginContextStore({children}) {
	//required states
	let [currentUser,setCurrentUser]=useState({})
	let [error,setError]=useState("")
	let [userLoginStatus,setUserLoginStatus]=useState(false)

	//userlogin
	const loginUser=(userCredObj)=>{
		axios.post("http://localhost:4001/users-api/login-user",userCredObj)
		.then((response)=>{
			if(response.status===201){
				//update current user
				setCurrentUser({...response.data.user})
				//update user login status
				setUserLoginStatus(true)
				//update error status
				setError("")
				//store jwt token in local or session storage
				localStorage.setItem("token",response.data.payload)
			}else{
				setError(response.data.message)
			}
		})
		.catch((err)=>{
			setError(err.message)
		})
	}

	//user logout 
	const logoutUser=()=>{
		//delete token from local or sessional storage
		localStorage.clear()
		//update user login status
		setUserLoginStatus(false)
	}

  return (
	<loginContext.Provider value={[currentUser,error,userLoginStatus,loginUser,logoutUser]}>
		{children}
	</loginContext.Provider>
  )
}

export default UserLoginContextStore