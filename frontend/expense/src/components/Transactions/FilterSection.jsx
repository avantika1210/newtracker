import React from "react";

const FilterSection = ({
  filterCategory,
  setFilterCategory,
  filterMonth,
  setFilterMonth,
}) => {
  const categories = ["All", "Food", "Shopping", "Bills", "Travel", "Other"];
  const months = [
    "All",
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return (
    <div className="bg-white shadow-md rounded-xl p-4 flex flex-wrap gap-4 mb-6">
      <div>
        <label className="font-semibold text-gray-700 mr-2">Category:</label>
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {categories.map((cat, i) => (
            <option key={i} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="font-semibold text-gray-700 mr-2">Month:</label>
        <select
          value={filterMonth}
          onChange={(e) => setFilterMonth(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {months.map((month, i) => (
            <option key={i} value={month}>
              {month}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default FilterSection;