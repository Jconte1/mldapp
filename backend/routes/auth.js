const express = require('express');
const bcrypt = require('bcryptjs');
const { generateToken } = require('../utils/jwt');

const router = express.Router();

const users = [
  {
    email: 'test@company.com',
    passwordHash: bcrypt.hashSync('password123', 10),
    customerId: 'BA0000021',
    name: 'Test User',
    status: 'approved'
  }
];

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email);

  if (!user) return res.status(401).json({ message: 'Invalid credentials' });

  const match = await bcrypt.compare(password, user.passwordHash);
  if (!match) return res.status(401).json({ message: 'Invalid credentials' });

  if (user.status !== 'approved') {
    return res.status(403).json({ message: 'User is not approved yet' });
  }

  const token = generateToken({
    email: user.email,
    customerId: user.customerId,
    name: user.name,
  });

  return res.json({ token });
});

module.exports = router;

