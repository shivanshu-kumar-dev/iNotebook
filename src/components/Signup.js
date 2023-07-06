import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'

const Signup = (props) => {
    const[credintial,setCredintial]=useState({name:"",email:"",password:"",cpassword:""})
    let history=useNavigate()
    const handelSubmit=async(e)=>{
        e.preventDefault();
        const {name,email,password}=credintial
        const response=await fetch('http://localhost:5000/api/auth/createuser',{
            method:"POST",
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name,email,password})
        })
        const json=await response.json();
        if(json.success){
            //save the auth token and redirect 
            localStorage.setItem('token',json.authToken);
            history("/")
            props.showAlert("Account created success","success")
        }else{
            props.showAlert("invalid credintials","danger")
        }
    }
    const onChange=(e)=>{
        setCredintial({...credintial,[e.target.name]:e.target.value});
      }
    return (
        <div className='container'>
            <form onSubmit={handelSubmit}>
                <div  className="form-group">
                    <label  htmlFor="name">Name</label>
                    <input type="text"  className="form-control" onChange={onChange} id="name" name='name' aria-describedby="emailHelp" placeholder="Enter email" />
                    <small id="emailHelp"  className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div  className="form-group">
                    <label  htmlFor="email">Email address</label>
                    <input type="email"  className="form-control" onChange={onChange} id="email" name='email' aria-describedby="emailHelp" placeholder="Enter email" />
                    <small id="emailHelp"  className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div  className="form-group">
                    <label  htmlFor="password">Password</label>
                    <input type="password"  className="form-control" onChange={onChange} id="password" name='password' placeholder="Password"/>
                </div>
                <div  className="form-group">
                    <label  htmlFor="cpassword">Confirm Password</label>
                    <input type="password"  className="form-control" onChange={onChange} id="cpassword" name='cpassword' placeholder="Password" />
                </div>
                <button type="submit"  className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Signup
