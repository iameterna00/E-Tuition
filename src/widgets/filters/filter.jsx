import ReactSlider from 'react-slider';

function Filters({setLocationFilter, setGenderFilter, setSearchTerm, priceRange, handlePriceChange}) {
    return (
        <div className="vaccancyfilters">
        <div className="filterboxs">
       {setLocationFilter === 'no need' ? null : (
           <div className="filterbox">
           <h3>Location</h3>
           <select 
            onChange={(e) => setLocationFilter(e.target.value)}
           name="location" id="location">
             <option value="">Select Location</option>
             <option value="Kathmandu">Kathmandu</option>
             <option value="Lalitpur">Lalitpur</option>
             <option value="Bhaktapur">Bhaktapur</option>
           </select>
         </div>
       )}
          <div className="filterbox">
            <h3>Gender</h3>
            <select
               onChange={(e) => setGenderFilter(e.target.value)}
             name="Gender" id="Gender">
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
         <div className="filterox">
         <div className="price-slider-container">
                <div className="pricerangeofslider">
                <h3 style={{margin:'0px'}} >
                   Price Range
                  </h3>
                  <p style={{margin:'0px', fontSize:'14px'}}>
                   Rs {priceRange[0]} - Rs {priceRange[1]}
                  </p></div>
                  <ReactSlider
                    className="price-slider"
                    thumbClassName="price-slider-thumb"
                    trackClassName="price-slider-track"
                    min={0}
                    max={25000}
                    step={500}
                    defaultValue={[0, 10000]}
                    value={priceRange}
                    onChange={handlePriceChange}
                    renderThumb={(props, state) => <div {...props}></div>}
                  />
                 
                </div>
         </div>
      
          
        </div>
          <div className="search-container-vaccancy">
                <input
                 onChange={(e) => setSearchTerm(e.target.value)}
                 type="text" placeholder="Search Anything..." className="search-vaccancy" />
                <div className="search-vaccancyiconcontainer"><div className="search_vaccancyicon"></div></div>
              </div>
      </div>
    )
}
export default Filters;