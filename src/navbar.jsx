import React, { useContext } from 'react';
import { ThemeContext } from './utilities/themeprovider';
import './css/nav.css';
import LOGO from './assets/Logo.png'
import { CiLight } from "react-icons/ci";
import { MdDarkMode } from "react-icons/md";

const Navbar = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <nav className="navbar">
        <img className='Logo' src={LOGO} alt="" />
      <h1>E-Tuition Nepal</h1>
   <div className="TogleTheme" onClick={toggleTheme}>
    <button className="themeButton">
        {theme === 'dark'? <CiLight/>:<MdDarkMode/>}
    </button>
   </div>
    </nav>
  );
};

export default Navbar;
