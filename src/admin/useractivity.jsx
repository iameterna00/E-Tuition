import React, { useEffect, useState } from 'react';
import { webApi } from '../api';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import FloatingActionButton from './floatingactionbutton';

const UsersActivity = () => {
  const [activeStats, setActiveStats] = useState({
    total_active: 0,
    logged_in_users: 0,
    guest_users: 0,
    users: []
  });
  const [selectedWeek, setSelectedWeek] = useState(() => {
    const today = new Date();
    const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay()));
    return startOfWeek.toISOString().split('T')[0]; 
  });
  const [availableWeeks, setAvailableWeeks] = useState([]);
  const [dailyActivity, setDailyActivity] = useState([]);
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

  useEffect(() => {
    const weeks = generatePastWeeks(10); // past 12 weeks
    setAvailableWeeks(weeks);
  }, []);
  

  // Fetch daily activity data
  useEffect(() => {
    const fetchDailyActivity = async () => {
      try {
        const response = await fetch(`${webApi}/api/weekly-activity?week=${selectedWeek}`);
        if (!response.ok) throw new Error("Failed to fetch daily activity");
        const data = await response.json();
        setDailyActivity(data);
        console.log('daily activity', data)
        setIsLoading(false);
      } catch (err) {
        console.error("Error fetching daily activity:", err);
        setError("Failed to load daily activity");
        setIsLoading(false);
      }
    };

    fetchDailyActivity();
  }, [selectedWeek]);
  

  const generatePastWeeks = (numWeeks = 10) => {
    const weeks = [];
    const today = new Date();
  
    for (let i = 0; i < numWeeks; i++) {
      const startOfWeek = new Date(today);
      startOfWeek.setDate(today.getDate() - today.getDay() - i * 7); // Assuming week starts on Sunday
      weeks.push(startOfWeek.toISOString().split('T')[0]);
    }
  
    return weeks;
  };

  
  const prepareWeeklyData = () => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    // Prepare the weekly data to display on the chart
    return dailyActivity.map((activity) => {
      const activityDate = new Date(activity.date);
      const activityDayIndex = activityDate.getDay(); 

      return {
        name: days[activityDayIndex],
        total: activity.unique_users,
        loggedIn: activity.logged_in_users,
        guests: activity.guest_users,
      };
    });
  };

  const today = new Date().toLocaleDateString(); 

  // Find today's activity data
  const todayActivity = dailyActivity.find(day => new Date(day.date).toLocaleDateString() === today);

  if (isLoading) return <div className="loading">Loading user activity data...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="user-activity-container">
        <FloatingActionButton/>
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
        <h2 className="section-title">📅 Today's Activity - {today}</h2>
        <div className="stats-grid">
          <div className="stat-card total">
            <h3>Active Users</h3>
            <p className="stat-value">{todayActivity ? todayActivity.unique_users : 0}</p>
          </div>
          <div className="stat-card logged-in">
            <h3>Logged In</h3>
            <p className="stat-value">{todayActivity ? todayActivity.logged_in_users : 0}</p>
          </div>
          <div className="stat-card guests">
            <h3>Guests</h3>
            <p className="stat-value">{todayActivity ? todayActivity.guest_users : 0}</p>
          </div>
        </div>

        {todayActivity && todayActivity.usernames.length > 0 ? (
          <div className="active-users-list">
            <h3>User Names:</h3>
            <ul>
              {todayActivity.usernames.map((username, index) => (
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
      <div className="week-selector">
          <label htmlFor="weekDropdown">Select Week:</label>
          <select
            id="weekDropdown"
            value={selectedWeek}
            onChange={(e) => setSelectedWeek(e.target.value)}
          >
            {availableWeeks.map((weekStart) => (
              <option key={weekStart} value={weekStart}>
                Week starting {new Date(weekStart).toLocaleDateString()}
              </option>
            ))}
          </select>
        </div>

      {/* Weekly Activity Chart */}
      <div className="charts-section"  >
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
                fill="teal"
                radius={[10, 10, 0, 0]} 
              />
              <Bar 
                dataKey="loggedIn" 
                name="Logged In" 
                fill="#00a4e6"
                radius={[10, 10, 0, 0]} 
              />
              <Bar 
                dataKey="guests" 
                name="Guests" 
                fill="#c23e3e"
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
