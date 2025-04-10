import React, { useState, useEffect } from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import './css/Items.css';

export default function Items() {
  const [items, setItems] = useState([]);

  // Fetch items from the backend API
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/items');
        setItems(response.data); // Assuming the response data is an array of items
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };

    fetchItems();
  }, []);

  return (
    <div className="items-container">
      <Row>
        {items.length > 0 ? (
          items.map((item) => (
            <Col key={item.itemid} xs={12} sm={6} md={4} lg={4} className="mb-4">
              <Card style={{ width: '100%' }}>
                {/* Log the image URL to see if it's correct */}
                {console.log(`Image URL: http://localhost:8080/images/${item.imageUrl}`)}

                {/* If the URL is already encoded, remove encodeURIComponent */}
                <Card.Img
                  variant="top"
                  src={`http://localhost:8080/images/${item.imageUrl}`}
                  alt={item.itemname}
                />

                <Card.Body>
                  <Card.Title>{item.itemname}</Card.Title>
                  <Card.Text>{item.description}</Card.Text>
                  <Card.Text>₹{item.itemprice}</Card.Text>
                  <Button variant="primary">Order Now</Button>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <p>No items available.</p>
        )}
      </Row>
    </div>
  );
}
