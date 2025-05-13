import { products, orders } from '../config/mongoCollection.js';
import { ObjectId } from 'mongodb';
//import validation from '../helpers.js';

function generateDateRange(start, end) {
    const result = [];
    let current = new Date(start).valueOf();
    const last = new Date(end).valueOf();
    while (current <= last) {
        result.push(new Date(current).toISOString().slice(0, 10));
        current += 86400000; // 1 day in ms
    }
    return result;
}

export const createOrder = async (
    productIds, 
    customerId,
    startDate, 
    endDate
    ) => {
    if (!productIds || !customerId || !startDate || !endDate) throw "Missing required fields";
    if (!Array.isArray(productIds)) throw "Must be an array of products, even if just one item → cart should return a list";
    // productIds = validation.checkId(productIds, "product ID");
    // customerId = validation.checkString(customerId, "customer ID/Name");
    // startDate = validation.checkDate(startDate, "start date");
    // endDate = validation.checkDate(endDate, "end date");

    const productCollection = await products();
    const ordersCollection = await orders();
    
    const dateRange = generateDateRange(startDate, endDate);
    const rangeString = `${startDate}_${endDate}`;

   for (let singleProdId of  productIds) {
        let currProd = await productCollection.findOne({ _id: new ObjectId(singleProdId) });
        if (!currProd) throw `current product ${singleProdId} not found `;
    
        let reservations = currProd.reservations || {};
        //check for reservation window overlap
        for (let ranges of Object.entries(reservations)) {
            for (let reservedRange of ranges) {
                let [resStart, resEnd] = reservedRange.split('_');
                let reservedDates = generateDateRange(resStart, resEnd);
                if (reservedDates.some(date => dateRange.includes(date))) {
                    throw "Selected dates overlap with an existing reservation";
                }
            }
        }
        //add reservation
        if (!reservations[customerId]) reservations[customerId] = [];
        reservations[customerId].push(rangeString);

        let updateInfo = await productCollection.findOneAndUpdate(
            { _id: new ObjectId(singleProdId) },
            { $set: { reservations: reservations } },
            { returnDocument: 'after' }
        );

        if (!updateInfo) throw "Order could not be saved";

    }
    // Add order
    const newOrder = {
        productIds: productIds.map(id => new ObjectId(id)),
        customerId: customerId,
        itemCount: productIds.length,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        status: "pending"
    };

    const insertResult = await ordersCollection.insertOne(newOrder);
    if (!insertResult.acknowledged) throw "Failed to insert order";

    return insertResult.insertedId;

};

export const getReservedDates = async (productIds) => {
    if (!Array.isArray(productIds)) throw "Must pass an array of productIds";

    const productCollection = await products();
    const allDates = [];

    for (const id of productIds) {
        const product = await productCollection.findOne({ _id: new ObjectId(id) });
        if (!product || !product.reservations) continue;

        for (const ranges of Object.values(product.reservations)) {
            for (const range of ranges) {
                const [start, end] = range.split('_');
                allDates.push(...generateDateRange(start, end));
            }
        }
    }

    return allDates;
};