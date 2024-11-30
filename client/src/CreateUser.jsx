import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './CreateUser.css';

const CreateUser = () => {
  const [name, setName] = useState(''); // State for the user's name
  const [email, setEmail] = useState(''); // State for the user's email
  const [age, setAge] = useState(''); // State for the user's age
  const navigate = useNavigate(); // Hook to navigate between routes

  const submit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Send a POST request to create a new user
    axios
      .post('http://localhost:3001/createUser', { name, email, age })
      .then((result) => {
        console.log(result);
        navigate('/'); // Redirect to the home page after successful submission
        alert('User created successfully!'); // Show success alert
      })
      .catch((err) => {
        console.log(err);
        alert('An error occurred. Please try again.'); // Show error alert
      });
  };

  return (
    <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
      <div className="form-container">
        <form onSubmit={submit}>
          <h2>Add User</h2>
          <div className="mb-2">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              placeholder="Enter Name"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-2">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              placeholder="Enter Email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-2">
            <label htmlFor="age">Age</label>
            <input
              type="number"
              placeholder="Enter Age"
              className="form-control"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              required
            />
          </div>
          <button className="btn btn-success">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default CreateUser;
