
import '../../css/betuitor.css'
import beTuitot from '../../assets/betuitor1.png'
function BetuitotBanner() {
  return (
 <div className="betuitorBanner">
       <div className="betuitorfiltercontainer">
        <img className="bannerImage" src={beTuitot} alt="" />
        <div className="bannertext">
            <h3>Be A Tuitor With <br/>E-Tuition Nepal</h3>
        </div>
    </div>

 </div>
  );
}

export default BetuitotBanner;
