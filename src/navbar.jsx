import React, { useContext, useState, useEffect } from 'react';
import { ThemeContext } from './utilities/themeprovider';
import './css/nav.css';
import KUBE from './assets/newcube.png';
import { CiLight, CiLogout } from "react-icons/ci";
import { MdDarkMode } from "react-icons/md";
import { FaBars, FaBook, FaChalkboardTeacher, FaPlane, FaSignInAlt, FaSignOutAlt, FaSun, FaTimes, FaUser } from 'react-icons/fa';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { getAuth, signOut } from "firebase/auth"; 
import { auth } from './firebase_config'; 
import TuitorLogin from './widgets/login/betuitorlogin';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser, selectUser } from './services/Redux/userSlice';
import { webApi } from './api';
import { FaMessage, FaUsersGear } from "react-icons/fa6";
import { FiLogOut } from "react-icons/fi";



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
  const [notificationmodalopen, setnotificationmodalopen] = useState(false);
  const toggleMenu = () => {setMenuOpen(!menuOpen); setDropdownVisible(false); }
  const toggleDropdown = () =>{ setDropdownVisible(!dropdownVisible); setMenuOpen(false);}
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
  const handlenotification = () => {
    setnotificationmodalopen(!notificationmodalopen);
    setDropdownVisible(false);
    console.log("Notification clicked");
  }
  


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
        navigate('/tutorhome');
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
      <nav className={`navbar ${isScrolled || dropdownVisible || menuOpen ? 'solid' : ''}`}>
        <div className="navbarcontents">
        {user && (
         <div className="profile-containermobile" onClick={toggleDropdown} style={{ position: 'relative', cursor:"pointer" }}>
         <img
           className="profile-pic"
           src={myuser?.profile}
           style={{ width: '35px', height: '35px', borderRadius: '50%', objectFit:"cover" }}
         />
 
   <div className={`dropdown-menu ${dropdownVisible ? "show" : ""}`}>
    <div className="dropdownmenucontents">
      <Link onClick={handleLinkClick} to="/profile" className="dropdown-item">
        <FaUser size={15}/> Profile
      </Link>
      {myuser?.teacherconfirm === 'pending' || myuser?.teacherconfirm === 'approved' && (
  <div>
    {myuser.purpose === 'student' ? (
  
  <div className='dropdown-item' onClick={() => updateUserType('teacher')}>
  <FaChalkboardTeacher size={15} /> Switch as Tutor
</div>
    
    ) : (
     
      <div className='dropdown-item' onClick={() => updateUserType('student')} >
     <FaBook/> Switch as student
    </div>

    )}

  </div>
  
)}


      <div style={{ backgroundColor: "transparent" , borderRadius:"0px"}} onClick={handleLogout} className="dropdown-item">
        <FaSignOutAlt /> Logout
      </div>
    </div>
  </div>


       </div>
       )}
          
          <div className="logoandclasses" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '20px' }}>
            <Link to='/'onClick={handleLinkClick}>
              <img className="Logo" style={{marginTop:"5px"}}  src={KUBE} alt="Logo" />
            </Link>
            <div className="Title">
              <Link onClick={handleLinkClick} to='/' style={{ textDecoration: 'none', color: 'inherit' }}>
                <h2>KUBE</h2>
              </Link>
            </div>
          </div>

      

          <div  className={`navlinks ${menuOpen ? 'active' : ''}`}>
          <Link onClick={handleLinkClick} to='/studyabroad' className='navbuttons' style={{ textDecoration: 'none', color: 'inherit' }}>
             {menuOpen && (<FaPlane/> )}<div> Study Abroad</div>
            </Link>
       
       {myuser?.teacherconfirm === 'pending' || myuser?.teacherconfirm === 'approved' ? (
  <>
    {myuser.purpose === 'student' ? (
  
  <div onClick={() => updateUserType('teacher')} className="navbuttons">
 {menuOpen && <FaChalkboardTeacher/>} Switch as Tutor
</div>
    
    ) : (
     
      <div onClick={() => updateUserType('student')} className="navbuttons">
   { menuOpen &&  <FaBook/>} Switch as student
    </div>

    )}
  </>
) : (
  <Link className='navbuttons' onClick={handleLinkClick} to='/tutorhome' style={{ textDecoration: 'none', color: 'inherit' }}>
   {menuOpen && (<FaChalkboardTeacher/> )}<div> Become a Tutor</div>
  </Link>
)}

            {/* <Link to='/academicclasses' style={{ textDecoration: 'none', color: 'inherit' }}>
              <button className="navbuttons">Academic Classes</button>
            </Link> */}
             <Link onClick={handleLinkClick} to='/chat' className='navbuttons' style={{ textDecoration: 'none', color: 'inherit' }}>
             {menuOpen && (<FaMessage/> )}<div> Chats</div>
            </Link>
            {/* {user && (
                 <div className="navbuttons" style={{ position:"relative", display: 'flex', gap: '10px' }} onClick={handlenotification} >
                 {menuOpen ? (
                   <>
                   
                   <IoIosNotifications fontSize={20} /> notifications
                   </>
                 ) : (
                   <IoIosNotifications fontSize={20} /> 
                 )}
                   {notificationmodalopen && (
                  <div className="dropdown-menupc" style={{
                     position: 'absolute', top: '50px', right: '0',  padding: '10px 20px', display: 'flex', flexDirection: 'column', boxShadow: '0px 8px 16px rgba(0,0,0,0.2)', zIndex: 1 }}>
                   <Notification/>
                  </div>
                )}
               </div>
               )} */}
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
                  style={{ width: '35px', height: '35px', borderRadius: '50%', objectFit:"cover" }}
                />
                {dropdownVisible && (
                  <div className="dropdown-menupc" style={{
                     position: 'absolute', top: '50px', right: '0',  padding: '10px 20px', display: 'flex', flexDirection: 'column', boxShadow: '0px 8px 16px rgba(0,0,0,0.2)', zIndex: 1 }}>
                    <Link onClick={handleLinkClick} to="/profile" className="dropdown-item">Profile</Link>
                    <Link onClick={handleLinkClick} to="/settings" className="dropdown-item">Settings</Link>
                    <button onClick={handleLogout} className="dropdown-item">Logout</button>
                  </div>
                )}
              </div>
            )}</>
           )}
           
            <div className="navbuttons" style={{ display: 'flex', gap: '10px' }} onClick={()=>{toggleTheme(); handleLinkClick();}}>
              {menuOpen ? (
                <>
                
                {theme === 'dark' ? <CiLight /> : <MdDarkMode />} Change Theme 
                </>
              ) : (
                theme === 'dark' ? <CiLight /> : <MdDarkMode />
              )}
            </div>
       
            {menuOpen && (
  <>
    <
    >
      {!user ?(
         <div
         className="navbuttons"
         onClick={() => {
           handleLoginclick();  // Handle login logic
           handleLinkClick();   // Close the navbar
         }}
       >
         <FaSignInAlt/> Login
       </div>
       
      ):(
        <Link 
        to="/profile" 
        className="navbuttons" 
        onClick={() => setMenuOpen(false)} // Close menu on click
      >
       <FaUser/> Your Profile
      </Link>
      )}
    </>
{user?(
      <div style={{padding:"10px"}}
      
      onClick={() => {
        handleLogout();
      handleLinkClick();
        setMenuOpen(false); // Close menu on logout
      }} 
      className="navbuttons"
    >
     <FiLogOut /> Logout
    </div>
):(null)}
  </>
)}

          </div>
         


     <div className='hamburger'>
   
        <div className="hamburger" onClick={toggleMenu}>
            {menuOpen ? <FaTimes /> : <FaBars />}
          </div>
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
