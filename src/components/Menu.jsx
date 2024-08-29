import React from 'react';
import './Menu.css'; // Import the CSS file

const Menu = ({ menu, handleAddToCart }) => {
  if (!menu || menu.length === 0) {
    return <p className="menu-empty">No menu items available</p>;
  }

  return (
    <div className="menu-container">
      <h2 className="menu-title">Menu</h2>
      <ul className="menu-list">
        {menu.map((menuItem) => (
          <li key={menuItem.id} className="menu-item">
            <div className="menu-item-details">
              <span className="menu-item-name">{menuItem.name}</span>
              <span className="menu-item-price">${menuItem.price}</span>
            </div>
            <button 
              className="menu-item-button" 
              onClick={() => handleAddToCart(menuItem)}
            >
              Add to Cart
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Menu;
