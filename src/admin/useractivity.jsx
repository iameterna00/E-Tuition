import React, { useEffect, useState } from 'react';
import { webApi } from '../api';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const UsersActivity = () => {
  const [activeStats, setActiveStats] = useState({
    total_active: 0,
    logged_in_users: 0,
    guest_users: 0,
    users: []
  });
  
  const [dailyActivity, setDailyActivity] = useState({
    date: '',
    unique_users: 0,
    logged_in_users: 0,
    guest_users: 0,
    user_breakdown: {
      logged_in: [],
      guests: []
    }
  });
  
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch real-time active users
  useEffect(() => {
    const fetchActiveUsers = async () => {
      try {
        const response = await fetch(`${webApi}/api/active-users`);
        if (!response.ok) throw new Error("Failed to fetch active users");
        const data = await response.json();
        setActiveStats(data);
      } catch (err) {
        console.error("Error fetching active users:", err);
        setError("Failed to load active users");
      }
    };

    fetchActiveUsers();
    const intervalId = setInterval(fetchActiveUsers, 30000); // Refresh every 30 seconds

    return () => clearInterval(intervalId);
  }, []);

  // Fetch daily activity data
  useEffect(() => {
    const fetchDailyActivity = async () => {
      try {
        const response = await fetch(`${webApi}/api/daily-activity`);
        if (!response.ok) throw new Error("Failed to fetch daily activity");
        const data = await response.json();
        setDailyActivity(data);
        setIsLoading(false);
      } catch (err) {
        console.error("Error fetching daily activity:", err);
        setError("Failed to load daily activity");
        setIsLoading(false);
      }
    };

    fetchDailyActivity();
  }, []);

  // Prepare weekly data for the chart
  const prepareWeeklyData = () => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const today = new Date().getDay();
    
    return days.map((day, index) => {
      if (index === today) {
        return {
          name: day,
          total: activeStats.total_active,
          loggedIn: activeStats.logged_in_users,
          guests: activeStats.guest_users, // Changed from activeStats.guests to activeStats.guest_users
          amt: activeStats.total_active
        };
      }
      
      return {
        name: day,
        total: dailyActivity.unique_users,
        loggedIn: dailyActivity.logged_in_users,
        guests: dailyActivity.guest_users, // Changed from 0 to dailyActivity.guest_users
        amt: dailyActivity.unique_users
      };
    });
  };

  if (isLoading) return <div className="loading">Loading user activity data...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="user-activity-container">
      {/* Real-time Stats Section */}
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
            <h3>Currently Active:</h3>
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

      {/* Daily Activity Section */}
      <div className="daily-stats-section">
        <h2 className="section-title">📅 Daily Activity - {dailyActivity.date}</h2>
        <div className="stats-grid">
          <div className="stat-card total">
            <h3>Unique Users</h3>
            <p className="stat-value">{dailyActivity.unique_users}</p>
          </div>
          <div className="stat-card logged-in">
            <h3>Logged In</h3>
            <p className="stat-value">{dailyActivity.logged_in_users}</p>
          </div>
          <div className="stat-card guests">
            <h3>Guests</h3>
            <p className="stat-value">{dailyActivity.guest_users}</p>
          </div>
        </div>
      </div>

      {/* Weekly Activity Chart */}
      <div className="charts-section">
        <h2 className="section-title">📊 Weekly Activity Patterns</h2>
        <div className="chart-container">
          <ResponsiveContainer width="100%" height={400}>
            <BarChart
              data={prepareWeeklyData()}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#424242" vertical={false} />
              <XAxis 
                dataKey="name" 
                tick={{ fill: '#9e9e9e' }}
                axisLine={{ stroke: '#424242' }}
              />
              <YAxis 
                tick={{ fill: '#9e9e9e' }}
                axisLine={{ stroke: '#424242' }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#333',
                  borderColor: '#424242',
                  color: '#e0e0e0'
                }}
                cursor={false}
              />
              <Legend 
                wrapperStyle={{ paddingTop: '20px' }}
                formatter={(value) => <span style={{ color: '#e0e0e0' }}>{value}</span>}
              />
              <Bar 
                dataKey="total" 
                name="Total Active" 
                fill="#4CAF50"
                radius={[10, 10, 0, 0]} 
              />
              <Bar 
                dataKey="loggedIn" 
                name="Logged In" 
                fill="#42A5F5"
                radius={[10, 10, 0, 0]} 
              />
              <Bar 
                dataKey="guests" 
                name="Guests" 
                fill="#EF5350"
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