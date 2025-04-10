import React, { useState, useEffect } from "react";
import axios from "axios";

const ItemsPage = () => {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({
    itemname: "",
    itemprice: "",
    description: "",
    imageUrl: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [uploadMessage, setUploadMessage] = useState("");
  const [uploadedImage, setUploadedImage] = useState(""); // To store the uploaded image URL
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:8080/api/items");
      setItems(response.data);
      setLoading(false);
    } catch (err) {
      setError(`Failed to fetch items: ${err.response?.data?.message || err.message}`);
      setLoading(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size > 5 * 1024 * 1024) { // 5MB max size
      setError("File size should not exceed 5MB.");
    } else if (!file.type.startsWith("image/")) {
      setError("Please upload a valid image file.");
    } else {
      setSelectedImage(file);
      setError(""); // Clear any previous error
    }
  };

  const handleAddItem = async (e) => {
    e.preventDefault();

    if (!selectedImage) {
      setError("Please select an image before adding the item.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedImage);

    try {
      setIsSubmitting(true);
      const uploadResponse = await axios.post("http://localhost:8080/api/uploadImage", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // Extract the image URL from the backend response
      const imageUrl = uploadResponse.data.split("Image URL: ")[1];
      setUploadedImage(imageUrl); // Update the uploaded image URL state

      const itemData = { ...newItem, itemprice: Number(newItem.itemprice), imageUrl };
      const response = await axios.post("http://localhost:8080/api/item", itemData);
      setItems([...items, response.data]);

      setNewItem({ itemname: "", itemprice: "", description: "", imageUrl: "" });
      setSelectedImage(null);
      setUploadedImage(""); // Reset the uploaded image URL
      setIsSubmitting(false);
    } catch (err) {
      setError(`Failed to add item: ${err.response?.data?.message || err.message}`);
      setIsSubmitting(false);
    }
  };

  const handleDeleteItem = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/item/${id}`);
      setItems(items.filter((item) => item.itemid !== id));
    } catch (err) {
      setError(`Failed to delete item: ${err.response?.data?.message || err.message}`);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Items Management</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleAddItem} style={{ marginBottom: "20px" }}>
        <h2>Add New Item</h2>
        <input
          type="text"
          placeholder="Item Name"
          value={newItem.itemname}
          onChange={(e) => setNewItem({ ...newItem, itemname: e.target.value })}
          required
        />
        <br />
        <input
          type="number"
          placeholder="Item Price"
          value={newItem.itemprice}
          onChange={(e) => setNewItem({ ...newItem, itemprice: e.target.value })}
          required
        />
        <br />
        <textarea
          placeholder="Description"
          value={newItem.description}
          onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
          required
        />
        <br />

        <h3>Upload Image</h3>
        <input type="file" onChange={handleImageChange} required />
        {uploadMessage && <p>{uploadMessage}</p>}

        {uploadedImage && (
          <div>
            <img
              src={`http://localhost:8080/${uploadedImage}`} // Display the uploaded image
              alt="Uploaded"
              width="200"
            />
            <p>Image URL: {uploadedImage}</p>
          </div>
        )}

        <button type="submit" disabled={!selectedImage || isSubmitting}>
          {isSubmitting ? "Adding Item..." : "Add Item"}
        </button>
      </form>

      <h2>Items List</h2>
      {loading ? (
        <p>Loading items...</p>
      ) : items.length === 0 ? (
        <p>No items available.</p>
      ) : (
        <ul>
          {items.map((item) => (
            <li key={item.itemid}>
              <strong>{item.itemname}</strong> - ₹{item.itemprice}
              <br />
              {item.description}
              <br />
              {item.imageUrl && (
                <img
                  src={`http://localhost:8080/images/${item.imageUrl}`} // Display item image
                  alt="Item"
                  width="100"
                />
              )}
              <br />
              <button onClick={() => handleDeleteItem(item.itemid)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ItemsPage;
