import React from 'react';
import HomeNavbar from './HomeNavbar';
import SideNavbar from './SideNavbar';
import Items from './Items';
import './css/Home.css';
// import Cart from './Cart';
// import ItemsPage from './ItemsPage';
import ItemListPage from './ItemList';
import AddItemPage from './AddItem';

export default function Home() {
  return (
    <div className="home-container">
      <HomeNavbar />
      <div className="content-container">
        <SideNavbar />
        <div className="items-section">
          {/* <Items /> */}
          <ItemListPage/>
        </div>
        {/* <Cart/> */}
        {/* <ItemsPage/> */}
        {/* <AddItemPage/> */}
      </div>
    </div>
  );
}
