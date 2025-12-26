import React, { useState } from "react";
import {useNavigate} from "react-router-dom"
import axios from "axios";


function LoginPage(){
    const navigate = useNavigate();
    const[loginData, setLogin]=useState(
        {email:"",password:""}
    )
    const[logged,setlogged]=useState(false)
    const handleChange=  (e) => {
        setLogin({...loginData, [e.target.name]: e.target.value});
    };
    const handleSubmit = async(e)=>{
        e.preventDefault();
        console.log(loginData)
        const res = await axios.post("https://localhost:7218/api/Auth/login",loginData);
        const tokens=res.data.token;
        localStorage.setItem("token",tokens);
        localStorage.setItem("user",JSON.stringify(res.data));
        // console.log(JSON.parse(localStorage.getItem("user")).AccountNum);
       
        const token=localStorage.getItem("token");
        if(token){
            navigate("/BankManagement");
        }
        // console.log(res.data);
    }

    return(
        <>
        <div className="header">
        <h1>Online Banking Management</h1>
      </div>

      <div className="form">
        <form onSubmit={handleSubmit}>
          <label>Email :</label>
          <input
            type="email"
            name="email"
            value={loginData.email}
            // onChange={handleChange}
            onChange={(e)=>setLogin({...loginData,email:e.target.value})}
          /><br /><br />

          <label>Password :</label>
          <input
            type="password"
            name="password"
            value={loginData.password}
            onChange={handleChange}
          /><br /><br />

          <button type="submit">Login</button>
        </form>

        <p>
          New User ?
          <span
            style={{ color: "blue", cursor: "pointer", marginLeft: "5px" }}
            onClick={() => navigate("/register")}
          >
            Register
          </span>
        </p>
      </div>
        </>
    )
    

}
export default LoginPage; 
