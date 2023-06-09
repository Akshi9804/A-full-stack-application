import React from 'react'
import {useForm} from "react-hook-form"
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import {useState} from 'react'

function Register() {
	//error state
	let [error,setError]=useState("");
	let [file,setFile]=useState(null)

	//navigate
	const navigate=useNavigate();

	//use form hook
	let {register,handleSubmit,formState:{errors}}=useForm()

	//form submit
	let formSubmit=(userObj)=>{
		let fd=new FormData();
		//append newUser to form data
		fd.append("user",JSON.stringify(userObj));//converts to string
		//append selected file to form data
		fd.append("photo",file);//file==blob

		axios
		.post("http://localhost:4001/users-api/register-user",fd)
		.then((response)=>{
			console.log(response.status===201)
			if(response.status===201){
				//navigate to login component
				navigate('/login')
			}
			if(response.status!==201){
				setError(response.data.message)
			}
		})
		.catch((err)=>{
			if(err.response){
				setError(err.message)
			}
			if(err.request){
				setError(err.message)
			}
			else{
				setError(err.message)
			}
		})
	}
	//on file select
	const onFileSelect=(e)=>{
		setFile(e.target.files[0])
	}

  return (
	<div>
		<p className='text-success display-2 text-center'>Register</p>
		{/*Form submission error */}
		{error.length!==0 && (
			<p className='display-5 text-danger text-center'>{error}</p>
		)}
		{/*User registration form */}
		<form className='w-50 mx-auto' onSubmit={handleSubmit(formSubmit)}>
			{/*Username field */}
			<div className='mb-3'>
				<label htmlFor='username'>Username</label>
				<input type="text" id="username" className='form-control'
				{...register("username",{required:true,minLength:"6"})}></input>
				{/*Validation error message */}
				{errors.username?.type==="required"&&<p className='text-danger'>Username is required</p>}
				{errors.username?.type==="minLength"&&<p className='text-danger'>Mininmun number of charanters should be 6</p>}
			</div>
			{/*email field */}
			<div className='mb-3'>
				<label htmlFor='email'>Email</label>
				<input type="text" id="email" className='form-control'
				{...register("email",{required:true,minLength:"10"})}></input>
				{/*Validation error message */}
				{errors.email?.type==="required"&&<p className='text-danger'>Email is required</p>}
				
			</div>
			{/*password field */}
			<div className='mb-3'>
				<label htmlFor='password'>Password</label>
				<input type="password" id="password" className='form-control'
				{...register("password",{required:true,minLength:"8"})}></input>
				{/*Validation error message */}
				{errors.password?.type==="required"&&<p className='text-danger'>Password is required</p>}
				{errors.password?.type==="minLength"&&<p className='text-danger'>Mininmun number of charanters should be 8</p>}
			</div>
			{/*dob field */}
			<div className='mb-3'>
				<label htmlFor='dob'>Date of Birth</label>
				<input type="date" id="dob" className='form-control'
				{...register("dob",{required:true})}></input>
				{/*Validation error message */}
				{errors.username?.type==="required"&&<p className='text-danger'>Date of birth is required</p>}
			</div>
			{/*image field */}
			<div className='mb-3'>
				<label htmlFor='image'>Select profile picture</label>
				<input type="file" id="image" className='form-control'
				{...register("image",{required:true})} onInput={onFileSelect}></input>
				{/*Validation error message */}
				{errors.username?.type==="required"&&<p className='text-danger'>Profile picture is required</p>}
			</div>
			<button type="submit" className='btn btn-success'>Register</button>
		</form>
	</div>
  )
}

export default Register