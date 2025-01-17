import React, { useEffect, useState } from 'react';

function HomeTuitorOffer() {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft()); // Initial countdown state

  // Function to calculate time left
  function calculateTimeLeft() {
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 29); // Add 29 days
    targetDate.setHours(0, 0, 0, 0); // Set time to midnight

    const now = new Date();
    const difference = targetDate - now;

    if (difference > 0) {
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / (1000 * 60)) % 60);
      const seconds = Math.floor((difference / 1000) % 60);
      return { days, hours, minutes, seconds };
    }

    return { days: 0, hours: 0, minutes: 0, seconds: 0 }; // Time is up
  }

  // Update the countdown every second
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer); // Cleanup interval on unmount
  }, []);

  return (
    <div className="offer-banner">
    <div className="dontmissout">
    <h2>Don’t miss out!</h2>
      <div className="countdown-timer">
      <span>{String(timeLeft.days).padStart(2, '0')}</span> 
        <span>{String(timeLeft.hours).padStart(2, '0')} </span> :
        <span>{String(timeLeft.minutes).padStart(2, '0')} </span> :
        <span>{String(timeLeft.seconds).padStart(2, '0')}</span>
      </div>
    </div>
     <div className="plandetail">
     <p>+ 20% off with the 3-month plan</p>
     <h3>{String(timeLeft.days).padStart(2, '0')} Days Left</h3> 
     </div>
    </div>
  );
}

export default HomeTuitorOffer;
