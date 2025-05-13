import React from 'react';
import './Footer.css'; // Link to the custom CSS
import { FaFacebook, FaInstagram, FaWhatsapp } from 'react-icons/fa';

const FooterComponent = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-logo">
          <h2>KUBE INTERNATIONAL</h2>
          <p>Professional And Life Long Learning Comes Here.</p>
        </div>

        <div className="footer-Info">
        <h3>Kathmandu, Nepal</h3>
        <p>kubenp@gmail.com</p>
        <p>+977 9768771793</p>
        <p>Bhupi Sherchan Marg, Baneshwor,  Kathmandu</p>
        </div>


        <div className="footer-links">
          <h3>Quick Links</h3>
          <a href="/">Home</a>
        
          <a href="/chat">Chats</a>
          <a href="/tutorhome">Tutor Home</a>
          <a href="/studyabroad">Study Abroad</a>
        </div>

        <div className="footer-social">
          <h3>Follow us on</h3>
          <a href="https://www.facebook.com/etuitionnepal/" target='_blank' aria-label="Facebook"><FaFacebook /> FaceBook</a>
          <a href="https://www.instagram.com/kube.np/" aria-label="Instagram" target='_blank' ><FaInstagram /> Instagram</a>
          <a href="https://wa.me/9768771793?text=Hello%20there%20!" aria-label="Instagram" target='_blank'><FaWhatsapp />WhatsApp</a>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Kube International. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default FooterComponent;
