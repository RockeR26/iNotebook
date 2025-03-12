import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import alertContext from '../Contexts/alertContext';


const Signup = () => {
    const{showAlert}=useContext(alertContext);
    let navigate=useNavigate();
    const [data,setData]=useState({email:"",password:"",name:"",cpassword:""});
    const  addUser= async(e) => {

        e.preventDefault();
        var myHeaders = {  
          "Content-Type": "application/json"
        }
    
        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body:JSON.stringify({email:data.email,password:data.password,name:data.name})
        }
        const res = await fetch(`http://localhost:4000/api/auth/signup`, requestOptions)
        var status=res.status;
        const response=await res.json();
        if (status===200){
            showAlert("New Account Created","success")
            localStorage.setItem("token",response);
            navigate("/");
        }else{
            showAlert(res.statusText,"danger")
            setData({email:"",password:"",name:""});
        }
    }
      const handleChange=(e)=>{
        setData({...data,[e.target.id]:e.target.value})
      }
    return (
        <div className='container'>
            <form onSubmit={addUser}>
                <h1 className='my-3'>Sign Up</h1>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Full Name</label>
                    <input type="text" className="form-control" id="name" aria-describedby="emailHelp" onChange={handleChange} value={data.name} minLength={3} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" aria-describedby="emailHelp" onChange={handleChange} value={data.email} required/>
                    
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" onChange={handleChange} value={data.password} minLength={6} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" id="cpassword" onChange={handleChange} value={data.cpassword} minLength={6} required/>
                    <div id="emailHelp" className="form-text">{data.cpassword.length>=1&&((data.cpassword===data.password)?<span className='text-success'>Passords match</span>:<span className='text-danger'>Paswords Dont match</span>)}</div>
                </div>
                <button type="submit" className="btn btn-primary" disabled={data.cpassword!==data.password}>Submit</button>
            </form>

        </div>
    )
}

export default Signup
