import React, { useState, useEffect } from 'react';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch users when the component is mounted
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/get-users/');
        const data = await response.json();
        setUsers(data.users); // Store users in state
        setLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        console.error('Error fetching users:', error);
        setLoading(false); // Set loading to false even on error
      }
    };

    fetchUsers();
  }, []); // Empty array ensures this runs only once on mount

  if (loading) {
    return <div>Loading users...</div>;
  }

  return (
    <div>
      <h2>User List</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.email}{user.username} </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
