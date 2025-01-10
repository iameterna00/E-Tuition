import React, { useContext, useState } from 'react';
import { ThemeContext } from './utilities/themeprovider';
import './css/nav.css';
import LOGO from './assets/Logo.png';
import { CiLight } from "react-icons/ci";
import { MdDarkMode } from "react-icons/md";
import { FaBars, FaTimes } from 'react-icons/fa'; // For hamburger and close icons
import { Link } from 'react-router-dom';

const Navbar = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [menuOpen, setMenuOpen] = useState(false); // State to toggle mobile menu

  // Function to toggle mobile menu
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="navbar">
       <div className="logoandclasses" style={{display:'flex', justifyContent:'center', alignItems:'center', gap:'20px'}}>
     <Link to={'/'}>  <img className="Logo" src={LOGO} alt="Logo" /></Link>
  {!menuOpen && (
         <div style={{marginRight:"100px"}} className={`navlinks ${menuOpen ? 'active' : ''}`}>
         <button className="navbuttons">About</button>
         <button className="navbuttons">Login</button>
 
       </div>
  )}
       </div>
     
      <div className="Title">
      <Link style={{textDecoration:'none', color:'inherit'}} to={'/'}>
        <h2>E-Tuition Nepal</h2>
        </Link>
      </div>
      <div className={`navlinks ${menuOpen ? 'active' : ''}`}>
      {menuOpen && (
       <>   <button className="navbuttons">About</button>
          <button className="navbuttons">Login</button></>
      )}
        <button className="navbuttons">Become a Tutor</button>
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
    </nav>
  );
};

export default Navbar;
