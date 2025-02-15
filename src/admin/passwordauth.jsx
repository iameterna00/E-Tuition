import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PasswordAuth = ({ route }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = () => {
    const correctUsernameForAdmin = 'adminuser'; // Predefined username for /admin
    const correctPasswordForAdmin = 'admin123'; // Predefined password for /admin

    const correctUsernameForTeacher = 'adminuser'; // Predefined username for /admin/teacher
    const correctPasswordForTeacher = 'admin123'; // Predefined password for /admin/teacher

    const trimmedUsername = username.trim();
    const trimmedPassword = password.trim();

    if (!route) {
      setError('Invalid route. Please try again.');
      return;
    }

    if (route === '/admin' && trimmedUsername === correctUsernameForAdmin && trimmedPassword === correctPasswordForAdmin) {
      navigate('/admin/teachermanager'); // Redirect to the admin dashboard
    } else if (route === '/admin/teacher' && trimmedUsername === correctUsernameForTeacher && trimmedPassword === correctPasswordForTeacher) {
      navigate('/admin/teachermanager'); // Redirect to the teacher manager dashboard
    } else {
      setError('Incorrect username or password. Please try again.');
    }
  };

  return (
    <div className="auth-container">
      <div className="authcontainerinsiders">
        <h2>{route === '/admin' ? 'Admin Login' : 'Teacher Manager Login'}</h2>
        <input
          type="text"
          placeholder="Enter username"
          value={username}
          onChange={handleUsernameChange}
        />
        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={handlePasswordChange}
        />
        <button onClick={handleLogin}>Login</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>
    </div>
  );
};

export default PasswordAuth;