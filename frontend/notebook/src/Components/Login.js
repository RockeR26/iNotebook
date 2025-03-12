import React, { useContext, useState } from 'react'
import {useNavigate} from "react-router-dom"
import alertContext from '../Contexts/alertContext';

const Login = () => {
    const{showAlert}=useContext(alertContext);
    let navigate=useNavigate();
    const [data,setData]=useState({email:"",password:""});
    const  getUser= async(e) => {
        e.preventDefault();
        var myHeaders = {  
          "Content-Type": "application/json"
        }
    
        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body:JSON.stringify({email:data.email,password:data.password})
        }
        const res = await fetch(`http://localhost:4000/api/auth/login`, requestOptions)
        var status=res.status;
        const response=await res.json();
        if (status===200){
            showAlert("Logged in sucessfully","success");
            localStorage.setItem("token",response);
            navigate("/");
            
        }else{
            showAlert("Login Error: please check your credentials","danger");
            setData({email:"",password:""});
            
            
        }
        


      }
      const handleChange=(e)=>{
        setData({...data,[e.target.id]:e.target.value})
      }
    
    return (
        <>
        <div className='container my-3'>
            <form onSubmit={getUser}>
                <h1 className='my-3'>Login</h1>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" aria-describedby="emailHelp" onChange={handleChange} value={data.email} required/>
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" onChange={handleChange} value={data.password} required/>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
        </>
    )
}

export default Login
