
import '../../css/betuitor.css'
import heroimg from '../../assets/hero.png'
function BetuitotBanner() {
  return (
 <div className="betuitorBanner">
       <div className="betuitorfiltercontainer">
      <div className="bannerinsiders">
      <div className="bannerdiv"  > 
        <div className="bannertext">
            <h3>Be A Tuitor With <br/>E-Tuition Nepal</h3>
            <div className="getstartedbetuitorButton">
        <div className="getstartedbetuitor"><button>Sign Up</button></div>
        <div className="Explorebetuitor"><button>Explore Courses</button></div>
        </div>
        </div>
        <img src={heroimg} className='bannerimg' alt="" />
        </div>
       
      </div>
    
    </div>

 </div>
  );
}

export default BetuitotBanner;
