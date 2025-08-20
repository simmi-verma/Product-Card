import React, { useState, useEffect } from "react";

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

const Filters = ({ filters, setFilters }) => {
  const handleCheckboxChange = (category, value) => {
    setFilters((prev) => {
      const updated = { ...prev };
      if (updated[category].includes(value)) {
        updated[category] = updated[category].filter((item) => item !== value);
      } else {
        updated[category] = [...updated[category], value];
      }
      return updated;
    });
  };

  return (
    <aside className="filters">
      <h3>Filters</h3>

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
        <div className="price-inputs">
          <input
            type="number"
            placeholder="Min"
            value={filters.price.min}
            onChange={(e) =>
              setFilters((prev) => ({
                ...prev,
                price: { ...prev.price, min: Number(e.target.value) },
              }))
            }
          />
          {" to "}
          <input
            type="number"
            placeholder="Max"
            value={filters.price.max}
            onChange={(e) =>
              setFilters((prev) => ({
                ...prev,
                price: { ...prev.price, max: Number(e.target.value) },
              }))
            }
          />
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
