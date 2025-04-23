import { dbConnection, closeConnection } from '../config/mongoConnection.js';
import { inventory, stock, orders, sales, customers, reviews} from '../config/mongoCollection.js';
import { v4 as uuid } from 'uuid';

const main = async () => {
  const db = await dbConnection();
  await db.dropDatabase();

  const inventoryCollection = await inventory();
  const stockCollection = await stock();
  const ordersCollection = await orders();
  const salesCollection = await sales();
  const customersCollection = await customers();
  const reviewsCollection = await reviews();

  const item1 = uuid();
  const item2 = uuid();
  const customer1 = uuid();
  const order1 = uuid();

  await inventoryCollection.insertMany([
    {
      _id: item1,
      name: 'LED Uplighting',
      category: 'lighting',
      description: 'Color-changing uplights perfect for weddings.',
      vendorId: 'vendor123',
      pricePerDay: 25
    },
    {
      _id: item2,
      name: 'Folding Chairs',
      category: 'furniture',
      description: 'White folding chairs, lightweight and sturdy.',
      vendorId: 'vendor456',
      pricePerDay: 2
    }
  ]);

  await stockCollection.insertMany([
    {
      _id: uuid(),
      itemId: item1,
      quantity: 20,
      location: 'NYC',
      availableDates: []
    },
    {
      _id: uuid(),
      itemId: item2,
      quantity: 100,
      location: 'NYC',
      availableDates: []
    }
  ]);

  await customersCollection.insertMany([
    {
      _id: customer1,
      name: 'Alice Johnson',
      email: 'alice@example.com',
      phone: '555-1234',
      address: '123 Event Lane, New York, NY'
    }
  ]);

  await ordersCollection.insertMany([
    {
      _id: order1,
      customerId: customer1,
      itemId: item1,
      startDate: new Date('2025-06-01'),
      endDate: new Date('2025-06-03'),
      status: 'pending'
    }
  ]);

  await salesCollection.insertMany([
    {
      _id: uuid(),
      orderId: order1,
      total: 75,
      date: new Date(),
      paymentMethod: 'credit_card'
    }
  ]);

  await reviewsCollection.insertMany([
    {
      _id: uuid(),
      itemId: item1,
      customerId: customer1,
      rating: 5,
      comment: 'Worked perfectly for our wedding. Highly recommend!',
      date: new Date()
    }
  ]);

  console.log('Done seeding EventEase database!');
  await closeConnection();
};

main().catch(console.log);
