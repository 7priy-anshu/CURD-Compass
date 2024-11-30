import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Users.css'; // Import the CSS file

const Users = () => {
  const [users, setUsers] = useState([]);

  // Fetch users when the component mounts
  useEffect(() => {
    axios.get('http://localhost:3001')
      .then(result => setUsers(result.data))
      .catch(error => console.error(error));
  }, []);

  // Delete function
  const handleDelete = (id) => {
    axios.delete(`http://localhost:3001/deleteUser/${id}`)
      .then(res => {
        console.log(res);
        window.location.reload(); // Add parentheses to reload the page after deletion
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
      <div className="table-container">
        <Link to="/create" className="btn btn-success mb-3">Add +</Link>
        <table className="table">
          <thead>
            <tr>
              <th>No.</th>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Age</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {
              users.map((user, index) => (
                <tr key={user._id}>
                  <td>{index + 1}</td> {/* Display the serial number */}
                  <td>{user._id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.age}</td>
                  <td>
                    <div className="action-btns">
                      <Link to={`/update/${user._id}`} className="btn btn-success">Update</Link>
                      <button 
                        className="btn btn-danger" 
                        onClick={() => handleDelete(user._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
