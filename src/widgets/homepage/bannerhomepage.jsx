import { useState } from 'react';
import Tutor from '../../assets/teacher.png';
import TuitorLogin from '../login/betuitorlogin';

function HomeBanner({ user }) {
   const [tuitorLogin, setTuitorLogin] = useState(false);
   
   const handleLoginclick = () => setTuitorLogin(!tuitorLogin);
   const handleExploreClick = () => {
    const vacancySection = document.getElementById("vacancy-section");
    if (vacancySection) {
        vacancySection.scrollIntoView({ behavior: "smooth" });
    }
};


   return (
      <div className="homeBanner">
         <div className="homefiltercontainer">
            <div className="blue-dot" alt="" />
            <div className="homebannertext">
               <h1>Professional <br /> And Life Long Learning <br />Comes Here</h1>
               <div className="getstartedbuttos">
                  {!user && (
                     <div className="getstarted" onClick={handleLoginclick}>
                        <button>Get Started</button>
                     </div>
                  )}
                  <div className="Explore">
                     <button onClick={handleExploreClick}>Explore Courses</button>
                  </div>
               </div>
            </div>
            <img className='tuitorpngbanner' src={Tutor} alt="" />
         </div>
         {tuitorLogin && (
            <TuitorLogin close={handleLoginclick} />
         )}
      </div>
   );
}

export default HomeBanner;
