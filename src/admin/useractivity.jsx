import React, { useEffect, useState } from 'react';
import { webApi } from '../api';

const UsersActivity = () => {
  const [activeStats, setActiveStats] = useState({
    total_active: 0,
    logged_in_users: 0,
    guests: 0,
    users: [] // list of usernames or "Guest"
  });

  useEffect(() => {
    const fetchActiveUsers = async () => {
      try {
        const response = await fetch(`${webApi}/api/active-users`);
        const data = await response.json();
        setActiveStats(data);
        console.log('Fetched active users', data);
      } catch (error) {
        console.error("Error fetching active users:", error);
      }
    };

    fetchActiveUsers();
    const interval = setInterval(fetchActiveUsers, 60000); // every 60 sec

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <h2>👥 Active User Stats (last 5 mins)</h2>
      <ul>
        <li>Total Active: {activeStats.total_active}</li>
        <li>Logged In Users: {activeStats.logged_in_users}</li>
        <li>Guests: {activeStats.guests}</li>
      </ul>

      <h3>Active Users:</h3>
      <ul>
        {activeStats.users.map((username, index) => (
          <li key={index}>{username}</li>
        ))}
      </ul>
    </div>
  );
};

export default UsersActivity;
