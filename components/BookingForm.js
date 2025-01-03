import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router'; 
import styles from '../styles/BookingForm.module.css';
import '../styles/global.css';

const BookingForm = () => {
  const [details, setDetails] = useState({
    name: '',
    contact: '',
    date: '',
    time: '',
    guests: '',
  });
  const [availableSlots, setAvailableSlots] = useState([]); // Available slots for the selected date
  const [loadingSlots, setLoadingSlots] = useState(false); // Loading state for slots
  const [error, setError] = useState('');
  const router = useRouter();

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));

    // Clear error when user changes input
    if (error) setError('');
  };

  // Fetch available time slots for the selected date
  const fetchAvailableSlots = async (date) => {
    setLoadingSlots(true); // Start loading state
    try {
      const response = await fetch(
        `http://localhost:5000/api/available-slots?date=${date}`,
        { method: 'GET' }
      );
      const data = await response.json();
      if (data.availableSlots) {
        setAvailableSlots(data.availableSlots);
      } else {
        setAvailableSlots([]);
      }
    } catch (error) {
      console.error('Error fetching available slots:', error);
      setAvailableSlots([]);
    } finally {
      setLoadingSlots(false); // End loading state
    }
  };

  // Update available time slots when the date is changed
  useEffect(() => {
    if (details.date) {
      fetchAvailableSlots(details.date); // Fetch slots when a date is selected
    }
  }, [details.date]);

  // Function to check availability of a specific time slot
  const checkAvailability = async (date, time) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/check-availability?date=${date}&time=${time}`,
        { method: 'GET' }
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
        query: { ...details, bookingId: response.bookingId }, // Include booking ID
      });
    } else {
      alert('Error creating booking!');
    }
  };

  // Function to create the booking
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
        <select
          name="time"
          value={details.time}
          onChange={handleChange}
          required
        >
          <option value="">Select a time</option>
          {loadingSlots ? (
            <option value="" disabled>
              Loading slots...
            </option>
          ) : availableSlots.length > 0 ? (
            availableSlots.map((slot) => (
              <option key={slot} value={slot}>
                {slot}
              </option>
            ))
          ) : (
            <option value="" disabled>
              No slots available
            </option>
          )}
        </select>
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
      <button type="submit" className={styles.submitButton}>
        Submit Reservation
      </button>
    </form>
  );
};

export default BookingForm;
