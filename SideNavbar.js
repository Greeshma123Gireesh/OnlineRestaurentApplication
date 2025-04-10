import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './css/SideNavbar.css';

function SideNavbar() {
  const [IsMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const categories = [
    'Rice',
    'Chicken',
    'Starters',
    'Bread (12)',
    'Veg Item',
    'Appam',
    'Egg Dishes',
    'Mutton Dishes',
    'Fish'
  ];

  const handleCategoryClick = (category) => {
    navigate(`/items/category/${category}`);
  };

  return (
    <div className={`sidenav-container ${IsMobile ? 'mobile' : 'desktop'}`}>
      <ul>
        {categories.map((category, index) => (
          <li key={index} onClick={() => handleCategoryClick(category)}>
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SideNavbar;
