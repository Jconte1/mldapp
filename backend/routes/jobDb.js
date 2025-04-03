const express = require('express');
const { PrismaClient } = require('@prisma/client');
const { authMiddleware } = require('../middleware/authMiddleware');

const router = express.Router();
const prisma = new PrismaClient();

const PAGE_SIZE = 10;

// 🔹 Fetch paginated list of jobs
router.get('/', authMiddleware, async (req, res) => {
  const customerId = req.user.customerId;
  const { type, limit = 10, skip = 0 } = req.query;

  try {
    const orders = await prisma.order.findMany({
      where: {
        customerId,
        status: type === 'upcoming' ? 'Open' : 'Completed',
      },
      orderBy: {
        requestedOn: 'desc',
      },
      skip: parseInt(skip),
      take: parseInt(limit),
    });

    res.json(orders);
  } catch (err) {
    console.error('🔴 jobDb list route error:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// 🔹 Fetch individual job by orderNumber
router.get('/:orderNumber', authMiddleware, async (req, res) => {
  const customerId = req.user.customerId;
  const { orderNumber } = req.params;

  try {
    const order = await prisma.order.findFirst({
      where: {
        orderNumber,
        customerId,
      },
      include: {
        items: true,
      },
    });

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.json(order);
  } catch (err) {
    console.error('🔴 jobDb individual route error:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
