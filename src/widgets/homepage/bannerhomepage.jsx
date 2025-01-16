
import Tutor from '../../assets/teacher.png'
function HomeBanner() {
  return (
 <div className="homeBanner">
       <div className="homefiltercontainer">
        <div className="blue-dot" alt="" />
        <div className="homebannertext">
            <h1>Professional  <br/> And Life Long Learning <br/>Comes Here</h1>
            <div className="getstartedbuttos">
        <div className="getstarted"><button>Get Started</button></div>
        <div className="Explore"><button>Explore Courses</button></div>
        </div>
        </div>
     
        <img className='tuitorpngbanner' src={Tutor} alt="" />
        
    </div>

 </div>
  );
}

export default HomeBanner;
