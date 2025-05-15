import { use } from "react";
import User from "../model/User.js"; 
import bcrypt from 'bcrypt';

async function Get_Users(req, res) {
    try {
      console.log('Fetching users...');
      const users = await User.find();
      console.log('Users fetched:', users.length);
  
      if (users.length === 0) {
        return res.status(404).json({ message: "There are no users" });
      }
  
      res.status(200).json(users);
    } catch (e) {
      console.error(`Error: ${e.message}`);
      res.status(500).json({ message: "Server error" });
    }
  }
  

async function CreateUser(req, res) {
  try {
     console.log(req.body)
    const { name, password, email, avatar  } = req.body;

    const { admin } = req.params;
    console.log('Admin:', admin);
    

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email is already registered' });
    }


    const salt = await bcrypt.genSalt(10); 
    const hashedPassword = await bcrypt.hash(password, salt); 

    
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      avatar: avatar || 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y', 
      Role : admin ? 'admin' : 'user'
    });

    await newUser.save();

    console.log(newUser);


    res.status(201).json({
      message: 'User created successfully',
      user: {
        _id : newUser._id,
        name: newUser.name,
        email: newUser.email,
        avatar: newUser.avatar,
      },
    });
  } catch (e) {
    console.error('Error creating user:', e);
    res.status(500).json({ message: 'Server error' });
  }
}



async function SetAdmin(req, res) {
    try {
      const { _id } = req.body;

      console.log(_id,'Set admin')  
      const user = await User.findOne({ _id });
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      
      user.Role = 'admin';
  
      await user.save();
  
      res.status(200).json({
        message: 'User role updated to admin',
        user: {
          _id : user._id,
          name: user.name,
          email: user.email,
          role: user.Role,
        },
      });
    } catch (e) {
      console.error('Error setting admin role:', e);
      res.status(500).json({ message: 'Server error' });
    }
  }
  

async function GetUser(req, res) {
    try {
      const { email, password } = req.body;
      
      if (!email || !password) {
      
        return res.status(400).json({ message: 'Email and password are required' });
      }
      console.log('getUser')
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
  
      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid password' });
      }
  
      res.status(200).json({
        message: 'Login successful',
        user: {
          _id : user._id,  
          name: user.name,
          email: user.email,
          avatar: user.avatar,
          role: user.Role,
        }
      });
  
    } catch (e) {
      console.error('Error during login:', e);
      res.status(500).json({ message: 'Server error' });
    }
  }

  async function deleteUser(req, res) {
    try {
      const { _id } = req.body;  
  
      const result = await User.findByIdAndDelete(_id);  
  
      if (!result) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.status(200).json({ message: 'User deleted successfully' });
    } catch (e) {
      console.error(e);
      res.status(500).json({ message: 'Server error' });
    }
  }
  


export default {
    Get_Users,
    CreateUser,
    SetAdmin,
    GetUser,
    deleteUser
}   
