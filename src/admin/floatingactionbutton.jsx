import React, { useState, useRef, useEffect } from 'react';
import { FaUser, FaChalkboardTeacher, FaCode } from 'react-icons/fa';
import { FaGear } from 'react-icons/fa6';
import { useNavigate } from "react-router-dom";

const FloatingActionButton = ({adminpage}) => {
  const [showIcons, setShowIcons] = useState(false);
  const fabRef = useRef(null);
  const navigate = useNavigate();

  const iconclick = () => {
      setShowIcons(!showIcons);
  };


  const handleClickOutside = (e) => {
    if (fabRef.current && !fabRef.current.contains(e.target)) {
      setShowIcons(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, []);

  const handleUserClick = () => {
    navigate('/admin/useractivity')
    setShowIcons(false);
  };

  const handlePlusClick = () => {
    navigate('/admin/teacher')
    setShowIcons(false);
  };
  const handleadminClick = () => {
    navigate('/admin')
    setShowIcons(false);
  };

  return (
    <div className="fab-container" style={{bottom: adminpage? '170px': '70px'}} ref={fabRef}>
      <button
        className="fab-main"
        onClick={iconclick}
      >
        <FaGear fontSize={20} />
      </button>

      {showIcons && (
        <div className="fab-circle-menu">
          <button 
            className="fab-circle-item user" 
            onClick={handleUserClick}
          >
            <FaUser fontSize={18} />
          </button>
          <button 
            className="fab-circle-item plus" 
            onClick={handlePlusClick}
          >
            <FaChalkboardTeacher fontSize={20} />
          </button>
          {!adminpage && (
                 <button 
                 className="fab-circle-item admin" 
                 onClick={handleadminClick}
               >
                 <FaCode fontSize={20} />
               </button>
          )}
        </div>
      )}
    </div>
  );
};

export default FloatingActionButton;