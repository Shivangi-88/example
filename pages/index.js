import React from 'react';
import styles from '../styles/Home.module.css';
import Link from 'next/link';

const Home = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Welcome to Our Restaurant</h1>
      <p className={styles.description}>
        Reserve a table at our restaurant and enjoy a great dining experience. We offer a variety of dishes and a comfortable atmosphere for all guests.
      </p>
      <div className={styles.buttonContainer}>
        <Link href="/book">
          <button className={styles.button}>Make a Reservation</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
