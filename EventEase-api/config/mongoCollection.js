import { dbConnection } from "./mongoConnection.js";

const getCollectionFn = (collection) => {
  let _col = undefined;

  return async () => {
    if (!_col) {
      const db = await dbConnection();
      _col = await db.collection(collection);
    }
    return _col;
  };
};

export const inventory = getCollectionFn("inventory");
export const orders = getCollectionFn("orders");
export const sales = getCollectionFn("sales");
export const customers = getCollectionFn("customers");
export const reviews = getCollectionFn("reviews");
export const users = getCollectionFn("users");
export const products = getCollectionFn("products");
// export const vendors = getCollectionFn("vendors");
// export const categories = getCollectionFn("categories");
// export const payments = getCollectionFn("payments");
