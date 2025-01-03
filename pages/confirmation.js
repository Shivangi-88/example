// /pages/confirmation.js
import { useRouter } from 'next/router';
import React from 'react';

const Confirmation = () => {
  const router = useRouter();
  const { name, contact, date, time, guests } = router.query; // Get query parameters from the URL

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>Booking Confirmation</h1>
      {name ? (
        <div>
          <h2>Your Reservation Details:</h2>
          <p><strong>Name:</strong> {name}</p>
          <p><strong>Contact:</strong> {contact}</p>
          <p><strong>Date:</strong> {date}</p>
          <p><strong>Time:</strong> {time}</p>
          <p><strong>Guests:</strong> {guests}</p>
          <p>Your table has been successfully booked!</p>
        </div>
      ) : (
        <p>Loading your reservation details...</p>
      )}
    </div>
  );
};

export default Confirmation;
