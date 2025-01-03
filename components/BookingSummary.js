import styles from '../styles/BookingForm.module.css';
import '../styles/global.css';

const BookingSummary = ({ bookingDetails }) => {
  return (
    <div className={styles.summaryContainer}>
      <h2>Booking Confirmation</h2>
      <p><strong>Name:</strong> {bookingDetails.name}</p>
      <p><strong>Contact:</strong> {bookingDetails.contact}</p>
      <p><strong>Date & Time:</strong> {bookingDetails.date}</p>
      <p><strong>Guests:</strong> {bookingDetails.guests}</p>
    </div>
  );
};

export default BookingSummary;
