import { useContext, useState } from "react";
import Cards from "react-credit-cards-2";
import "react-credit-cards-2/dist/es/styles-compiled.css";
import { CartContext } from "./CartContextProvider";
import { auth } from "../firebase";
import * as cardValidator from "card-validator";



const CreditCard = () => {
    const [card, setCard] = useState({
        number: "",
        expiry: "",
        cvc: "",
        name: "",
        focus: "",
    });

    const { clearCart, cart } = useContext(CartContext)

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
            // clearCart();
        } catch(e){}
    }

    const handleInputChange = (evt) => {
        const { name, value } = evt.target;

        setCard((prev) => ({ ...prev, [name]: value }));
    };

    const handleInputFocus = (evt) => {
        setCard((prev) => ({ ...prev, focus: evt.target.name }));
    };

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
                    type="number"
                    name="number"
                    placeholder="Card Number"
                    value={card.number}
                    onChange={handleInputChange}
                    onFocus={handleInputFocus}
                    required
                />
                <br />
                <input
                    type="number"
                    name="expiry"
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
                    type="number"
                    name="cvc"
                    placeholder="CVC"
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
        </div>
    );
};

export default CreditCard;
