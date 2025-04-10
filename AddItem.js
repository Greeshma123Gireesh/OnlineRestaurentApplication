import React, { useState } from 'react';
import axios from 'axios';
import './css/AddItemPage.css'; // Import the CSS file

const AddItemPage = () => {
    const [itemName, setItemName] = useState('');
    const [itemPrice, setItemPrice] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState(''); // State for category
    const [image, setImage] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('itemName', itemName);
        formData.append('itemPrice', itemPrice);
        formData.append('description', description);
        formData.append('category', category); // Append category
        formData.append('image', image);

        try {
            const response = await axios.post('http://localhost:8080/api/items', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            setSuccessMessage('Item added successfully!');
            console.log('Item added:', response.data);

            // Refresh the page after a delay to show the success message
            setTimeout(() => {
                window.location.reload();
            }, 2000); // Adjust the delay (e.g., 2000ms = 2 seconds)
        } catch (error) {
            console.error('Error adding item:', error);
            setSuccessMessage('');
        }
    };

    return (
        <div className="add-item-page">
            <h2 className="title">Add Item</h2>
            {successMessage && <p className="success-message">{successMessage}</p>}
            <form className="add-item-form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    className="input-field"
                    placeholder="Item Name"
                    value={itemName}
                    onChange={(e) => setItemName(e.target.value)}
                    required
                />
                <input
                    type="number"
                    className="input-field"
                    placeholder="Item Price"
                    value={itemPrice}
                    onChange={(e) => setItemPrice(e.target.value)}
                    required
                />
                <textarea
                    className="textarea-field"
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
                <select
                    className="dropdown-field"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                >
                    <option value="" disabled>Select Category</option>
                    <option value="Rice">Rice</option>
                    <option value="Chicken">Chicken</option>
                    <option value="Starters">Starters</option>
                </select>
                
                <input
                    type="file"
                    className="file-input"
                    onChange={(e) => setImage(e.target.files[0])}
                    required
                />
                <button type="submit" className="submit-button">Add Item</button>
               
            </form>
        </div>
    );
};

export default AddItemPage;
