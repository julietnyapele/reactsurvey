

import React, { useState } from 'react';
import axios from 'axios';
import './Signup.css';
import { IoLockClosedOutline } from "react-icons/io5";
import { GrUserNew } from "react-icons/gr";
import Login from './LoginForm';

function SignUp() {
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signupSuccess, setsignupSuccess] = useState(false);
  const [showForm, setShowForm] = useState(true);

  const changeEmail = (event) => {
    setEmail(event.target.value);
  };

  const changePassword = (event) => {
    setPassword(event.target.value);
  };

  const changeConfirmPassword = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleButtonClick = () => {
    setShowForm(true);
  };

  const onSubmit = (event) => {
    event.preventDefault();

    if (!email || !password || !confirmPassword) {
      alert('Please SignUp.');
      return;
    }

    const registered = {
      email,
      password,
      confirmPassword,
    };

    axios
      .post('http://localhost:4000/app/signup', registered)
      .then((response) => {
        console.log(response.data);

        setEmail('');
        setPassword('');
        setConfirmPassword('');
        alert('User registered successfully');
        setsignupSuccess(true);
        setShowForm(false); // hide the form after successful registration
      })
      .catch((error) => {
        console.log(error.response.data.message);
        alert(error.response.data.message);
      });
  };

  return (
    <div>
      {showForm && (
        <form onSubmit={onSubmit}>
          <label>
            <GrUserNew /> E-Mail Address
            <input
              type="email"
              placeholder="e.g juliet@gmail.com"
              onChange={changeEmail}
              value={email}
              className="form-control form-group"
            />
          </label>
          <br />
          <label>
            <IoLockClosedOutline /> Password:
            <input
              type="password"
              placeholder="password"
              onChange={changePassword}
              value={password}
              className="form-control form-group"
            />
          </label>
          <br />
          <label>
            <IoLockClosedOutline /> Confirm Password:
            <input
              type="password"
              placeholder="Confirm password"
              onChange={changeConfirmPassword}
              value={confirmPassword}
              className="form-control form-group"
            />
          </label>
          <br/>
          <input
            type="submit"
            className="btn btn-danger btn-block"
            onClick={handleButtonClick}
            value="SignIn"
          />
        </form>
      )}
      
      {signupSuccess &&  <Login /> } 
    </div>
  );
}

export default SignUp;

