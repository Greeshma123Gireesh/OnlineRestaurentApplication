import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Button, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const ItemListPage = () => {
    const [items, setItems] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/items');
                setItems(response.data);
                setFilteredItems(response.data); // Initially show all items
            } catch (error) {
                console.error('Error fetching items:', error);
                setError('Error fetching items, please try again later.');
            }
        };
        fetchItems();
    }, []);

    // Handle search input change
    const handleSearchChange = (event) => {
        const query = event.target.value;
        setSearchQuery(query);

        if (query.trim() === '') {
            setFilteredItems(items); // If search is empty, show all items
        } else {
            const filtered = items.filter(item =>
                item.itemName.toLowerCase().includes(query.toLowerCase())
            );
            setFilteredItems(filtered);
        }
    };

    const addToCart = async (itemId) => {
        try {
            const token = localStorage.getItem('authToken');
            const userEmail = localStorage.getItem('userEmail');

            if (!token || !userEmail) {
                setError('Please log in to add items to the cart.');
                navigate('/login');
                return;
            }

            const cartItem = { itemId, quantity: 1 };
            const response = await axios.post('http://localhost:8080/cart/add', cartItem, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'User-Email': userEmail,
                    'Content-Type': 'application/json',
                },
            });

            if (response.status === 200 || response.status === 201) {
                alert(`Item added to cart successfully for ${userEmail}`);
                // navigate('/cart'); // Redirect to cart page
            } else {
                setError('Error adding item to cart. Please try again.');
            }
        } catch (error) {
            console.error('Error adding item to cart:', error);
            setError('An unexpected error occurred. Please try again.');
        }
    };

    return (
        <div className="items-container">
            {error && <p style={{ color: 'red' }}>{error}</p>}

            {/* Search bar */}
            <form className="d-flex mb-4">
                <input
                    type="text"
                    placeholder="Search items..."
                    value={searchQuery}
                    onChange={handleSearchChange} // Trigger search as user types
                    className="search-input"
                />
            </form>

            {/* Display search results */}
            {filteredItems.length > 0 ? (
                <Row>
                    {filteredItems.map((item) => (
                        <Col key={item.itemId} xs={12} sm={6} md={4} lg={4} className="mb-4">
                            <Card className="h-100">
                                <Card.Img
                                    variant="top"
                                    src={`http://localhost:8080/api/images/${item.imageFileName}`}
                                    alt={item.itemName}
                                />
                                <Card.Body>
                                    <Card.Title>{item.itemName}</Card.Title>
                                    <Card.Text>{item.description}</Card.Text>
                                    <Card.Text>₹{item.itemPrice}</Card.Text>
                                    {item.status === 'available' ? (
                                        <Button variant="primary" onClick={() => addToCart(item.itemId)}>
                                            Add to Cart
                                        </Button>
                                    ) : (
                                        <Button variant="secondary" disabled>
                                            Item Not Available
                                        </Button>
                                    )}
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            ) : (
                <p>No items available for "{searchQuery}"</p>
            )}
        </div>
    );
};

export default ItemListPage;
