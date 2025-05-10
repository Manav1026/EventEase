import { useState } from "react";
import Cards from "react-credit-cards-2";
import "react-credit-cards-2/dist/es/styles-compiled.css";

const CreditCard = () => {
    const [card, setCard] = useState({
        number: "",
        expiry: "",
        cvc: "",
        name: "",
        focus: "",
    });

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
            <form>
                <input
                    type="number"
                    name="number"
                    placeholder="Card Number"
                    value={card.number}
                    onChange={handleInputChange}
                    onFocus={handleInputFocus}
                />
                <br/>
                <input
                    type="number"
                    name="expiry"
                    placeholder="Expiration"
                    value={card.expiry}
                    onChange={handleInputChange}
                    onFocus={handleInputFocus}
                />
                <br/>
                <input
                    type="text"
                    name="name"
                    placeholder="Cardholder"
                    value={card.name}
                    onChange={handleInputChange}
                    onFocus={handleInputFocus}
                />
                <br/>
                <input
                    type="number"
                    name="cvc"
                    placeholder="CVC"
                    value={card.cvc}
                    onChange={handleInputChange}
                    onFocus={handleInputFocus}
                />
                <br/>
                <button className="mt-3 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                    Place Order
                </button>
            </form>
        </div>
    );
};

export default CreditCard;
