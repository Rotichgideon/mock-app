import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import './App.css';
import OrderSummary from './components/OrderSummary';
import OrderConfirmation from './components/OrderConfirmation';
import TableBooking from './components/TableBooking';
import NavBar from './components/NavBar';
import Menu from './components/Menu';
import Profile from './components/Profile';
import ContactUs from './components/ContactUs';
import Admin from './components/Admin';
import Login from './components/Login';
import Register from './components/Register';
import { isAuthenticated, logout } from './services/api';

function App() {
  const [menu, setMenu] = useState([
    { id: 1, name: 'Pizza', price: 10 },
    { id: 2, name: 'African ugali', price: 7 },
    { id: 3, name: 'Roasted chicken', price: 12 },
    { id: 4, name: 'Pilau', price: 9 },
    { id: 5, name: 'Fried cales', price: 7 },
    { id: 6, name: 'Milk shake', price: 6 },
  ]);
  const [filteredMenu, setFilteredMenu] = useState(menu);
  const [cart, setCart] = useState([]);
  const [activePage, setActivePage] = useState('home');

  const handleAddToCart = async (menuItem) => {
    if (!isAuthenticated()) {
      setActivePage('login');
      return;
    }

    const existingItem = cart.find((item) => item.id === menuItem.id);
    if (existingItem) {
      setCart(cart.map((item) =>
        item.id === menuItem.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCart([...cart, { ...menuItem, quantity: 1 }]);
    }
  };

  const handleIncreaseQuantity = (menuItemId) => {
    setCart(cart.map((item) =>
      item.id === menuItemId ? { ...item, quantity: item.quantity + 1 } : item
    ));
  };

  const handleDecreaseQuantity = (menuItemId) => {
    setCart(cart.map((item) =>
      item.id === menuItemId && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
    ).filter((item) => item.quantity > 0));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const handleLogout = () => {
    logout();
    setActivePage('home');
  };

  return (
    <Router>
      <div className="App">
        <NavBar 
          setActivePage={setActivePage} 
          cart={cart} 
          handleIncreaseQuantity={handleIncreaseQuantity} 
          handleDecreaseQuantity={handleDecreaseQuantity} 
          handleClearCart={handleClearCart}
        />
        <Switch>
          <Route path="/home">
            <div>
              {activePage === 'home' && (
                <div className="home-page">
                  <h1>Welcome to the Food Court!</h1>
                  <img src="https://img.freepik.com/free-photo/modern-interior-restaurant-design_1409-7395.jpg?semt=sph" alt="Home Banner" className="home-banner" />
                </div>
              )}
              {activePage === 'menu' && (
                <Menu menu={filteredMenu} handleAddToCart={handleAddToCart} />
              )}
              {activePage === 'confirmOrder' && <OrderConfirmation orders={cart} onConfirmOrder={() => alert('Order Confirmed')} />}
              {activePage === 'bookTable' && <TableBooking />}
              {activePage === 'profile' && <Profile />}
              {activePage === 'contactUs' && <ContactUs />}
              {activePage === 'admin' && <Admin />}
              {activePage === 'login' && <Login setActivePage={setActivePage} />}
              {activePage === 'register' && <Register setActivePage={setActivePage} />}
            </div>
          </Route>
          <Redirect from="/" to="/home" />
        </Switch>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </Router>
  );
}

export default App;
