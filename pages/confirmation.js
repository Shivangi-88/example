import { useRouter } from 'next/router';
import React from 'react';
import axios from 'axios';

const Confirmation = () => {
  const router = useRouter();
  const { name, contact, date, time, guests, bookingId } = router.query; // Get query parameters from the URL

  const handleNextReservation = () => {
    // Navigate to the booking page for a new reservation
    router.push('/book');
  };

  const handleDeleteBooking = async () => {
    if (!bookingId) {
      router.push('/')
      return;
    }

    try {
      const response = await axios.delete(`/api/delete/${bookingId}`);
      alert(response.data.message || 'Booking successfully deleted!');
      router.push('/booking'); // Redirect to the booking page after deletion
    } catch (err) {
      console.error('Error deleting booking:', err);
      alert('Failed to delete booking. Please try again.');
    }
  };

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

          {/* Action Buttons */}
          <div style={{ marginTop: '20px' }}>
            <button
              style={{
                padding: '10px 20px',
                margin: '0 10px',
                border: 'none',
                borderRadius: '5px',
                backgroundColor: '#4caf50',
                color: 'white',
                cursor: 'pointer',
              }}
              onClick={handleNextReservation}
            >
              Next Booking
            </button>
            <button
              style={{
                padding: '10px 20px',
                margin: '0 10px',
                border: 'none',
                borderRadius: '5px',
                backgroundColor: '#f44336',
                color: 'white',
                cursor: 'pointer',
              }}
              onClick={handleDeleteBooking}
            >
              Delete Booking
            </button>
          </div>
        </div>
      ) : (
        <p>Loading your reservation details...</p>
      )}
    </div>
  );
};

export default Confirmation;
