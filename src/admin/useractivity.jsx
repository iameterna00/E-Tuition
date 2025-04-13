import React, { useEffect, useState } from 'react';
import { webApi } from '../api';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const UsersActivity = () => {
  const [activeStats, setActiveStats] = useState({
    total_active: 0,
    logged_in_users: 0,
    guests: 0,
    users: []
  });
  
  const [weeklyActivity, setWeeklyActivity] = useState(() => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return days.map(day => ({
      name: day,
      total: 0,
      loggedIn: 0,
      guests: 0,
      count: 0
    }));
  });
  
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

useEffect(() => {
  let isMounted = true;
  const abortController = new AbortController();

  const fetchActiveUsers = async () => {
    console.log("Fetching active users...");
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

        // Update weekly activity (only between 8 AM and 10 PM)
        const now = new Date();
        const dayOfWeek = now.getDay(); // 0 = Sunday, 6 = Saturday
        const hour = now.getHours();

        if (hour >= 8 && hour <= 22) {
          setWeeklyActivity(prev => {
            const updated = [...prev];
            const current = updated[dayOfWeek];

            const newCount = current.count + 1;

            updated[dayOfWeek] = {
              total: Math.round((current.total * current.count + data.total_active) / newCount),
              loggedIn: Math.round((current.loggedIn * current.count + data.logged_in_users) / newCount),
              guests: Math.round((current.guests * current.count + data.guests) / newCount),
              count: newCount
            };

            return updated;
          });
        }
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

  fetchActiveUsers();
  const intervalId = setInterval(fetchActiveUsers, 30000);

  return () => {
    isMounted = false;
    clearInterval(intervalId);
    abortController.abort();
  };
}, []);


  if (isLoading) return <div className="loading">Loading active user data...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="user-activity-container">
      <div className="live-stats-section">
        <h2 className="section-title">🔴 Live Active Users</h2>
        <div className="stats-grid">
          <div className="stat-card total">
            <h3>Total Active</h3>
            <p className="stat-value">{activeStats.total_active}</p>
          </div>
          <div className="stat-card logged-in">
            <h3>Logged In</h3>
            <p className="stat-value">{activeStats.logged_in_users}</p>
          </div>
          <div className="stat-card guests">
            <h3>Guests</h3>
            <p className="stat-value">{activeStats.guests}</p>
          </div>
        </div>

        {activeStats.users.length > 0 ? (
          <div className="active-users-list">
            <h3>Active Users:</h3>
            <ul>
              {activeStats.users.map((username, index) => (
                <li key={`${username}-${index}`}>
                  {username === "Guest" ? "🎭 Guest" : `👤 ${username}`}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p className="no-users">No active users at the moment.</p>
        )}
      </div>

      <div className="charts-section">
  <h2 className="section-title">Weekly Activity Patterns</h2>
  
  <div className="chart-container">
    <ResponsiveContainer width="100%" height={400}>
      <BarChart
        data={weeklyActivity}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
         <CartesianGrid 
          strokeDasharray="3 3" 
          stroke="#424242"
          vertical={false} // Only show horizontal grid lines
        />
        <XAxis 
          dataKey="name" 
          tick={{ fill: '#9e9e9e' }} // Light gray ticks
          axisLine={{ stroke: '#424242' }} // Dark gray axis
        />
        <YAxis 
          tick={{ fill: '#9e9e9e' }} // Light gray ticks
          axisLine={{ stroke: '#424242' }} // Dark gray axis
        />
        <Tooltip 
          contentStyle={{ 
            backgroundColor: '#333',     // Dark gray background
            borderColor: '#424242',      // Dark gray border
            color: '#e0e0e0'             // Very light gray text
          }}
          cursor={false}
        />
        <Legend 
          wrapperStyle={{ paddingTop: '20px' }}
          formatter={(value) => <span style={{ color: '#e0e0e0' }}>{value}</span>} // Very light gray legend
        />
        <Bar 
          dataKey="total" 
          name="Total Active" 
          fill="#4CAF50"   // Green
          radius={[10, 10, 0, 0]} 
        />
        <Bar 
          dataKey="loggedIn" 
          name="Logged In" 
          fill="#42A5F5"   // Light Blue
          radius={[10, 10, 0, 0]} 
        />
        <Bar 
          dataKey="guests" 
          name="Guests" 
          fill="#EF5350"   // Soft Red
          radius={[10, 10, 0, 0]} 
        />
      </BarChart>
    </ResponsiveContainer>
  </div>
</div>

    </div>
  );
};

export default UsersActivity;