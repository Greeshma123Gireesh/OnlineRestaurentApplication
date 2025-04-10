import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Use this for navigation after logout
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import './css/HomeNavbar.css';

function HomeNavbar() {
  const [IsMobile, setIsMobile] = useState(false);
  const navigate = useNavigate(); // For navigation

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

  const handleLogout = () => {
    // Clear user data from localStorage or session
    localStorage.removeItem('userToken');
    localStorage.removeItem('userEmail');

    // Redirect to login page
    navigate('/login');
  };

  return (
    <>
      {!IsMobile ? (
        <Navbar expand="lg" className="bg-body-tertiary">
          <Container>
            <Navbar.Brand href="#home">ByteBytes</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
           
            <Navbar.Collapse className="justify-content-end">
              <Navbar.Text className="me-3">
                <a href="/login">Signin</a>
              </Navbar.Text>
              <Navbar.Text className="me-3">
                <a href="/cart">Cart</a>
              </Navbar.Text>
              <Navbar.Text>
                <button className="logout-btn" onClick={handleLogout}>
                  Logout
                </button>
              </Navbar.Text>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      ) : (
        <div className="mobile-navbar">
          <div className="mobile-header">
            <img src="/login" alt="Logo" className="logo" />
            
          </div>
          <div className="bottom-navbar">
            <a href="#home" className="nav-icon">
              <i className="fas fa-home"></i>
              <span>Home</span>
            </a>
            <a href="#menu" className="nav-icon">
              <i className="fas fa-list"></i>
              <span>Menu</span>
            </a>
            <a href="#search" className="nav-icon">
              <i className="fas fa-search"></i>
              <span>Search</span>
            </a>
            <a href="#cart" className="nav-icon">
              <i className="fas fa-shopping-cart"></i>
              <span>Cart</span>
            </a>
            <a href="#profile" className="nav-icon">
              <i className="fas fa-user"></i>
              <span>My Profile</span>
            </a>
            <a href="#logout" className="nav-icon" onClick={handleLogout}>
              <i className="fas fa-sign-out-alt"></i>
              <span>Logout</span>
            </a>
          </div>
        </div>
      )}
    </>
  );
}

export default HomeNavbar;
