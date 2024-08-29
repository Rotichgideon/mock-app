import React from 'react';
import './OrderConfirmation.css'; // Import the CSS file

function OrderConfirmation({ orders, onConfirmOrder }) {
  if (!Array.isArray(orders)) {
    return <div className="error-message">Error: Orders is not an array</div>;
  }

  const confirmOrder = () => {
    onConfirmOrder(orders);
  };

  return (
    <div className="order-confirmation-container">
      <h2 className="order-confirmation-title">Order Confirmation</h2>
      <ul className="order-list">
        {orders.map((order, index) => (
          <li key={index} className="order-item">
            {order.name} - <span className="order-price">${order.price}</span>
          </li>
        ))}
      </ul>
      <button className="confirm-order-button" onClick={confirmOrder}>
        Confirm Order
      </button>
    </div>
  );
}

export default OrderConfirmation;
