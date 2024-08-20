import React from 'react';

const Menu = ({ menu, handleAddToCart }) => {
  if (!menu || menu.length === 0) {
    return <p>No menu items available</p>;
  }

  return (
    <div>
      <h2>Menu</h2>
      <ul>
        {menu.map((menuItem) => (
          <li key={menuItem.id}>
            <span>{menuItem.name}</span>
            <span>${menuItem.price}</span>
            <button onClick={() => handleAddToCart(menuItem)}>Add to Cart</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Menu;
