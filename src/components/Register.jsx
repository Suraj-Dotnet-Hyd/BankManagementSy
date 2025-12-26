import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    age: "",
    phone: "",
    email: "",
    password: "",
    occupation: "",
    accountType: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(formData);

    try{
        const res = axios.post("https://localhost:7218/api/Users",formData)
    }
    catch{
        if(!res.Ok)
        alert("Register failed")

    }

    alert("Registration Successful");
    navigate("/");
  };

  return (
    <>
      <div className="header">
        <h1>User Registration</h1>
      </div>

      <div className="form">
       
        <form onSubmit={handleSubmit}>
            <label>Enter Name </label>
            <input name="name" type="text" placeholder="Enter Name" onChange={handleChange}/><br></br>
            <label>Enter Email </label>
            <input name="email" type="email" placeholder="Enter Email" onChange={handleChange}/><br></br>
            <label>Enter age </label>
            <input name="age" type="number" placeholder="Enter Age" onChange={handleChange}/><br></br>
            <label>Enter Phone </label>
            <input name="Phone" type="Phone" placeholder="Enter Phone " onChange={handleChange}/><br></br>
            <label>Enter Occupation </label>
            <input name="occupation" type="text" placeholder="Enter occupation" onChange={handleChange}/><br></br>
            <label>Enter Password </label>
            <input name="password" type="password" placeholder="Enter Password" onChange={handleChange}/><br></br>
            <label>Account Type</label>
            <select name="AccountType" onChange={handleChange}>
                <option>Salary</option>
                <option>Savings</option>
                <option>Current</option>
                <option>Zero Account</option>
            </select>
            <br></br>
            <button type="submit">Register</button>
        </form>

        <p>
          Already have an account?
          <span
            style={{ color: "blue", cursor: "pointer", marginLeft: "5px" }}
            onClick={() => navigate("/")}
          >
            Login
          </span>
        </p>
      </div>
    </>
  );
}

export default Register;
