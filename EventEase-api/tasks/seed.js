import { dbConnection, closeConnection } from "../config/mongoConnection.js";
import {
  products,
  orders,
  sales,
  customers,
  reviews,
  users,
} from "../config/mongoCollection.js";
import { ObjectId } from "mongodb";

const main = async () => {
  const db = await dbConnection();
  await db.dropDatabase();

  const productsCollection = await products();
  const ordersCollection = await orders();
  const salesCollection = await sales();
  const customersCollection = await users();
  const reviewsCollection = await reviews();

  const itemIds = Array.from({ length: 25 }, () => new ObjectId());
  const testCustomer1 = new ObjectId();
  const order1 = new ObjectId();

  const inventoryData = [
    {
      name: "Folding Event Chair",
      sku: "EVT0001",
      description: "Durable white folding chair, perfect for weddings and conferences.",
      price: 12.0,
      discountedPrice: 9.5,
      color: "White",
      size: "Standard",
      status: "in stock",
      quantity: "200",
      category: "Furniture",
      mediaUrl: "/uploads/bui-hoang-long-Dbm9rc_gpsQ-unsplash.jpg", 
      mediaType: "image"
    },
    {
      name: "Round Banquet Table",
      sku: "EVT0002",
      description: "60-inch round plastic table, seats up to 8 guests comfortably.",
      price: 45.0,
      discountedPrice: 40.0,
      color: "White",
      size: "60 inch",
      status: "in stock",
      quantity: "75",
      category: "Furniture",
      mediaUrl: "/uploads/round-table.jpg",
      mediaType: "image"
    },
    {
      name: "Stage Lighting Kit",
      sku: "EVT0003",
      description: "LED stage lighting kit with adjustable color settings and remote.",
      price: 180.0,
      discountedPrice: 150.0,
      color: "Black",
      size: "One Size",
      status: "in stock",
      quantity: "25",
      category: "AV Equipment",
      mediaUrl: "/uploads/stage-light.jpg",
      mediaType: "image"
    },
    {
      name: "Event Tent 10x20ft",
      sku: "EVT0004",
      description: "Waterproof event tent suitable for outdoor parties and receptions.",
      price: 350.0,
      discountedPrice: 299.99,
      color: "White",
      size: "10x20 ft",
      status: "out of stock",
      quantity: "0",
      category: "Shelter",
      mediaUrl: "/uploads/event-tent.jpg",
      mediaType: "image"
    },
    {
      name: "Portable Sound System",
      sku: "EVT0005",
      description: "High-quality wireless speaker system with microphone support.",
      price: 250.0,
      discountedPrice: 219.0,
      color: "Black",
      size: "Large",
      status: "in stock",
      quantity: "40",
      category: "AV Equipment",
      mediaUrl: "/uploads/Sound-System.jpg",
      mediaType: "image"
    },
    {
      name: "Table Linen Set",
      sku: "EVT0006",
      description: "Set of tablecloths and runners for formal event setups.",
      price: 30.0,
      discountedPrice: 25.0,
      color: "Ivory",
      size: "Standard",
      status: "in stock",
      quantity: "100",
      category: "Decor",
      mediaUrl: "/uploads/Table-Linen-Set.jpg",
      mediaType: "image"
    },
    {
      name: "Stage Platform 4x8ft",
      sku: "EVT0007",
      description: "Modular stage section with carpeted top and adjustable height.",
      price: 480.0,
      discountedPrice: 420.0,
      color: "Gray",
      size: "4x8 ft",
      status: "in stock",
      quantity: "15",
      category: "Staging",
      mediaUrl: "/uploads/Stage-Platform.jpg",
      mediaType: "image"
    },
    {
      name: "LED Uplight",
      sku: "EVT0008",
      description: "Color-changing uplight perfect for weddings and gala lighting.",
      price: 35.0,
      discountedPrice: 30.0,
      color: "Multi",
      size: "Small",
      status: "in stock",
      quantity: "120",
      category: "Lighting",
      mediaUrl: "/uploads/LED-Uplight.jpg",
      mediaType: "image"
    },
    {
      name: "Wedding Arch",
      sku: "EVT0009",
      description: "Elegant white metal arch for ceremonies and decorative setups.",
      price: 150.0,
      discountedPrice: 120.0,
      color: "White",
      size: "7 ft",
      status: "in stock",
      quantity: "10",
      category: "Decor",
      mediaUrl: "/uploads/Wedding-Arch.jpg",
      mediaType: "image"
    },
    {
      name: "Podium with Mic Stand",
      sku: "EVT0010",
      description: "Wooden podium with built-in microphone stand, ideal for speeches.",
      price: 120.0,
      discountedPrice: 99.0,
      color: "Brown",
      size: "Standard",
      status: "in stock",
      quantity: "8",
      category: "Furniture",
      mediaUrl: "/uploads/Podium-with-Mic-Stand.jpg",
      mediaType: "image"
    },
    {
      name: "Cocktail Table",
      sku: "EVT0011",
      description: "Tall round cocktail table, perfect for standing receptions.",
      price: 38.0,
      discountedPrice: 33.0,
      color: "White",
      size: "42 inch",
      status: "in stock",
      quantity: "60",
      category: "Furniture",
      mediaUrl: "/uploads/Cocktail Table.jpg",
      mediaType: "image",
    },
    {
      name: "Chafing Dish Set",
      sku: "EVT0012",
      description: "Stainless steel chafing dish with lid and water pan.",
      price: 55.0,
      discountedPrice: 45.0,
      color: "Silver",
      size: "Full Size",
      status: "in stock",
      quantity: "100",
      category: "Catering",
      mediaUrl: "/uploads/Chafing Dish Set.jpg",
      mediaType: "image",
    },
    {
      name: "Red Carpet Runner",
      sku: "EVT0013",
      description: "Classic red carpet runner for entrances and special events.",
      price: 80.0,
      discountedPrice: 69.0,
      color: "Red",
      size: "3x20 ft",
      status: "in stock",
      quantity: "25",
      category: "Decor",
      mediaUrl: "/uploads/Red Carpet Runner.jpg",
      mediaType: "image",
    },
    {
      name: "Portable Bar Counter",
      sku: "EVT0014",
      description: "Collapsible event bar with storage and prep space.",
      price: 225.0,
      discountedPrice: 199.0,
      color: "Black",
      size: "6 ft",
      status: "in stock",
      quantity: "15",
      category: "Bar & Beverage",
      mediaUrl: "/uploads/Portable Bar Counter.jpg",
      mediaType: "image",
    },
    {
      name: "Photo Booth Backdrop Frame",
      sku: "EVT0015",
      description: "Adjustable frame stand for photo backdrops and banners.",
      price: 89.0,
      discountedPrice: 75.0,
      color: "Black",
      size: "8x10 ft",
      status: "in stock",
      quantity: "30",
      category: "Decor",
      mediaUrl: "/uploads/Photo Booth Backdrop Frame.jpg",
      mediaType: "image",
    },
    {
      name: "Cafe String Lights",
      sku: "EVT0016",
      description: "Warm white LED string lights for outdoor or rustic settings.",
      price: 25.0,
      discountedPrice: 19.99,
      color: "Warm White",
      size: "48 ft",
      status: "in stock",
      quantity: "90",
      category: "Lighting",
      mediaUrl: "/uploads/Cafe String Lights.jpg",
      mediaType: "image",
    },
    {
      name: "Pipe and Drape Kit",
      sku: "EVT0017",
      description: "Freestanding drape system for room dividing or backdrops.",
      price: 300.0,
      discountedPrice: 275.0,
      color: "Black",
      size: "10x10 ft",
      status: "in stock",
      quantity: "20",
      category: "Decor",
      mediaUrl: "/uploads/Pipe and Drape Kit.jpg",
      mediaType: "image",
    },
    {
      name: "Glass Drink Dispenser",
      sku: "EVT0018",
      description: "2-gallon glass beverage dispenser with spigot and lid.",
      price: 28.0,
      discountedPrice: 24.0,
      color: "Clear",
      size: "2 Gallon",
      status: "in stock",
      quantity: "50",
      category: "Bar & Beverage",
      mediaUrl: "/uploads/Glass Drink Dispenser.jpg",
      mediaType: "image",
    },
    {
      name: "Wedding Centerpiece Stand",
      sku: "EVT0019",
      description: "Gold metal flower stand for table centerpieces and arrangements.",
      price: 35.0,
      discountedPrice: 30.0,
      color: "Gold",
      size: "24 inch",
      status: "in stock",
      quantity: "70",
      category: "Decor",
      mediaUrl: "/uploads/Wedding Centerpiece Stand.jpg",
      mediaType: "image",
    },
    {
      name: "White Event Sofa",
      sku: "EVT0020",
      description: "Modern white lounge sofa for VIP or bridal areas.",
      price: 320.0,
      discountedPrice: 275.0,
      color: "White",
      size: "3-Seater",
      status: "in stock",
      quantity: "5",
      category: "Furniture",
      mediaUrl: "/uploads/White Event Sofa.jpg",
      mediaType: "image",
    }
  ];
  

  const inventoryInsertData = inventoryData.map((item, index) => ({
    _id: itemIds[index],
    ...item,
    reservations: {}
  }));

  await productsCollection.insertMany(inventoryInsertData);
  // await stockCollection.insertMany([
  //   {
  //     _id: new ObjectId(),
  //     itemId: item1,
  //     quantity: 20,
  //     location: "NYC",
  //     availableDates: [],
  //   },
  //   {
  //     _id: new ObjectId(),
  //     itemId: item2,
  //     quantity: 100,
  //     location: "NYC",
  //     availableDates: [],
  //   },
  // ]);

  await customersCollection.insertMany([
    {
      firebaseUid: "kLfejceDTvUWwpJtfKpAeDAqcVy1",
      address: null,
      email: "manav@gmail.com",
      fullName: "manav",
      phoneNumber: null,
      profilePicture: null,
      role: "vendor",
          orders: [order1]
    },
    {
      firebaseUid: "LlJhxYUJDTUbtD84nV9t3ZO51uE2",
      address: null,
      email: "shreyaj@gmail.com",
      fullName: "shreya",
      phoneNumber: null,
      profilePicture: null,
      role: "vendor",
          orders: [order1]
    },
    {
      firebaseUid: "xraaqOBVqigVxq06xlp02U7REGm1",
      address: null,
      email: "wesley@gmail.com",
      fullName: "wesley",
      phoneNumber: null,
      profilePicture: null,
      role: "user",
          orders: [order1]
    },
    {
      firebaseUid: "3juMffjx0yeWuDiWcY0oOJjCyUz2",
      address: null,
      email: "matei@gmail.com",
      fullName: "matei",
      phoneNumber: null,
      profilePicture: null,
      role: "user",
      orders: [order1]
    }
  ]);

  await ordersCollection.insertMany([
    {
      _id: order1,
      productIds: [itemIds[0], itemIds[1]],
      customerId: testCustomer1,
      itemCount: 2,
      startDate: new Date("2025-06-01"),
      endDate: new Date("2025-06-03"),
      status: "pending",
    },
  ]);

  // await salesCollection.insertMany([
  //   {
  //     _id: new ObjectId(),
  //     orderId: order1,
  //     total: 75,
  //     date: new Date(),
  //     paymentMethod: "credit_card",
  //   },
  // ]);

  // await reviewsCollection.insertMany([
  //   {
  //     _id: new ObjectId(),
  //     itemId: item1,
  //     customerId: customer1,
  //     rating: 5,
  //     comment: "Worked perfectly for our wedding. Highly recommend!",
  //     date: new Date(),
  //   },
  // ]);

  console.log("Done seeding EventEase database!");
  await closeConnection();
};

main().catch(console.log);
