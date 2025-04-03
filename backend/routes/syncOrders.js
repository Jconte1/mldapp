// backend/routes/syncOrders.js
import express from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const router = express.Router();

router.post('/', async (req, res) => {
  const { orders } = req.body; // array of Acumatica orders

  if (!orders || !Array.isArray(orders)) {
    return res.status(400).json({ error: 'Invalid orders array' });
  }

  try {
    for (const order of orders) {
      const orderNbr = order.OrderNbr?.value;
      const customerId = order.CustomerID?.value;

      if (!orderNbr || !customerId) continue;

      await prisma.order.upsert({
        where: { orderNbr },
        update: {
          customerId,
          status: order.Status?.value || '',
          orderTotal: parseFloat(order.OrderTotal?.value || 0),
          createdAt: new Date(order.CreatedDate?.value),
        },
        create: {
          orderNbr,
          customerId,
          status: order.Status?.value || '',
          orderTotal: parseFloat(order.OrderTotal?.value || 0),
          createdAt: new Date(order.CreatedDate?.value),
        },
      });

      const items = order.Details || [];
      for (const item of items) {
        await prisma.orderItem.upsert({
          where: { id: `${orderNbr}-${item.InventoryID?.value}` },
          update: {
            inventoryID: item.InventoryID?.value,
            eta: item.ETA?.value ? new Date(item.ETA.value) : null,
            orderId: orderNbr,
          },
          create: {
            id: `${orderNbr}-${item.InventoryID?.value}`,
            inventoryID: item.InventoryID?.value,
            eta: item.ETA?.value ? new Date(item.ETA.value) : null,
            orderId: orderNbr,
          },
        });
      }
    }

    res.json({ message: 'Orders synced successfully' });
  } catch (err) {
    console.error('❌ Error syncing orders:', err);
    res.status(500).json({ error: 'Failed to sync orders' });
  }
});

export default router;
