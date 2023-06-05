
import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import "./Login.css";
import SignUp from './Signup';
import Home from './Home';
import {IoLockClosedOutline} from "react-icons/io5";
import {IoPersonCircleSharp} from "react-icons/io5";


const LoginSignup = () => {
const [email, setEmail] = useState('');
const [showLoginForm, setShowLoginForm] = useState(true);
const [password, setPassword] = useState('');
// const [showForm, setShowForm] = useState(true);
const [showSignUp, setShowSignUp] = useState(false);
const [loginSuccess, setLoginSuccess] = useState(false);


const handleSubmit = (event) => {
event.preventDefault();
const credentials = {
email: email,
password: password
};

axios.post('http://localhost:4000/app/login', credentials)
.then(response => {
console.log(response.data);
setEmail('');
setPassword('');
setLoginSuccess(true);
// setShowForm(false);
 setShowLoginForm(false);
alert('Login Successful!');

})
.catch(error => {
alert('Enter A Valid Password or Password!');
console.log(error);
});
};

const handleEmailChange = (event) => {
setEmail(event.target.value);
};

const handlePasswordChange = (event) => {
setPassword(event.target.value);
};

    

    const handleSignUpClick = () => {
      setShowSignUp(true);
      setShowLoginForm(false);
    };

    // const navigate = useNavigate();
    const myStyle={
      backgroundImage:"url('https://img.freepik.com/free-vector/minimalist-white-background-with-neumorphic-circle_1017-39167.jpg?size=626&ext=jpg&ga=GA1.1.1499673303.1683873786&semt=ais')",
     
      height:'100vh',
      backgroundSize: '100%',
      backgroundRepeat: '',
      backgroundposition: 'center',
  };

  const formStyle = {
    width: '300px',
    padding: '120px', 
    backgroundColor: '#f1f1f1',
    marginCenter: '100px' 
  };
    
return (
  
  <div style={myStyle}>

{showLoginForm ? (
   
  <form style={formStyle} onSubmit={handleSubmit}>
    <label>
      <IoPersonCircleSharp/>Username:
      <input
        type='email'
        placeholder='Username'
        value={email}
        onChange={handleEmailChange}
        className='form-control form-group'
        required
      />
    </label><br />
    <label>
    <IoLockClosedOutline/> Password:
      <input
        type='password'
        placeholder='Password'
        value={password}
        onChange={handlePasswordChange}
        className='form-control form-group'
        required
      />
      
    </label><br />
    <button className='btn btn-danger btn-block'>Login</button>
    
    <li>
            {showLoginForm ? (
             <p>Don't have an account? <Link to onClick={handleSignUpClick}>Sign up</Link></p>
 
            ) : null}
          </li>
  </form>
) : (

  <>
    {showSignUp && <SignUp />}
    {loginSuccess && <Home />}
   
    
  </>
)}
</div>
);
};

export default LoginSignup;
