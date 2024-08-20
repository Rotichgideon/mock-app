// src/components/NavBar.jsx
import React, { useState, useEffect, useRef } from 'react';
import './NavBar.css';
import SearchBar from './SearchBar';

const NavBar = ({ setActivePage, cart, handleIncreaseQuantity, handleDecreaseQuantity, handleDeleteItem, handleClearCart }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [mpesaNumber, setMpesaNumber] = useState('');
  const cartRef = useRef(null);

  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleOrderSubmit = () => {
    if (!paymentMethod) {
      alert('Please select a payment method');
      return;
    }
    alert(`Order Submitted! Payment Method: ${paymentMethod}, Mpesa Number: ${mpesaNumber}`);
    handleClearCart();
    setIsCartOpen(false);
  };

  const handleClickOutside = (event) => {
    if (cartRef.current && !cartRef.current.contains(event.target)) {
      setIsCartOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className="nav-bar">
      <ul>
        <li onClick={() => setActivePage('home')}>Home</li>
        <li onClick={() => setActivePage('menu')}>Menu</li>
        <li onClick={() => setActivePage('confirmOrder')}>Confirm Orders</li>
        <li onClick={() => setActivePage('bookTable')}>Book Table</li>
        <li onClick={() => setActivePage('profile')}>Profile</li>
        <li onClick={() => setActivePage('contactUs')}>Contact Us</li>
        <li onClick={() => setActivePage('admin')}>Admin</li>
        <li>
          <SearchBar />
        </li>
        <li onClick={() => setIsCartOpen(!isCartOpen)} className="cart-icon">
          🛒 <span>{cartItemCount}</span>
          {isCartOpen && (
            <div ref={cartRef} className="cart-dropdown">
              {cart.length === 0 ? (
                <p>No items in cart</p>
              ) : (
                <>
                  {cart.map(cartItem => (
                    <div key={cartItem.id} className="cart-item">
                      <div className="cart-item-details">
                        <span className="item-name">{cartItem.name}</span>
                        <span className="item-price">${cartItem.price}</span>
                        <div className="quantity-control">
                          <button onClick={() => handleDecreaseQuantity(cartItem.id)}>-</button>
                          <span>{cartItem.quantity}</span>
                          <button onClick={() => handleIncreaseQuantity(cartItem.id)}>+</button>
                        </div>
                        <button onClick={() => handleDeleteItem(cartItem.id)} className="delete-button">X</button>
                      </div>
                    </div>
                  ))}
                  <div className="cart-total">
                    <span>Total: ${totalPrice.toFixed(2)}</span>
                    <div className="payment-options">
                      <label>
                        <input 
                          type="radio" 
                          name="payment" 
                          value="Mpesa" 
                          checked={paymentMethod === 'Mpesa'}
                          onChange={() => setPaymentMethod('Mpesa')} 
                        />
                        Mpesa
                      </label>
                      <label>
                        <input 
                          type="radio" 
                          name="payment" 
                          value="Cash" 
                          checked={paymentMethod === 'Cash'}
                          onChange={() => setPaymentMethod('Cash')} 
                        />
                        Cash
                      </label>
                      <label>
                        <input 
                          type="radio" 
                          name="payment" 
                          value="Card" 
                          checked={paymentMethod === 'Card'}
                          onChange={() => setPaymentMethod('Card')} 
                        />
                        Card
                      </label>
                      {paymentMethod === 'Mpesa' && (
                        <div className="mpesa-field">
                          <label>Mpesa Number:</label>
                          <input
                            type="text"
                            value={mpesaNumber}
                            onChange={(e) => setMpesaNumber(e.target.value)}
                          />
                        </div>
                      )}
                    </div>
                    <button onClick={handleOrderSubmit}>Submit Order</button>
                  </div>
                </>
              )}
            </div>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
