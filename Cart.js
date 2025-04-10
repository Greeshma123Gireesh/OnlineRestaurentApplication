import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './css/Cart.css';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    axios
      .get('http://localhost:8080/cart/items')
      .then((response) => {
        setCartItems(response.data);
        console.log('Number of items in cart:', response.data.length); // Log the length of items
      })
      .catch(() => {
        setError(true);
        console.log('Error fetching cart items.');
      });
  }, []);

  const handleRemoveItem = (id) => {
    axios
      .delete(`http://localhost:8080/cart/remove/${id}`)
      .then(() => {
        setCartItems((prevItems) => {
          const updatedItems = prevItems.filter((item) => item.id !== id);
          console.log('Number of items after removal:', updatedItems.length); // Log the length after removal
          return updatedItems;
        });
      })
      .catch(() => alert('Error removing item!'));
  };

  const handleUpdateQuantity = (id, quantity) => {
    if (quantity < 1) return; // Prevent negative quantity
    axios
      .put(`http://localhost:8080/cart/update/${id}`, { quantity })
      .then((response) => {
        setCartItems((prevItems) =>
          prevItems.map((item) =>
            item.id === id ? { ...item, quantity: response.data.quantity } : item
          )
        );
        console.log('Quantity updated for item ID:', id);
      })
      .catch(() => alert('Error updating quantity!'));
  };

  const calculateSubTotal = () => {
    return cartItems.reduce((total, item) => total + item.quantity * item.price, 0);
  };

  const calculateTotalPayable = () => {
    const subTotal = calculateSubTotal();
    const handlingCharges = 39.99;
    const cgst = subTotal * 0.09; // 9% CGST
    const sgst = subTotal * 0.09; // 9% SGST
    return subTotal + handlingCharges + cgst + sgst;
  };

  if (error) {
    return (
      <div className="cart-container">
        <h2>Your Order</h2>
        <p>Error fetching cart items. Please try again.</p>
      </div>
    );
  }

  if (cartItems.length === 0) {
    console.log('Cart is empty.');
    return (
      <div className="cart-container empty">
        <h2>Your Cart</h2>
        <p>No items in cart.</p>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h2>Your Order</h2>
      <ul className="cart-items-list">
        {cartItems.map((item) => (
          <li key={item.id} className="cart-item">
            <span>{item.name}</span>
            <span>₹{item.price.toFixed(2)}</span>
            <div className="quantity-control">
              <button onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}>+</button>
              <span>{item.quantity}</span>
              <button onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}>-</button>
            </div>
            <button className="remove-item" onClick={() => handleRemoveItem(item.id)}>
              Remove
            </button>
          </li>
        ))}
      </ul>

      {cartItems.length > 0 && (
        <>
          <div className="total-charges">
            <h3>Total Charges</h3>
            <p>Sub Total: ₹{calculateSubTotal().toFixed(2)}</p>
            <p>Handling Charges: ₹39.99</p>
            <p>CGST: ₹{(calculateSubTotal() * 0.09).toFixed(2)}</p>
            <p>SGST: ₹{(calculateSubTotal() * 0.09).toFixed(2)}</p>
            <h4>Total Payable: ₹{calculateTotalPayable().toFixed(2)}</h4>
          </div>
          <div className="donation">
            <label>
              <input type="checkbox" /> Donate ₹3 for Ronald McDonald House of Charity.
            </label>
          </div>
        </>
      )}

      <button className="order-now" onClick={() => alert('Order placed successfully!')}>
        Order Now
      </button>
    </div>
  );
};

export default Cart;
