import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'

const Login = (props) => {
    const[credintial,setCredintial]=useState({email:"",password:""})
    let history=useNavigate()
    const handelSubmit=async(e)=>{
        e.preventDefault();
        const response=await fetch('http://localhost:5000/api/auth/login',{
            method:"POST",
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email:credintial.email,password:credintial.password})
        })
        const json=await response.json();
        console.log(json);
        if(json.success){
            //save the auth token and redirect 
            localStorage.setItem('token',json.authToken);
            history("/")
            props.showAlert("Login success","success")
        }else{
            props.showAlert("Invalid credintials","danger")
        }
    }
    const onChange=(e)=>{
        setCredintial({...credintial,[e.target.name]:e.target.value});
      }
    return (
        <div>
            <form onSubmit={handelSubmit}>
                <div  className="form-group">
                    <label  htmlFor="email">Email address</label>
                    <input type="email"  className="form-control" value={credintial.email} onChange={onChange} id="email" name='email' aria-describedby="emailHelp" placeholder="Enter email" />
                    <small id="emailhelp"  className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div  className="form-group">
                    <label  htmlFor="password">Password</label>
                    <input type="password"  className="form-control" value={credintial.password} onChange={onChange} id="password" name='password' placeholder="Password" />
                </div>
                <button type="submit" className="btn btn-primary my-2">Submit</button>
            </form>
        </div>
    )
}

export default Login
