
import '../../css/betuitor.css'
import Tuitot from '../../assets/teacher.png'
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
     
        <img className='tuitorpngbanner' src={Tuitot} alt="" />
        
    </div>
    <div className="bottombarbanner">
  <div className="bottombarbuttons">
  <button>Home Tuitor</button>
  <button>Online Tuitor</button>
  </div>
    </div>

 </div>
  );
}

export default HomeBanner;
