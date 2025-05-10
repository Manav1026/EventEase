import CreditCard from "./CreditCard";

const Checkout = () => {
    return (
        <div className="bg-white shadow rounded-lg p-4">
            <h1 className="text-lg font-semibold mt-2">Checkout</h1>
            <h2 className="text-lg font-semibold mt-2">List of Items in Cart</h2>
            <h1 className="text-lg font-semibold mt-2">Temporary Total: $Free</h1>
            <CreditCard />
        </div>
    );
};

export default Checkout;
