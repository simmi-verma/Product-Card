import React from "react";

const SortBar = ({ sortBy, setSortBy, productCount, totalProducts }) => {
  const sortOptions = [
    { label: "Popularity", value: "popularity" },
    { label: "Price -- Low to High", value: "lowToHigh" },
    { label: "Price -- High to Low", value: "highToLow" },
    { label: "Newest First", value: "newest" },
    { label: "Customer Rating", value: "rating" }
  ];

  return (
    <header className="listing-header">
      <h1>
        Products
        <span>
          Showing {productCount} of {totalProducts} results
        </span>
      </h1>

      {/* ⚡ Sort Section */}
      <div className="sort-options">
        <strong>Sort By:</strong>
        {sortOptions.map((option) => (
          <button
            key={option.value}
            className={sortBy === option.value ? "active" : ""}
            onClick={() => setSortBy(option.value)}
          >
            {option.label}
          </button>
        ))}
      </div>
    </header>
  );
};

export default SortBar;
