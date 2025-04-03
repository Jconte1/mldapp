const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const order = await prisma.order.create({
    data: {
      orderNumber: "FAKE001",
      customerId: "BA0000021",
      status: "Open",
      requestedOn: new Date("2025-04-01T00:00:00.000Z"),
      createdAt: new Date("2025-04-01T16:48:35.631Z"),
      updatedAt: new Date("2025-04-01T16:48:35.631Z"),
      orderTotal: 1234.56,
      locationId: "LOC01",
      shipVia: "DELIVERY",
      willCall: false,
      items: {
        create: [
          {
            inventoryID: "INV001",
            eta: new Date("2025-04-10T00:00:00.000Z")
          },
          {
            inventoryID: "INV002",
            eta: new Date("2025-04-12T00:00:00.000Z")
          }
        ]
      }
    }
  });

  console.log('🧪 Seeded order:', order);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
