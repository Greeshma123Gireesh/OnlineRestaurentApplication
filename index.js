import React from 'react'; // Import React library to create React components.
import ReactDOM from 'react-dom/client'; // Import ReactDOM for rendering the app.
import './index.css'; // Import global CSS file for styling.
import reportWebVitals from './reportWebVitals'; // Import for measuring app performance.
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap for styling.
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // Import React Router for navigation.

import Home from './Home'; // Import Home component.
import ItemListPage from './ItemList'; // Import ItemListPage component.
import ItemsKeeper from './Itemskeeper'; // Import ItemsKeeper component.
import CartPage from './CartPage'; // Import CartPage component.
import SignupPage from './SignUp'; // Import SignupPage component.
import LoginPage from './Login'; // Import LoginPage component.
import AddItemPage from './AddItem'; // Import AddItemPage component.
import CategoryItem from './CategoryItems'; // Import CategoryItem component.

const root = ReactDOM.createRoot(document.getElementById('root')); // Create a root node for rendering the React app.

root.render(
  <React.StrictMode> 
    {/* React.StrictMode helps detect potential issues in the app. */}
    <BrowserRouter>
      {/* BrowserRouter enables client-side routing for the app. */}
      <Routes>
        {/* Routes is a container for all route definitions. */}
        
        <Route path="/" element={<Home />} /> 
        {/* Route for Home page at the root URL. */}
        
        <Route path="/login" element={<LoginPage />} /> 
        {/* Route for Login page. */}
        
        <Route path="/signup" element={<SignupPage />} /> 
        {/* Route for Signup page. */}
        
        <Route path="/items" element={<ItemListPage />} /> 
        {/* Route for Item List page where all items are displayed. */}
        
        <Route path="/items-keeper" element={<ItemsKeeper />} /> 
        {/* Route for ItemsKeeper page (probably for managing items). */}
        
        <Route path="/cart" element={<CartPage />} /> 
        {/* Route for Cart page where users can view their cart. */}
        
        <Route path="/additem" element={<AddItemPage/>}/> 
        {/* Route for Add Item page where users can add new items. */}
        
        <Route path="/items/category/:category" element={<CategoryItem/>} /> 
        {/* Dynamic Route for displaying items based on category. 
            ":category" is a URL parameter, which means different categories 
            can be displayed dynamically (e.g., "/items/category/electronics"). */}
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(); // Runs performance monitoring (optional).
