export const createBooking = async (details) => {
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
  