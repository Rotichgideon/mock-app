import React, { useState, useEffect } from 'react';

const TableBooking = () => {
  const [bookings, setBookings] = useState([]); // Initialize with an empty array

  useEffect(() => {
    // Fetch bookings data from an API or some source
    // For example:
    // fetch('/api/bookings')
    //   .then(response => response.json())
    //   .then(data => setBookings(data))
    //   .catch(error => console.error('Error fetching bookings:', error));
    
    // Simulating fetched data
    const fetchedBookings = [
      { id: 1, name: 'John Doe', time: '18:00' },
      { id: 2, name: 'Jane Smith', time: '19:00' },
    ];
    setBookings(fetchedBookings);
  }, []);

  if (!bookings) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Table Bookings</h2>
      <ul>
        {bookings.map((booking) => (
          <li key={booking.id}>
            {booking.name} - {booking.time}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TableBooking;
