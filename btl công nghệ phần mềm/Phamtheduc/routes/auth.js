const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();

const USERS = require('../db.json').users; // Mock data

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  
  try {
    const user = USERS.find(u => u.username === username);
    if (!user || !await bcrypt.compare(password, user.password)) {
      return res.status(401).json({ error: 'Sai tài khoản/mật khẩu' });
    }

    const token = jwt.sign(
      { id: user.id, role: user.role }, 
      process.env.JWT_SECRET, 
      { expiresIn: '24h' }
    );
    
    res.json({
      token,
      user: { id: user.id, username: user.username, role: user.role }
    });
  } catch (error) {
    res.status(500).json({ error: 'Lỗi login' });
  }
});

module.exports = router;