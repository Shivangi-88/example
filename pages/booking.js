import { useState } from 'react';
import BookingForm from '../components/BookingForm';
import BookingSummary from '../components/BookingSummary';
import { createBooking } from '../utils/api';

const Booking = () => {
  const [bookingDetails, setBookingDetails] = useState(null);

  const handleBookingSubmit = async (details) => {
    const response = await createBooking(details);
    setBookingDetails(response.data);
  };

  return (
    <div>
      <h2>Book Your Table</h2>
      {!bookingDetails ? (
        <BookingForm onSubmit={handleBookingSubmit} />
      ) : (
        <BookingSummary bookingDetails={bookingDetails} />
      )}
    </div>
  );
};

export default Booking;
