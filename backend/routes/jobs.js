const express = require('express');
const { PrismaClient } = require('@prisma/client');
const { authMiddleware } = require('../middleware/authMiddleware');

const prisma = new PrismaClient();
const router = express.Router();

router.get('/', authMiddleware, async (req, res) => {
  const customerId = req.user.customerId;
  const { type = 'upcoming', page = 1, pageSize = 10 } = req.query;

  if (!['upcoming', 'past'].includes(type)) {
    return res.status(400).json({ message: 'Invalid job type' });
  }

  try {
    const skip = (parseInt(page) - 1) * parseInt(pageSize);

    const orders = await prisma.order.findMany({
      where: {
        customerId: customerId.toString(),
        status: type === 'upcoming' ? 'Open' : { not: 'Open' },
      },
      orderBy: { createdAt: 'desc' },
      skip,
      take: parseInt(pageSize),
      include: {
        items: true,
      },
    });

    res.json(orders);
  } catch (err) {
    console.error('🔴 Failed to fetch jobs:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
