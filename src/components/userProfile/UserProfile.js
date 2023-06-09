import React,{useContext,useState} from 'react';
import { loginContext } from '../../contexts/loginContext';
import axios from 'axios';

function UserProfile() {
  let [currentUser,error,userLoginStatus,loginUser,logoutUser]=useContext(loginContext)
  let [err,setErr]=useState("");
  let [data,setData]=useState("");

  //get data from protected route
  const getProtectedData=()=>{
    let token=localStorage.getItem("token");
    axios.get("http://localhost:4001/users-api/test",{headers:{"Authorization":"Bearer "+token}})
    .then(response=>{
      setData(response.data.message)
    })
    .catch(err=>{
      setErr(err.message)
    })
  }

  return (
	<div>
    <p className='display-3 text-success text-center'>User Profile</p>
      <p className='text-center text-primary display-5'>Welcome {currentUser.username}!</p>
      <img src={currentUser.image} width="200px" className='d-block mx-auto'/>
      <button className='mt-3 btn btn-danger mx-auto d-block' onClick={getProtectedData}>Get Protected Data</button>
      {err? (<p>err</p>):(<p className='text-danger text-center display-5'>{data}</p>)}
     {/*Add links for products and cart here */}
  </div>
  )
}

export default UserProfile;