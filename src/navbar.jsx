import React, { useContext, useState, useEffect } from 'react';
import { ThemeContext } from './utilities/themeprovider';
import './css/nav.css';
import LOGO from './assets/KUBE.png';
import KUBE from './assets/newcube.png';
import { CiLight } from "react-icons/ci";
import { MdDarkMode } from "react-icons/md";
import { FaBars, FaTimes } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, signOut } from "firebase/auth"; 
import { auth } from './firebase_config'; 
import TuitorLogin from './widgets/login/betuitorlogin';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser, selectUser } from './services/Redux/userSlice';
import { webApi } from './api';
import { FaUsersGear } from "react-icons/fa6";

const Navbar = () => {
  const dispatch = useDispatch();
  const myuser = useSelector(selectUser);
  const { theme, toggleTheme } = useContext(ThemeContext);

  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [tuitorLogin, setTuitorLogin] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [tuitorsloacing, settuitotsLoading] = useState(false); 

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const toggleDropdown = () => setDropdownVisible(!dropdownVisible);
  const handleLoginclick = () => setTuitorLogin(!tuitorLogin);
  const navigate = useNavigate();

  const handleLinkClick = () => {
    setMenuOpen(false); // Close the navbar when a link is clicked
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setDropdownVisible(false);
      window.location.reload(); // This will refresh the page
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };
  


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
  
  const updateUserType = async (purpose) => {
    settuitotsLoading(true);
    try {
      const response = await fetch(`${webApi}/api/update-purpose`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ uid: myuser.uid, purpose }),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        alert(data.message || "Failed to update purpose.");
        return;
      }
  
      if (purpose === 'student') {
        navigate('/'); 
         window.location.reload(); // Ensures navigation completes before reloading
      } else {
        navigate('/iamatuitor');
        window.location.reload();
      }
  
    } catch (error) {
      console.error("Error updating purpose:", error);
      alert("An error occurred. Please try again later.");
    } finally {
      settuitotsLoading(false);
    }
  };
  

  
  
  
  

  return (
    <>
      <nav className={`navbar ${isScrolled || menuOpen ? 'solid' : ''}`}>
        <div className="navbarcontents">
          <div className="logoandclasses" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '20px' }}>
            <Link to='/'onClick={handleLinkClick}>
              <img className="Logo" src={KUBE} alt="Logo" />
            </Link>
            <div className="Title">
              <Link onClick={handleLinkClick} to='/' style={{ textDecoration: 'none', color: 'inherit' }}>
                <h2>KUBE</h2>
              </Link>
            </div>
            {/* {!menuOpen && (
              <div style={{ marginRight: "100px" }} className={`navlinks ${menuOpen ? 'active' : ''}`}>
         
                <Link to={'/admin'}><button className="navbuttons">About</button></Link>
              </div>
            )} */}
          </div>

          <div className="search-container-navbar">
            <input type="text" placeholder="Search Anything..." className="search-input" />
            <div className="search-iconContainer"><div className="search_icon"></div></div>
          </div>

          <div  className={`navlinks ${menuOpen ? 'active' : ''}`}>
            {/* {menuOpen && (
              <>
                <button className="navbuttons">About</button>
            
              </>
            )} */}
       {myuser?.teacherconfirm === 'pending' || myuser?.teacherconfirm === 'approved' ? (
  <>
    {myuser.purpose === 'student' ? (
  
  <button onClick={() => updateUserType('teacher')} className="navbuttons">
  Switch as Tutor
</button>
    
    ) : (
     
      <button onClick={() => updateUserType('student')} className="navbuttons">
      Switch as student
    </button>

    )}
  </>
) : (
  <Link onClick={handleLinkClick} to='/iamatuitor' style={{ textDecoration: 'none', color: 'inherit' }}>
    <button className="navbuttons">Become a Tutor</button>
  </Link>
)}

            {/* <Link to='/onlineclasses' style={{ textDecoration: 'none', color: 'inherit' }}>
              <button className="navbuttons">Online Classes</button>
            </Link> */}
           {!menuOpen &&(
            <>
             {!user ? (
             <button
             className="navbuttons"
             onClick={() => {
               handleLoginclick();  // Handle login logic
               handleLinkClick();   // Close the navbar
             }}
           >
             Login
           </button>
           
            ) : (
              <div className="profile-container" onClick={toggleDropdown} style={{ position: 'relative' }}>
                <img
                  className="profile-pic"
                  src={myuser?.profile}
                  alt="Profile"
                  style={{ width: '35px', height: '35px', borderRadius: '50%', objectFit:"cover" }}
                />
                {dropdownVisible && (
                  <div className="dropdown-menu" style={{ position: 'absolute', top: '50px', right: '0', backgroundColor: isScrolled ? "rgb(40,45,45)" : "transparent", padding: '10px 20px', display: 'flex', flexDirection: 'column', boxShadow: '0px 8px 16px rgba(0,0,0,0.2)', zIndex: 1 }}>
                    <Link onClick={handleLinkClick} to="/profile" className="dropdown-item">Profile</Link>
                    <Link onClick={handleLinkClick} to="/settings" className="dropdown-item">Settings</Link>
                    <button onClick={handleLogout} className="dropdown-item">Logout</button>
                  </div>
                )}
              </div>
            )}</>
           )}
            <button className="navbuttons" style={{ display: 'flex', gap: '10px' }} onClick={()=>{toggleTheme(); handleLinkClick();}}>
              {menuOpen ? (
                <>
                
                  Change Theme {theme === 'dark' ? <CiLight /> : <MdDarkMode />}
                </>
              ) : (
                theme === 'dark' ? <CiLight /> : <MdDarkMode />
              )}
            </button>
            {menuOpen && (
  <>
    <div 
      style={{display:'flex', justifyContent:'center', alignItems:"center", gap:"10px"}} 
      className="profileinsidemenubar"
    >
      {!user ?(
         <button
         className="navbuttons"
         onClick={() => {
           handleLoginclick();  // Handle login logic
           handleLinkClick();   // Close the navbar
         }}
       >
         Login
       </button>
       
      ):(
        <Link 
        to="/profile" 
        className="dropdown-item" 
        onClick={() => setMenuOpen(false)} // Close menu on click
      >
        Your Profile
      </Link>
      )}
    </div>
{user?(
      <div style={{padding:"10px"}}
      
      onClick={() => {
        handleLogout();
      handleLinkClick();
        setMenuOpen(false); // Close menu on logout
      }} 
      className="dropdown-item"
    >
      Logout
    </div>
):(null)}
  </>
)}

          </div>

          <div className="hamburger" onClick={toggleMenu}>
            {menuOpen ? <FaTimes /> : <FaBars />}
          </div>
        </div>
      </nav>

      {/* Modal */}
      {tuitorLogin && (
      
          <TuitorLogin close={handleLoginclick} />
       
      )}
   {tuitorsloacing && (
  <div className="loading-modal">
   <div className="switchinganimationcontainer">
   <div className="loading-animation">
    <FaUsersGear style={{marginLeft:"-20px", fontSize:"100px"}} />
    </div>
    <p>Loading, please wait...</p>
   </div>
  </div>
)}

    </>
  );
};

export default Navbar;
