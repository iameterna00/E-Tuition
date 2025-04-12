import React, { useEffect, useState } from 'react';
import { webApi } from '../api';

const UsersActivity = () => {
  const [activeStats, setActiveStats] = useState({
    total_active: 0,
    logged_in_users: 0,
    guests: 0,
    users: []
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const abortController = new AbortController();

    const fetchActiveUsers = async () => {
      try {
        const response = await fetch(`${webApi}/api/active-users`, {
          signal: abortController.signal
        });
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        if (isMounted) {
          setActiveStats(data);
          setError(null);
        }
      } catch (error) {
        if (error.name !== 'AbortError' && isMounted) {
          console.error("Error fetching active users:", error);
          setError("Failed to load active users. Please try again later.");
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    // Initial fetch
    fetchActiveUsers();
    
   
    const interval = setInterval(fetchActiveUsers, 30000); // Poll every 30 seconds

    return () => {
      isMounted = false;
      clearInterval(interval);
      abortController.abort();
    };
  }, []);

  if (isLoading) {
    return <div>Loading active user data...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="user-activity-container">
      <h2>👥 Active User Stats (last 5 mins)</h2>
      <ul className="stats-list">
        <li>Total Active: <strong>{activeStats.total_active}</strong></li>
        <li>Logged In Users: <strong>{activeStats.logged_in_users}</strong></li>
        <li>Guests: <strong>{activeStats.guests}</strong></li>
      </ul>

      {activeStats.users.length > 0 ? (
        <>
          <h3>Active Users:</h3>
          <ul className="user-list">
            {activeStats.users.map((username, index) => (
              <li key={`${username}-${index}`}>
                {username === "Guest" ? "🎭 Guest" : `👤 ${username}`}
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p>No active users at the moment.</p>
      )}
    </div>
  );
};

export default UsersActivity;