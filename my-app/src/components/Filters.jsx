import React, { useState, useEffect } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css"; // Import the slider's CSS

const FilterCategory = ({ title, children, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="filter-category">
      <div className="filter-header" onClick={() => setIsOpen(!isOpen)}>
        <span>{title}</span>
        <span className={`toggle-arrow ${!isOpen ? "collapsed" : ""}`}>▼</span>
      </div>
      <div className={`filter-options ${!isOpen ? "hidden" : ""}`}>
        {children}
      </div>
    </div>
  );
};

// Debounce function to limit API calls
const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
};

const Filters = ({ filters, setFilters }) => {
  // Internal state for search term to handle debouncing
  const [internalSearchTerm, setInternalSearchTerm] = useState(filters.searchTerm);

  // Debounced search term update
  const debouncedSetSearchTerm = React.useCallback(
    debounce((value) => {
      setFilters((prev) => ({ ...prev, searchTerm: value }));
    }, 500), // 500ms debounce delay
    [setFilters]
  );

  useEffect(() => {
    debouncedSetSearchTerm(internalSearchTerm);
  }, [internalSearchTerm, debouncedSetSearchTerm]);

  const handleCheckboxChange = (category, value) => {
    setFilters((prev) => {
      const updated = { ...prev };
      const currentValues = updated[category] || []; // Ensure it's an array
      if (currentValues.includes(value)) {
        updated[category] = currentValues.filter((item) => item !== value);
      } else {
        updated[category] = [...currentValues, value];
      }
      return updated;
    });
  };

  const handleClearFilters = () => {
    setFilters({
      type: [],
      price: { min: 0, max: 6000 },
      rating: 0,
      searchTerm: ""
    });
    setInternalSearchTerm(""); // Clear internal search term as well
  };

  const handlePriceChange = (value) => {
    setFilters((prev) => ({
      ...prev,
      price: { min: value[0], max: value[1] },
    }));
  };

  return (
    <aside className="filters">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <h3>Filters</h3>
        <button onClick={handleClearFilters} style={{ background: "none", border: "none", color: "#3182ce", cursor: "pointer", fontSize: "14px", fontWeight: "600" }}>
          Clear All
        </button>
      </div>

      {/* Search Input */}
      <FilterCategory title="SEARCH">
        <div className="search-bar" style={{ margin: "0" }}>
          <input
            type="text"
            placeholder="Search products..."
            value={internalSearchTerm}
            onChange={(e) => setInternalSearchTerm(e.target.value)}
          />
        </div>
      </FilterCategory >

      {/* TYPE */}
      <FilterCategory title="TYPE">
        <ul>
          {["daily", "weekly", "monthly"].map((type) => (
            <li key={type}>
              <label>
                <input
                  type="checkbox"
                  checked={filters.type.includes(type)}
                  onChange={() => handleCheckboxChange("type", type)}
                />
                {type}
              </label>
            </li>
          ))}
        </ul>
      </FilterCategory>

      {/* PRICE */}
      <FilterCategory title="PRICE" defaultOpen={true}>
        <div className="price-range-slider" style={{ padding: "0 10px" }}>
          <Slider
            range
            min={0}
            max={6000}
            defaultValue={[filters.price.min, filters.price.max]}
            value={[filters.price.min, filters.price.max]}
            onChange={handlePriceChange}
            trackStyle={[{ backgroundColor: '#3182ce' }]}
            handleStyle={[{ backgroundColor: '#3182ce', borderColor: '#3182ce' }, { backgroundColor: '#3182ce', borderColor: '#3182ce' }]}
            railStyle={{ backgroundColor: '#e2e8f0' }}
          />
          <div className="price-inputs" style={{ justifyContent: "space-between", marginTop: "15px" }}>
            <span>₹{filters.price.min}</span>
            <span>₹{filters.price.max}</span>
          </div>
        </div>
      </FilterCategory>

      {/* CUSTOMER RATINGS */}
      <FilterCategory title="CUSTOMER RATINGS" defaultOpen={true}>
        <ul>
          {[4, 3, 2, 1].map((r) => (
            <li key={r}>
              <label>
                <input
                  type="radio"
                  name="rating"
                  checked={filters.rating === r}
                  onChange={() => setFilters((prev) => ({ ...prev, rating: r }))}
                />
                {r} ★ & above
              </label>
            </li>
          ))}
        </ul>
      </FilterCategory>
    </aside>
  );
};

export default Filters;
