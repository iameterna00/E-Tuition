import ReactSlider from 'react-slider';

function Filters({setLocationFilter, setGenderFilter, setSearchTerm, priceRange, handlePriceChange}) {
    return (
        <div className="vaccancyfilters">
     <div className="filtercomponents" style={{display:"flex", width:"100%"}}>
     <div className="filterboxs">
          <div className="filterbox">
            <h3>Gender</h3>
            <select
               onChange={(e) => setGenderFilter(e.target.value)}
             name="Gender" id="Gender">
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
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
                    renderThumb={(props, state) => {
                      const { key, ...restProps } = props; // Extract 'key' separately
                      return <div key={key} {...restProps}></div>;
                  }}
                  
                  />
                 
                </div>
         </div>
     </div>
      
          
        </div>
          <div className="search-container-vaccancy">
                <input
                 onChange={(e) => setSearchTerm(e.target.value)}
                 type="text" placeholder="Search location, Subjects..." className="search-vaccancy" />
                <div className="search-vaccancyiconcontainer"><div className="search_vaccancyicon"></div></div>
              </div>
      </div>
    )
}
export default Filters;