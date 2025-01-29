import React, { useContext, useState, useEffect } from 'react';
import { ThemeContext } from './utilities/themeprovider';
import './css/nav.css';
import LOGO from './assets/KUBE.png';
import { CiLight } from "react-icons/ci";
import { MdDarkMode } from "react-icons/md";
import { FaBars, FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { getAuth, signOut } from "firebase/auth"; 
import { auth } from './firebase_config'; 
import TuitorLogin from './widgets/login/betuitorlogin';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser, selectUser } from './services/Redux/userSlice';

const Navbar = () => {
  const dispatch = useDispatch();
  const myuser = useSelector(selectUser);
  const { theme, toggleTheme } = useContext(ThemeContext);

  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [tuitorLogin, setTuitorLogin] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const toggleDropdown = () => setDropdownVisible(!dropdownVisible);
  const handleLoginclick = () => setTuitorLogin(!tuitorLogin);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setDropdownVisible(false);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  // Prevent scrolling when modal is open
  useEffect(() => {
    document.body.classList.toggle('modal-open', tuitorLogin);
  }, [tuitorLogin]);

  // Handle Firebase authentication and fetch user details
  useEffect(() => {
    const authInstance = getAuth();
    const unsubscribe = authInstance.onAuthStateChanged((firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
        dispatch(fetchUser(firebaseUser.uid));
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe(); // Cleanup the subscription on unmount
  }, [dispatch]);

  // Change navbar style on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav className={`navbar ${isScrolled ? 'solid' : ''}`}>
        <div className="navbarcontents">
          <div className="logoandclasses" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '20px' }}>
            <Link to='/'>
              <img className="Logo" src={LOGO} alt="Logo" />
            </Link>
            <div className="Title">
              <Link to='/' style={{ textDecoration: 'none', color: 'inherit' }}>
                <h2>KUBE</h2>
              </Link>
            </div>
            {!menuOpen && (
              <div style={{ marginRight: "100px" }} className={`navlinks ${menuOpen ? 'active' : ''}`}>
                {!user ? (
                  <button className="navbuttons" onClick={handleLoginclick}>Login</button>
                ) : (
                  <div className="profile-container" onClick={toggleDropdown} style={{ position: 'relative' }}>
                    <img
                      className="profile-pic"
                      src={myuser?.profile}
                      alt="Profile"
                      style={{ width: '35px', height: '35px', borderRadius: '50%', objectFit:"cover" }}
                    />
                    {dropdownVisible && (
                      <div className="dropdown-menu" style={{ position: 'absolute', top: '50px', right: '0', backgroundColor: isScrolled ? "rgb(40,45,45)" : "transparent", padding: '10px', display: 'flex', flexDirection: 'column', boxShadow: '0px 8px 16px rgba(0,0,0,0.2)', zIndex: 1 }}>
                        <Link to="/profile" className="dropdown-item">Profile</Link>
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
            <input type="text" placeholder="Search Anything..." className="search-input" />
            <div className="search-iconContainer"><div className="search_icon"></div></div>
          </div>

          <div className={`navlinks ${menuOpen ? 'active' : ''}`}>
            {menuOpen && (
              <>
                <button className="navbuttons">About</button>
                {!user ? (
                  <button className="navbuttons">Login</button>
                ) : (
                  <div className="profile-container" onClick={toggleDropdown} style={{ position: 'relative' }}>
                    <img
                      className="profile-pic"
                      src={user.photoURL}
                      alt="Profile"
                      style={{ width: '40px', height: '40px', borderRadius: '50%' }}
                    />
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
            <Link to='/iamatuitor' style={{ textDecoration: 'none', color: 'inherit' }}>
              <button className="navbuttons">Become a Tutor</button>
            </Link>
            <Link to='/onlineclasses' style={{ textDecoration: 'none', color: 'inherit' }}>
              <button className="navbuttons">Online Classes</button>
            </Link>
            <button className="navbuttons" style={{ display: 'flex', gap: '10px' }} onClick={toggleTheme}>
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
            {menuOpen ? <FaTimes /> : <FaBars />}
          </div>
        </div>
      </nav>

      {/* Modal */}
      {tuitorLogin && (
        <div className="loginModal">
          <TuitorLogin close={handleLoginclick} />
        </div>
      )}
    </>
  );
};

export default Navbar;
