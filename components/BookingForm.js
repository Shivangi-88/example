import React, { useState } from 'react';
import { useRouter } from 'next/router'; // Import the useRouter hook for navigation
import styles from '../styles/BookingForm.module.css';

const BookingForm = () => {
  const [details, setDetails] = useState({
    name: '',
    contact: '',
    date: '',
    time: '',
    guests: '',
  });
  const [error, setError] = useState('');  // To store error message
  const router = useRouter(); // Initialize the router

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  // Function to check if the selected time slot is available
  const checkAvailability = async (date, time) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/check-availability?date=${date}&time=${time}`,
        {
          method: 'GET',
        }
      );

      const data = await response.json();
      return data.isAvailable;
    } catch (error) {
      console.error('Error checking availability:', error);
      return false;
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if the selected time slot is available
    const isAvailable = await checkAvailability(details.date, details.time);
    if (!isAvailable) {
      setError('Selected time slot is already booked. Please choose another time.');
      return;
    }

    // If available, create the booking
    const response = await createBooking(details);
    if (response) {
      // Redirect to confirmation page and pass details as query params
      router.push({
        pathname: '/confirmation',
        query: details, // Pass the details as query parameters
      });
    } else {
      alert('Error with booking!');
    }
  };

  // Function to make the API call for booking
  const createBooking = async (details) => {
    try {
      const response = await fetch('http://localhost:5000/api/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(details),
      });
      return await response.json();
    } catch (error) {
      console.error('Error creating booking:', error);
      return null;
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      {/* Form Fields */}
      <div className={styles.inputGroup}>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={details.name}
          onChange={handleChange}
          required
        />
      </div>
      <div className={styles.inputGroup}>
        <label>Contact Number:</label>
        <input
          type="text"
          name="contact"
          value={details.contact}
          onChange={handleChange}
          required
        />
      </div>
      <div className={styles.inputGroup}>
        <label>Reservation Date:</label>
        <input
          type="date"
          name="date"
          value={details.date}
          onChange={handleChange}
          required
        />
      </div>
      <div className={styles.inputGroup}>
        <label>Reservation Time:</label>
        <input
          type="time"
          name="time"
          value={details.time}
          onChange={handleChange}
          required
        />
      </div>
      <div className={styles.inputGroup}>
        <label>Number of Guests:</label>
        <input
          type="number"
          name="guests"
          value={details.guests}
          onChange={handleChange}
          required
        />
      </div>
      {error && <div className={styles.error}>{error}</div>} {/* Show error if any */}
      <button type="submit" className={styles.submitButton}>Submit Reservation</button>
    </form>
  );
};

export default BookingForm;
