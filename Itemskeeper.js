import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './css/ItemKeeper.css';

const ItemsKeeper = () => {
  const [items, setItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState(''); // Add searchQuery state
  const navigate = useNavigate();

  useEffect(() => {
    fetchItems();
  }, []);

  // Fetch all items
  const fetchItems = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/items');
      setItems(response.data);
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  // Delete an item
  const deleteItem = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/items/${id}`);
      fetchItems(); // Refresh the list after deletion
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  // Update an item
  const updateItem = (id) => {
    navigate(`/update-item/${id}`);
  };

  // Toggle availability
  const toggleAvailability = async (id, currentStatus) => {
    try {
      const updatedStatus = currentStatus === 'available' ? 'not available' : 'available';
      await axios.put(`http://localhost:8080/api/items/${id}/status`, null, {
        params: { status: updatedStatus }  // Pass status as a query parameter
      });
      fetchItems(); // Refresh the list after status update
    } catch (error) {
      console.error('Error updating item status:', error);
    }
  };

  // Handle search input change
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Filter items based on search query
  const filteredItems = items.filter(item =>
    item.itemName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="item-list-page">
      <h1>Items Keeper</h1>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search items..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>
      <div className="item-list">
        {filteredItems.map((item) => (
          <div className="item-row" key={item.itemId}>
            <img
              className="item-image"
              src={`http://localhost:8080/api/images/${item.imageFileName}`}
              alt={item.itemName}
            />
            <div className="item-details">
              <h3>{item.itemName}</h3>
              <p>{item.description}</p>
              <p>Price: {item.itemPrice}</p>
              <p>Status: {item.status}</p>
            </div>
            <div className="item-actions">
              <button onClick={() => toggleAvailability(item.itemId, item.status)}>
                Toggle Status
              </button>
              <button onClick={() => updateItem(item.itemId)}>Edit</button>
              <button onClick={() => deleteItem(item.itemId)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ItemsKeeper;
