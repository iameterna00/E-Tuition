
import '../../css/betuitor.css'
import heroimg from '../../assets/hero.png'
import { Link, useNavigate } from 'react-router-dom';

function BetuitotBanner() {
  const navigate = useNavigate();





  return (
 <div className="betuitorBanner">
       <div className="betuitorfiltercontainer">
      <div className="bannerinsiders">
      <div className="bannerdiv"  > 
        <div className="bannertext">
            <h3>Be A Tuitor With KUBE</h3>
            <p style={{margin:"0px"}}>Offer your knowledge</p>
            <div className="getstartedbetuitorButton">
        <div className="getstartedbetuitor"><Link to={'/tuitorform'}><button>Become a Tuitor</button></Link></div>
        </div>
        </div>
        {/* <img src={heroimg} className='bannerimg' alt="" /> */}
        </div>
       
      </div>
    
    </div>

 </div>
  );
}

export default BetuitotBanner;
