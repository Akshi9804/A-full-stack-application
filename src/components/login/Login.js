import {useNavigate} from 'react-router-dom'
import React,{useContext,useEffect} from 'react'
import {useForm} from "react-hook-form"
import { loginContext } from '../../contexts/loginContext';

function Login() {

	let [currentUser,error,userLoginStatus,loginUser,logoutUser]=useContext(loginContext)
	let {register,handleSubmit,formState:{errors}}=useForm()
	const navigate=useNavigate();
	//form submit
	let handleUserLogin=(userObj)=>{
		loginUser(userObj)
	}

	useEffect(()=>{
		if(userLoginStatus===true){
		navigate('/user-profile')
	}
	},[userLoginStatus])
  return (
	<div>
		<p className='text-success display-2 text-center'>Login</p>
		{/*Form submission error */}
		{error.length!==0 && 
		(<p className='text-danger text-center'>{error}</p>)}
		{/*User registration form */}
		<form className='w-50 mx-auto' onSubmit={handleSubmit(handleUserLogin)}>
			{/*Username field */}
			<div className='mb-3'>
				<label htmlFor='username'>Username</label>
				<input type="text" id="username" className='form-control'
				{...register("username",{required:true,minLength:"6"})}></input>
				{/*Validation error message */}
				{errors.username?.type==="required"&&<p className='text-danger'>Username is required</p>}
				{errors.username?.type==="minLength"&&<p className='text-danger'>Mininmun number of charanters should be 6</p>}
			</div>

			{/*password field */}
			<div className='mb-3'>
				<label htmlFor='password'>Password</label>
				<input type="password" id="password" className='form-control'
				{...register("password",{required:true,minLength:"8"})}></input>
				{/*Validation error message */}
				{errors.username?.type==="required"&&<p className='text-danger'>Password is required</p>}
				{errors.username?.type==="minLength"&&<p className='text-danger'>Mininmun number of charanters should be 8</p>}
			</div>
			<button type="submit" className='btn btn-success'>Login</button>
		</form>
	</div>
  )
}

export default Login