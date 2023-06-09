import React,{useContext} from 'react'
import {Link} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import { loginContext } from '../../contexts/loginContext';
function NavBar() {
  let [currentUser,error,userLoginStatus,loginUser,logoutUser]=useContext(loginContext)
  return (
    <div>
        <nav className="navbar navbar-expand-sm bg-body-tertiary bg-dark">
  <div className="container-fluid">
    <a className="navbar-brand text-success" id="link" href="/">UsersApp</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className="nav-link active text-white" id="link" to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link active text-white" id="link" to="/register">Register</Link>
        </li>
        {!userLoginStatus?(
		<li className="nav-item">
          <Link className="nav-link active text-white" id="link" to="/login">Login</Link>
        </li>):(
        <li className="nav-item">
          <Link className="nav-link active text-white" id="link" to="/login" onClick={logoutUser}>Logout</Link>
        </li>)}
		<li className="nav-item">
          <Link className="nav-link active text-white" id="link" to="/aboutus">AboutUs</Link>
        </li>
      </ul>
      
    </div>
  </div>
</nav>
    </div>
  )
}

export default NavBar