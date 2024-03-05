import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom'; // Import useNavigate

export default function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState(""); // Added state for email
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSignUp = async (e) => {
    e.preventDefault();
    const backendUrl = "https://akw32cdnu2.execute-api.us-west-1.amazonaws.com/beta/register";
    const signUpData = {
      username,
      password,
      email
    };
    try {
      const response = await fetch(backendUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signUpData),
      });

      const data = await response.json();
      console.log(data)
      if (data.statusCode === 200) {
        console.log("Signup successful");
        navigate('/login'); // Use navigate to redirect to home page
      } else {
        console.error("Signup failed");
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };

  return (
    <div className='mainContainer'>
      <div className="form">
        <div className={'titleContainer'}>CREATE AN ACCOUNT</div>
        <br />
        <form>
          <div className='inputContainer'>
            <input
                type="text"
                id="username"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className='inputBox'
            />
            <br />
          </div>
          <div className='inputContainer'>
            <input
                type="text"
                id="email" // Fix the id to match the label
                placeholder="Enter your mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className='inputBox'
            />
            <br />
          </div>
          <div  className='inputContainer'>
            <input
                type="password"
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className='inputBox'
            />
            <br />
          </div>
          <div className='inputButton'>
            <input className={'inputButton'} type="button" onClick={handleSignUp} value={'SignUp'} />
          </div>
        </form>
        <p>
          Have an account ? <Link to="/login"> Login </Link>
        </p>
      </div>
    </div>
  );
}
