import { useContext, useState } from "react";
import Cards from "react-credit-cards-2";
import "react-credit-cards-2/dist/es/styles-compiled.css";
import { CartContext } from "./CartContextProvider";
import { auth } from "../firebase";
import * as cardValidator from "card-validator";

const CreditCard = () => {
<<<<<<< Updated upstream
  const [card, setCard] = useState({
    number: "",
    expiry: "",
    cvc: "",
    name: "",
    focus: "",
  });

  const { clearCart, cart } = useContext(CartContext);

  const completeOrder = async (e) => {
    e.preventDefault();
    const token = await auth.currentUser.getIdToken();

    // TODO GET CUSTOMER ID
    const newOrderItems = cart.map((x) => {
      return {
        productId: x._id,
        orderQuantity: x.orderQuantity,
        startDate: x.startDate,
        endDate: x.endDate,
      };
    });

    const newOrder = {
      // customerId,
      products: newOrderItems,
=======
    const [error, setError] = useState("");
    const [card, setCard] = useState({
        number: "",
        expiry: "",
        cvc: "",
        name: "",
        focus: "",
    });

    const { clearCart, cart } = useContext(CartContext)

    const validateCard = (card) => {
        if(card.number.length !== 16) {
            setError("Please enter valid card Number");
        } else if(expiry.length !== 4 || expiry.length !== 6 || expiry.slice(0,2)>12 || expiry.slice(2)) {

        }
    }

    const completeOrder = async (e) => {
        e.preventDefault();
        const token = await auth.currentUser.getIdToken();
        

        // TODO GET CUSTOMER ID
        const newOrderItems = cart.map(x => {
            return {
                productId: x._id,
                orderQuantity: x.orderQuantity,
                startDate: x.startDate,
                endDate: x.endDate,
            }
        })

        const newOrder = {
            // customerId,
            products: newOrderItems,
        }
        console.log(newOrder)
        try{
            // const res = await fetch("http://localhost:3000/orders", {
            //     method: "POST",
            //     headers: {
            //         Authorization: `Bearer ${token}`,
            //     },
            //     body: formData,
            // });

            // const data = await res.json();
            clearCart();
        } catch(e){}
    }

    const handleInputChange = (evt) => {
        const { name, value } = evt.target;

        setCard((prev) => ({ ...prev, [name]: value }));
>>>>>>> Stashed changes
    };
    console.log(newOrder);
    try {
      // const res = await fetch("http://localhost:3000/orders", {
      //     method: "POST",
      //     headers: {
      //         Authorization: `Bearer ${token}`,
      //     },
      //     body: formData,
      // });
      // const data = await res.json();
      // clearCart();
    } catch (e) {}
  };

  const handleInputChange = (evt) => {
    const { name, value } = evt.target;

<<<<<<< Updated upstream
    setCard((prev) => ({ ...prev, [name]: value }));
  };

  const handleInputFocus = (evt) => {
    setCard((prev) => ({ ...prev, focus: evt.target.name }));
  };

  return (
    <div className="bg-white shadow-lg rounded-xl p-6 mt-10 max-w-xl mx-auto space-y-6">
      <h2 className="text-xl font-semibold text-gray-800">Payment Details</h2>

      <Cards
        number={card.number}
        expiry={card.expiry}
        cvc={card.cvc}
        name={card.name}
        focused={card.focus}
      />

      <form onSubmit={completeOrder} className="space-y-4 mt-4">
        <div>
          <label
            htmlFor="number"
            className="block text-sm font-medium text-gray-700 mb-1">
            Card Number
          </label>
          <input
            type="text"
            name="number"
            placeholder="Card Number"
            maxLength="16"
            value={card.number}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            required
          />
=======
    return (
        <div className="bg-white shadow rounded-lg p-4">
            <Cards
                number={card.number}
                expiry={card.expiry}
                cvc={card.cvc}
                name={card.name}
                focused={card.focus}
            />
            <form onSubmit={completeOrder}>
                <input
                    type="text"
                    name="number"
                    placeholder="Card Number"
                    maxLength={16}
                    minLength={16}
                    pattern="\d{1,16}"
                    inputMode="numeric"
                    value={card.number}
                    onChange={handleInputChange}
                    onFocus={handleInputFocus}
                    required
                />
                <br />
                <input
                    type="text"
                    name="expiry"
                    maxLength={6}
                    minLength={4}
                    pattern="\d{1,6}"
                    inputMode="numeric"
                    placeholder="Expiration"
                    value={card.expiry}
                    onChange={handleInputChange}
                    onFocus={handleInputFocus}
                    required
                />
                <br />
                <input
                    type="text"
                    name="name"
                    placeholder="Cardholder"
                    value={card.name}
                    onChange={handleInputChange}
                    onFocus={handleInputFocus}
                    required
                />
                <br />
                <input
                    type="text"
                    name="cvc"
                    placeholder="CVC"
                    maxLength={4}
                    minLength={3}
                    pattern="\d{1,4}"
                    inputMode="numeric"
                    value={card.cvc}
                    onChange={handleInputChange}
                    onFocus={handleInputFocus}
                    required
                />
                <br />
                <button className="mt-3 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                    Place Order
                </button>
            </form>
>>>>>>> Stashed changes
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="expiry"
              className="block text-sm font-medium text-gray-700 mb-1">
              Expiry (MMYY)
            </label>
            <input
              type="text"
              name="expiry"
              placeholder="MMYY"
              maxLength="4"
              value={card.expiry}
              onChange={handleInputChange}
              onFocus={handleInputFocus}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label
              htmlFor="cvc"
              className="block text-sm font-medium text-gray-700 mb-1">
              CVC
            </label>
            <input
              type="text"
              name="cvc"
              placeholder="CVC"
              maxLength="4"
              value={card.cvc}
              onChange={handleInputChange}
              onFocus={handleInputFocus}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-1">
            Cardholder Name
          </label>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={card.name}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200">
          Place Order
        </button>
      </form>
    </div>
  );
};

export default CreditCard;
