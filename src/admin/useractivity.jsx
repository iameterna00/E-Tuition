import React, { useEffect, useState } from 'react';
import { webApi } from '../api'; // adjust the path based on your structure

const UsersActivity = () => {
  const [activeStats, setActiveStats] = useState({
    total_active: 0,
    logged_in_users: 0,
    guests: 0
  });

  useEffect(() => {
    const fetchActiveUsers = async () => {
      try {
        const response = await fetch(`${webApi}/api/active-users`);
        const data = await response.json();
        setActiveStats(data);
        console.log('user view')
      } catch (error) {
        console.error("Error fetching active users:", error);
      }
    };

    fetchActiveUsers();

    // Optional: Refresh every minute
    const interval = setInterval(fetchActiveUsers, 6000);
  
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <h2>👥 Active User Stats (last 1 mins)</h2>
      <ul>
        <li>Total Active: {activeStats.total_active}</li>
        <li>Logged In Users: {activeStats.logged_in_users}</li>
        <li>Guests: {activeStats.guests}</li>
      </ul>
    </div>
  );
};

export default UsersActivity;
