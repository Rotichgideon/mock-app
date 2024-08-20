// src/components/OrderConfirmation.js

import React from 'react';

function OrderConfirmation({ orders, onConfirmOrder }) {
  if (!Array.isArray(orders)) {
    return <div>Error: Orders is not an array</div>;
  }

  const confirmOrder = () => {
    onConfirmOrder(orders);
  };

  return (
    <div>
      <h2>Order Confirmation</h2>
      <ul>
        {orders.map((order, index) => (
          <li key={index}>
            {order.name} - ${order.price}
          </li>
        ))}
      </ul>
      <button onClick={confirmOrder}>Confirm Order</button>
    </div>
  );
}

export default OrderConfirmation;
