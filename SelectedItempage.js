import React from 'react';
import HomeNavbar from './HomeNavbar';
import SideNavbar from './SideNavbar';
import Items from './Items';
import './css/Home.css';
// import Cart from './Cart';
// import ItemsPage from './ItemsPage';
import ItemListPage from './ItemList';
import AddItemPage from './AddItem';
import CategoryItem from './CategoryItems';

export default function selectedItem() {
  return (
    <div className="home-container">
      <HomeNavbar />
      <div className="content-container">
        <SideNavbar />
        <div className="items-section">
          {/* <Items /> */}
          <Route path="/items/category/:category" element={<CategoryItem/>} />

        </div>
        {/* <Cart/> */}
        {/* <ItemsPage/> */}
        {/* <AddItemPage/> */}
      </div>
    </div>
  );
}
