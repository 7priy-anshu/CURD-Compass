const express = require('express');  // Import express for server handling
const mongoose = require('mongoose'); // Import mongoose for MongoDB connection
const cors = require('cors');         // Import cors to handle cross-origin requests
const UserModel = require('./models/Users'); // Import the User model

const app = express();  // Create an express app

app.use(cors());        // Enable cross-origin requests
app.use(express.json()); // Allow express to parse JSON request bodies

// Connect to MongoDB and handle connection errors
mongoose.connect("mongodb://127.0.0.1:27017/crud", {
  useNewUrlParser: true, 
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB')) // Success message
.catch(err => console.error('Error connecting to MongoDB:', err)); // Error message

// Get all users
app.get('/', (req, res) => {
  UserModel.find({})  // Find all users
    .then(users => res.json(users)) // Send users as JSON
    .catch(err => res.json(err)); // Handle errors
});

// Get a specific user by ID
app.get('/getUser/:id', (req, res) => {
  const id = req.params.id; // Get the user ID from the request
  
  UserModel.findById(id)  // Find the user by ID
    .then(user => {
      if (!user) return res.status(404).json({ message: "User not found" }); // If user not found
      res.json(user); // Return the user data
    })
    .catch(err => res.status(500).json({ error: err.message })); // Handle errors
});

// Update user by ID
app.put('/updateUser/:id', (req, res) => {
  const id = req.params.id; // Get user ID
  
  UserModel.findByIdAndUpdate(id, req.body, { new: true }) // Update user data
    .then(updatedUser => {
      if (!updatedUser) return res.status(404).json({ message: "User not found" }); // If not found
      res.json(updatedUser); // Return updated data
    })
    .catch(err => res.status(500).json({ error: err.message })); // Handle errors
});

// Create a new user using async/await
app.post('/createUser', async (req, res) => {
  try {
    const user = await UserModel.create(req.body); // Create new user
    res.status(201).json(user); // Send the created user with 201 status
  } catch (err) {
    res.status(400).json({ message: 'Error creating user', error: err }); // Handle errors
  }
});


 app.delete('/deleteUser/:id' ,  (req, res) =>{
  const id = req.params.id; // Get user ID
  UserModel.findByIdAndDelete({_id:id})
    .then(users => res.json(users))
    .catch(err => res.json(err))
 })



// Start the server on port 3001
app.listen(3001, () => {
  console.log('Server is running on port 3001');
});
