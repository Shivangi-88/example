// /pages/book.js

import React from 'react';
import BookingForm from '../components/BookingForm'; // Assuming the form is in the 'components' folder

const Book = () => {
  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>Make a Reservation</h1>
      <p>Reserve a table at our restaurant by filling out the form below.</p>
      <BookingForm /> {/* Render the booking form here */}
    </div>
  );
};

export default Book;
