import { FaSearch } from "react-icons/fa"; // Importing a search icon

function OnlineClassBanner() {
  return (
 <div className="onlineclassBanner">
       <div className="onlineclassfiltercontainer">
      <h3>Learn Beyond Boundaries</h3>
      <div className="searchContainer">
        <div className="searchBar">
          <FaSearch className="searchIcon" /> {/* Search Icon */}
          <input
          
            placeholder="Search Courses Here.."
          />
        </div>
      </div>
    </div>
    <div className="onlineclassfilter">
        <div className="onlineclassfilterList">
            <div className="SubjectArea">Subject Area</div>
            <div className="SubjectArea">Price</div>
            <div className="SubjectArea">Duration</div>
        </div>
    </div>
 </div>
  );
}

export default OnlineClassBanner;
