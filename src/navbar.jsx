import React, { useContext, useState, useEffect } from 'react';
import { ThemeContext } from './utilities/themeprovider';
import './css/nav.css';
import LOGO from './assets/Logo.png';
import { CiLight } from "react-icons/ci";
import { MdDarkMode } from "react-icons/md";
import { FaBars, FaTimes } from 'react-icons/fa'; // For hamburger and close icons
import { Link } from 'react-router-dom';
import { getAuth, signOut } from "firebase/auth"; // Import Firebase auth
import { auth } from './firebase_config'; 
import TuitorLogin from './widgets/becomeTuitor/betuitorlogin';

const Navbar = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [menuOpen, setMenuOpen] = useState(false); 
  const [user, setUser] = useState(null); 
  const [dropdownVisible, setDropdownVisible] = useState(false); 
  const [tuitorLogin, setTuitorLogin] = useState(false); 

  // Function to toggle mobile menu
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };


  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

const handleLoginclick = () =>{
  setTuitorLogin(!tuitorLogin);
}



  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null); // Clear user data
      setDropdownVisible(false); // Close the dropdown after logout
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  useEffect(() => {
    const unsubscribe = getAuth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user); // Set user data if authenticated
      } else {
        setUser(null); // Reset user if not authenticated
      }
    });

    return () => unsubscribe(); // Cleanup the subscription when the component unmounts
  }, []);

  return (
    <nav className="navbar">
    <div className="navbarcontents">
    <div className="logoandclasses" style={{display:'flex', justifyContent:'center', alignItems:'center', gap:'20px'}}>
        <Link to={'/'}>  <img className="Logo" src={LOGO} alt="Logo" /></Link>
        <div className="Title">
        <Link style={{textDecoration:'none', color:'inherit'}} to={'/'}>
          <h2>E-Tuition Nepal</h2>
        </Link>
      </div>
        {!menuOpen && (
          <div style={{marginRight:"100px"}} className={`navlinks ${menuOpen ? 'active' : ''}`}>
                 {!user ? (
              <button className="navbuttons" onClick={handleLoginclick}>Login</button> // Show "Login" if user is not authenticated
            ) : (
              <div className="profile-container" onClick={toggleDropdown} style={{ position: 'relative' }}>
                <img className="profile-pic" src={user.photoURL} alt="Profile" style={{ width: '40px', height: '40px', borderRadius: '50%' }} />
                {dropdownVisible && (
                  <div className="dropdown-menu" style={{ position: 'absolute', top: '50px', right: '0', backgroundColor: '#fff', padding:'10px', display:'flex', width:'100px', flexDirection:'column', boxShadow: '0px 8px 16px rgba(0,0,0,0.2)', zIndex: 1 }}>
                    <Link to="/profile" className="dropdown-item">View Profile</Link>
                    <Link to="/settings" className="dropdown-item">Settings</Link>
                    <button onClick={handleLogout} className="dropdown-item">Logout</button>
                  </div>
                )}
              </div>
            )}
            <button className="navbuttons">About</button>
       
          </div>
        )}
      </div>
     
    <div className="search-container-navbar">
      <input
        type="text"
        placeholder="Search Anything..."
        className="search-input"
      />
      <div className="search-iconContainer"><div className="search_icon"></div></div>
    </div>

      

      <div className={`navlinks ${menuOpen ? 'active' : ''}`}>
        {menuOpen && (
          <>
            <button className="navbuttons">About</button>
            {!user ? (
              <button className="navbuttons">Login</button> // Show "Login" if user is not authenticated
            ) : (
              <div className="profile-container" onClick={toggleDropdown} style={{ position: 'relative' }}>
                <img className="profile-pic" src={user.photoURL} alt="Profile" style={{ width: '40px', height: '40px', borderRadius: '50%' }} />
                {dropdownVisible && (
                  <div className="dropdown-menu" style={{ position: 'absolute', top: '50px', right: '0', backgroundColor: '#fff', boxShadow: '0px 8px 16px rgba(0,0,0,0.2)', zIndex: 1 }}>
                    <Link to="/profile" className="dropdown-item">View Profile</Link>
                    <Link to="/settings" className="dropdown-item">Settings</Link>
                    <button onClick={handleLogout} className="dropdown-item">Logout</button>
                  </div>
                )}
              </div>
            )}
          </>
        )}
        <Link style={{textDecoration:'none', color:'inherit'}} to={'/iamatuitor'}>  <button className="navbuttons">Become a Tutor</button></Link>
        <Link style={{textDecoration:'none', color:'inherit'}} to={'/onlineclasses'}>  <button className="navbuttons">Online Classes</button></Link>
        <button className="navbuttons" style={{display:'flex', gap:'10px'}} onClick={toggleTheme}>
          {menuOpen ? (
            <>
              Change Theme {theme === 'dark' ? <CiLight /> : <MdDarkMode />}
            </>
          ) : (
            theme === 'dark' ? <CiLight /> : <MdDarkMode />
          )}
        </button>
      </div>

      <div className="hamburger" onClick={toggleMenu}>
        {menuOpen ? <FaTimes /> : <FaBars />} {/* Show either bars or times icon */}
      </div>
    </div>
      {tuitorLogin &&(
        <TuitorLogin close={handleLoginclick}/>
      )}
    </nav>
  );
};

export default Navbar;
