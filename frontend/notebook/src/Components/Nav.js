import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import alertContext from "../Contexts/alertContext";


const Nav = () => {
  const { showAlert } = useContext(alertContext)
  const [name,setName]=useState("")
  let location = useLocation();
  let navigate = useNavigate();
  const logout = (e) => {
    e.preventDefault();
    showAlert("Logged out Sucessfully", "primary")
    localStorage.removeItem("token");
    navigate("/login");
  }

  useEffect(()=>{
     const getUser = async () => {
    var myHeaders = {
      "Content-Type": "application/json",
      "auth-token": localStorage.getItem("token")
    }

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
    }
    const res = await fetch(`http://localhost:4000/api/auth/getuser`, requestOptions)
    const response = await res.json();
    setName(response.name)

  }
  getUser();
  })


  return (
    <>
    <nav className="navbar navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
      <div className="container-fluid sticky-top">
        <Link className="navbar-brand" to="/">
          Navbar
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} aria-current="page" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === "/about" ? "active" : ""}`} to="/about">
                About
              </Link>
            </li>
          </ul>
          <form className="d-flex" role="search">
            {(localStorage.getItem('token') !== null) ? (<><Link><span class="badge text-bg-light mx-2 py-2"><i class="fa-solid fa-user"></i>  {name}</span><button className="btn btn-primary mx-2" onClick={logout} >
               Logout
            </button></Link></>) : (<>
              <Link to="/login"><button className="btn btn-primary mx-1" disabled={location.pathname === "/login"}>
                Login
              </button>
              </Link>
              <Link to="/signup"> <button className="btn btn-primary mx-1" disabled={location.pathname === "/signup"}>
                Sign Up
              </button></Link>
            </>)}
          </form>
        </div>
      </div>
    </nav>
    </>
  );
};

export default Nav;
