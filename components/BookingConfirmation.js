import React, { useState } from 'react';
import axios from 'axios';
import '../styles/global.css';

const BookingConfirmation = ({ bookingDetails, onReset }) => {
  const [message, setMessage] = useState('');

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`/api/delete/${bookingDetails._id}`);
      setMessage(response.data.message);
      onReset(); // Reset to allow the next reservation
    } catch (err) {
      setMessage('Error deleting booking. Please try again.');
      console.error(err);
    }
  };

  const handleNextReservation = () => {
    onReset(); // Reset to create a new reservation
  };

  return (
    <div className="booking-summary">
      <h2>Booking Confirmed!</h2>
      <p><strong>Name:</strong> {bookingDetails.name}</p>
      <p><strong>Contact:</strong> {bookingDetails.contact}</p>
      <p><strong>Date:</strong> {bookingDetails.date}</p>
      <p><strong>Time:</strong> {bookingDetails.time}</p>
      <p><strong>Guests:</strong> {bookingDetails.guests}</p>

      {message && <p className="message">{message}</p>}

      <div className="button-group">
        <button onClick={handleNextReservation}>Next Reservation</button>
        <button onClick={handleDelete} className="delete-button">Delete Booking</button>
      </div>
    </div>
  );
};

export default BookingConfirmation;
