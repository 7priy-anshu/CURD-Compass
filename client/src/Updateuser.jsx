import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './UpdateUser.css'; // Import the CSS file for styling

const UpdateUser = () => {
  const { id } = useParams(); // Get the `id` from the URL
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    axios.get(`http://localhost:3001/getUser/${id}`)
      .then(result => {
        setName(result.data.name);
        setEmail(result.data.email);
        setAge(result.data.age);
      })
      .catch(error => console.error(error)); // Handle errors
  }, [id]);

  const Update = (e) => {
    e.preventDefault(); // Prevent default form submission

    axios.put(`http://localhost:3001/updateUser/${id}`, { name, email, age })
      .then((result) => {
        console.log(result); // Log the result for debugging
        navigate('/'); // Navigate back to the home page
        alert("User updated successfully!"); // Show a success alert
      })
      .catch((err) => {
        console.log(err); // Log errors
        alert("An error occurred. Please try again."); // Show an error alert
      });
  };

  return (
    <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
      <div className="form-container">
        <form onSubmit={Update}>
          <h2>Update User</h2>
          <div className="mb-2">
            <label htmlFor="">Name</label>
            <input 
              type="text"  
              placeholder="Enter Name" 
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)} 
            />
          </div>
          <div className="mb-2">
            <label htmlFor="">Email</label>
            <input 
              type="email"  
              placeholder="Enter Email" 
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)} 
            />
          </div>
          <div className="mb-2">
            <label htmlFor="">Age</label>
            <input 
              type="number"  
              placeholder="Enter Age" 
              className="form-control"
              value={age}
              onChange={(e) => setAge(e.target.value)} 
            />
          </div>
          <button className="btn btn-success">Update</button> {/* Submit button */}
        </form>
      </div>
    </div>
  );
};

export default UpdateUser;
