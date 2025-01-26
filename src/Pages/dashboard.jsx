import React, { useState, useEffect } from 'react';
import { webApi } from '../api';

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch(`${webApi}/api/get-users`);
                if (!response.ok) {
                    throw new Error(`Error: ${response.status} ${response.statusText}`);
                }
                const data = await response.json();
                console.log(data); // Log the response to check structure
                setUsers(data.users || []);
            } catch (err) {
                setError(err.message);
            }
        };
    
        fetchUsers();
    }, []);
    

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!users.length) {
        return <div>No users found.</div>;
    }

    return (
        <ul>
            {users.map((user) => (
                <li key={user.id}>
                    {user.name} ({user.email})
                </li>
            ))}
        </ul>
    );
};

export default UserList;
