import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [usernameError, setusernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate



  const handleLogin = async (e) => {
    e.preventDefault(); // Prevents the default form submission behavior

    const apiEndpoint = 'https://akw32cdnu2.execute-api.us-west-1.amazonaws.com/beta/authenticate';
    const loginData = {
      username,
      password,
    };
    // Set initial error values to empty
    setusernameError('');
    setPasswordError('');

    // Check if the user has entered both fields correctly
    if ('' === username) {
      setusernameError('Please enter your username')
      return
    };

    if ('' === password) {
      setPasswordError('Please enter a password')
      return
    };

    if (password.length < 3) {
      setPasswordError('The password must be 4 characters or longer')
      return
    };

    try {
      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });


      const data = await response.json();
      if (data.statusCode === 401) {
        alert("Login failed! Please check your credentials.")
        throw new Error(`HTTP error! status: 401`);
      }
      // Handle your login success scenario, e.g., save tokens, redirect, etc.
      console.log('Login Successful:', data);
      Cookies.set('userId', username, { expires: 7, path: '/' });
      console.log(Cookies.get('userId'))
      alert("Login successfully!");
      navigate('/home'); // Use navigate to redirect to home page
      
    } catch (error) {
      setError('Login failed. Please check your credentials.');
      console.error('Error during login:', error);
    }


  };


  return (
    <div className='mainContainer'>
      <div className={'titleContainer'}>
        <div>Login</div> <br />
      </div>
      
        <div className='inputContainer'>
          <input
            type="username"
            placeholder="Enter your Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className='inputBox'
          />
          <label className="errorLabel">{usernameError}</label>
          <br />
          
        </div>
        
        <div className='inputContainer'>
            <input
              type="password"
              placeholder="Enter your Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='inputBox'
            />
            <label className="errorLabel">{passwordError}</label>
            <br />
        </div>
        
        <div className='inputButton'>
            <input className={'inputButton'} type="button" onClick={handleLogin} value={'Log in'} />
        </div>

        <div>
					Don't have an account ? <Link to="/signup"> Sign Up </Link>
				</div>
      {error && <p>{error}</p>}
    </div>
  );
}

export default Login;