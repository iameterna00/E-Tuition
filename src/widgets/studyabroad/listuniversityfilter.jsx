import ReactSlider from 'react-slider';

function FilterUniversity({ setSearchTerm, priceRange = [0, 5000], handlePriceChange }) {
  return (
    <div className="vaccancyfilters">
      <div className="filter-box">
        <h3>Estimated Cost of Living</h3>
        <p style={{ margin: '0px', fontSize: '14px' }}>
          USD {priceRange[0]} - USD {priceRange[1]} /month
        </p>
        <ReactSlider
          className="price-slider"
          thumbClassName="price-slider-thumb"
          trackClassName="price-slider-track"
          min={0}
          max={5000}
          step={10}
          value={priceRange}
          onChange={handlePriceChange}
          renderThumb={(props, state) => {
            const { key, ...restProps } = props;
            return <div key={key} {...restProps}></div>;
          }}
        /> 
      </div>

      <div className="search-container-vaccancy">
        <input
          onChange={(e) => setSearchTerm(e.target.value)}
          type="text"
          placeholder="Search by university name"
          className="search-input"
        />
         <div className="search-vaccancyiconcontainer"><div className="search_vaccancyicon"></div></div>
      </div>
    </div>
  );
}

export default FilterUniversity;
