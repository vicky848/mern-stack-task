const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const User = require('../models/User');


router.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User with this email already exists' });
    }

   
    const hashedPassword = await bcrypt.hash(password, 10);

    
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    
    await newUser.save();

    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });


    res.status(201).json({ message: 'User created successfully',token });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.post('/signin', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }
  
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }
  
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  
      res.status(200).json({ token, user: { id: user._id, username: user.username, email: user.email } });
    } catch (error) {
      console.error('Error signing in user:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });


  router.post('/forgot-password', async (req, res) => {
    const { email } = req.body;
  
    try {
      
      const user = await User.findOne({ email });
      if (!user) {
       
        return res.status(200).json({ message: 'Password reset email sent' });
      }
  
     
      const resetToken = crypto.randomBytes(20).toString('hex');
      
      const tokenExpiration = Date.now() + 3600000; 
  
     
      user.resetToken = resetToken;
      user.resetTokenExpiration = tokenExpiration;
      await user.save();
  
      
      const transporter = nodemailer.createTransport({
       

        service: 'gmail',
        auth: {
          user: 'your_email@gmail.com', 
          pass: 'your_password' 
        }
      });
  
      const mailOptions = {
        from: 'your_email@gmail.com',
        to: email,
        subject: 'Password Reset',
        text: `You are receiving this email because you (or someone else) have requested the reset of the password for your account.\n\n`
              + `Please click on the following link, or paste this into your browser to complete the process:\n\n`
              + `http://localhost:3000/reset-password/${resetToken}\n\n`
              + `If you did not request this, please ignore this email and your password will remain unchanged.\n`
      };
  
      await transporter.sendMail(mailOptions);
  
      res.status(200).json({ message: 'Password reset email sent' });
    } catch (error) {
      console.error('Error sending password reset email:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  router.post('/reset-password/:token', async (req, res) => {
    const { token } = req.params;
    const { newPassword } = req.body;
  
    try {
     
      const user = await User.findOne({
        resetToken: token,
        resetTokenExpiration: { $gt: Date.now() } 
      });
  
      if (!user) {
        return res.status(400).json({ message: 'Invalid or expired token' });
      }
  
    
      const hashedPassword = await bcrypt.hash(newPassword, 10);
  
     
      user.password = hashedPassword;
      user.resetToken = undefined;
      user.resetTokenExpiration = undefined;
      await user.save();
  
      res.status(200).json({ message: 'Password reset successfully' });
    } catch (error) {
      console.error('Error resetting password:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  




module.exports = router;
