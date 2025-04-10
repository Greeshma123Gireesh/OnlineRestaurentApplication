import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, ListGroup, Row, Col, Form, Card } from "react-bootstrap";
import './css/Cart.css';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [subTotal, setSubTotal] = useState(0);
  const [handlingCharges, setHandlingCharges] = useState(39.99);
  const [cgst, setCgst] = useState(0);
  const [sgst, setSgst] = useState(0);
  const [error, setError] = useState("");
  const userEmail = localStorage.getItem("userEmail");

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/cart/items/${userEmail}`
        );
        setCartItems(response.data);

        const calculatedSubTotal = response.data.reduce(
          (total, item) => total + item.itemPrice * item.quantity,
          0
        );
        setSubTotal(calculatedSubTotal);
        setCgst((calculatedSubTotal * 2.625) / 100);
        setSgst((calculatedSubTotal * 2.625) / 100);
      } catch (error) {
        console.error("Error fetching cart items:", error);
        setError("Error fetching cart items. Please try again.");
      }
    };

    fetchCartItems();
  }, [userEmail]);

  const handleQuantityChange = (itemId, newQuantity) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.itemId === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
    const updatedSubTotal = cartItems.reduce(
      (total, item) =>
        total +
        (item.itemId === itemId
          ? item.itemPrice * newQuantity
          : item.itemPrice * item.quantity),
      0
    );
    setSubTotal(updatedSubTotal);
    setCgst((updatedSubTotal * 2.625) / 100);
    setSgst((updatedSubTotal * 2.625) / 100);
  };

  const removeItemFromCart = async (itemId) => {
    try {
      await axios.delete(`http://localhost:8080/cart/remove/${itemId}`);
      setCartItems((prevItems) =>
        prevItems.filter((item) => item.itemId !== itemId)
      );
    } catch (error) {
      console.error("Error removing item from cart:", error);
      setError("Failed to remove item from cart. Please try again.");
    }
  };

  return (
    <div className="container my-4">
      <Row>
        <Col md={8}>
          <h4>Your Order</h4>
          {error && <p style={{ color: "red" }}>{error}</p>}
          {cartItems.length > 0 ? (
            <ListGroup variant="flush">
              {cartItems.map((item) => (
                <ListGroup.Item
                  key={item.itemId}
                  className="d-flex align-items-center"
                >
                  {/* <img
                     src={`http://localhost:8080/api/images/${item.imageFileName}`}
                    alt={item.itemName}
                    style={{
                      width: "100px",
                      height: "100px",
                      marginRight: "15px",
                      objectFit: "cover",
                      borderRadius: "5px",
                    }}
                  /> */}
                  <div className="flex-grow-1">
                    <h6>{item.itemName}</h6>
                    <p>₹{item.itemPrice.toFixed(2)}</p>
                    <Button
                      variant="link"
                      size="sm"
                      onClick={() => removeItemFromCart(item.itemId)}
                    >
                      Remove
                    </Button>
                  </div>
                  <div className="d-flex align-items-center">
                    <Button
                      variant="outline-secondary"
                      size="sm"
                      onClick={() =>
                        handleQuantityChange(item.itemId, Math.max(1, item.quantity - 1))
                      }
                    >
                      -
                    </Button>
                    <span className="mx-2">{item.quantity}</span>
                    <Button
                      variant="outline-secondary"
                      size="sm"
                      onClick={() =>
                        handleQuantityChange(item.itemId, item.quantity + 1)
                      }
                    >
                      +
                    </Button>
                  </div>
                </ListGroup.Item>
              ))}
            </ListGroup>
          ) : (
            <div  className="no-items-message">
            <p>No items in cart.</p>
            </div>
          )}
        </Col>
        {cartItems.length > 0 && (
          <Col md={4}>
            <Card>
              <Card.Body>
                <h5>Total Charges</h5>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <div className="d-flex justify-content-between">
                      <span>Sub Total</span>
                      <span>₹{subTotal.toFixed(2)}</span>
                    </div>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <div className="d-flex justify-content-between">
                      <span>Handling Charges</span>
                      <span>₹{handlingCharges.toFixed(2)}</span>
                    </div>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <div className="d-flex justify-content-between">
                      <span>CGST</span>
                      <span>₹{cgst.toFixed(2)}</span>
                    </div>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <div className="d-flex justify-content-between">
                      <span>SGST</span>
                      <span>₹{sgst.toFixed(2)}</span>
                    </div>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <div className="d-flex justify-content-between">
                      <strong>Total Payable</strong>
                      <strong>
                        ₹{(subTotal + handlingCharges + cgst + sgst).toFixed(2)}
                      </strong>
                    </div>
                  </ListGroup.Item>
                </ListGroup>
                <Form.Check
                  type="checkbox"
                  label="Donate ₹3 for Ronald McDonald House of Charity."
                  className="mt-3"
                />
                <Button variant="warning" className="w-100 mt-3" >
                  Log In / Sign Up to Continue
                </Button>
              </Card.Body>
            </Card>
          </Col>
        )}
      </Row>
    </div>
  );
};

export default CartPage;
