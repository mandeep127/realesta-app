// // components/PropertyFilter.jsx
// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { applyFilters } from "../../store/PropertyAPI/propertyApiSlice";

// const PropertyFilter = () => {
//   const dispatch = useDispatch();
//   const {
//     properties = [],
//     loading,
//     error,
//   } = useSelector((state) => state.property || {});

//   const [filters, setFilters] = useState({
//     property_type_id: "",
//     minPrice: "",
//     maxPrice: "",
//     minBedrooms: "",
//     maxBedrooms: "",
//   });
//   console.log("Property", properties.data);
//   useEffect(() => {
//     dispatch(applyFilters(filters));
//   }, [filters, dispatch]);

//   const handleTypeChange = (value, checked) => {
//     const updatedTypes = checked
//       ? [...filters.property_type_id, value]
//       : filters.property_type_id.filter((type) => type !== value);

//     setFilters((prevFilters) => ({
//       ...prevFilters,
//       property_type_id: updatedTypes,
//     }));
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault(); // Prevent default form submission
//     dispatch(applyFilters(filters)); // Dispatch action to apply filters
//   };

//   return (
//     <div>
//       <h3>Filter Properties</h3>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <h5>Property Type:</h5>
//           <label>
//             <input
//               type="checkbox"
//               value="1"
//               checked={filters.property_type_id.includes("1")}
//               onChange={(e) => handleTypeChange("1", e.target.checked)}
//             />
//             Residential
//           </label>
//           <label>
//             <input
//               type="checkbox"
//               value="2"
//               checked={filters.property_type_id.includes("2")}
//               onChange={(e) => handleTypeChange("2", e.target.checked)}
//             />
//             MultiFamily
//           </label>
//         </div>
//         <div>
//           <input
//             type="number"
//             name="minPrice"
//             placeholder="Min Price"
//             value={filters.minPrice}
//             onChange={handleInputChange}
//           />
//           <input
//             type="number"
//             name="maxPrice"
//             placeholder="Max Price"
//             value={filters.maxPrice}
//             onChange={handleInputChange}
//           />
//           <input
//             type="number"
//             name="minBedrooms"
//             placeholder="Min Bedrooms"
//             value={filters.minBedrooms}
//             onChange={handleInputChange}
//           />
//           <input
//             type="number"
//             name="maxBedrooms"
//             placeholder="Max Bedrooms"
//             value={filters.maxBedrooms}
//             onChange={handleInputChange}
//           />
//         </div>
//         <button type="submit">Apply Filters</button>
//       </form>
//       {loading && <p>Loading...</p>}
//       {error && <p>Error: {error}</p>}
//       <div>
//         <h4>Properties</h4>
//         <ul>
//           {properties.map((property) => (
//             <li key={property.id}>{property.address}</li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default PropertyFilter;

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { applyFilters } from "../../store/PropertyAPI/propertyApiSlice";

const PropertyFilter = () => {
  const dispatch = useDispatch();
  const {
    properties = [],
    loading,
    error,
  } = useSelector((state) => state.property || {});

  const [filters, setFilters] = useState({
    property_type_id: [],
    min_price: "",
    max_price: "",
    min_bedrooms: "",
    max_bedrooms: "",
  });

  useEffect(() => {
    // Construct the query parameters object
    const queryParams = {
      ...filters,
      // Ensure to handle property_type_id as a comma-separated string
      property_type_id: filters.property_type_id.join(","),
    };

    // Dispatch the action with the query parameters object
    dispatch(applyFilters(queryParams));
  }, [filters, dispatch]);

  const handleTypeChange = (value, checked) => {
    const updatedTypes = checked
      ? [...filters.property_type_id, value]
      : filters.property_type_id.filter((type) => type !== value);

    setFilters((prevFilters) => ({
      ...prevFilters,
      property_type_id: updatedTypes,
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Construct the query parameters object on form submission
    const queryParams = {
      ...filters,
      property_type_id: filters.property_type_id.join(","),
    };
    dispatch(applyFilters(queryParams));
  };

  return (
    <div>
      <h3>Filter Properties</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <h5>Property Type:</h5>
          <label>
            <input
              type="checkbox"
              value="1"
              checked={filters.property_type_id.includes("1")}
              onChange={(e) => handleTypeChange("1", e.target.checked)}
            />
            Residential
          </label>
          <label>
            <input
              type="checkbox"
              value="2"
              checked={filters.property_type_id.includes("2")}
              onChange={(e) => handleTypeChange("2", e.target.checked)}
            />
            MultiFamily
          </label>
        </div>
        <div>
          <input
            type="number"
            name="min_price"
            placeholder="Min Price"
            value={filters.min_price}
            onChange={handleInputChange}
          />
          <input
            type="number"
            name="max_price"
            placeholder="Max Price"
            value={filters.max_price}
            onChange={handleInputChange}
          />
          <input
            type="number"
            name="min_bedrooms"
            placeholder="Min Bedrooms"
            value={filters.min_bedrooms}
            onChange={handleInputChange}
          />
          <input
            type="number"
            name="max_bedrooms"
            placeholder="Max Bedrooms"
            value={filters.max_bedrooms}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">Apply Filters</button>
      </form>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <div>
        <h4>Properties</h4>
        <ul>
          {properties.map((property) => (
            <li key={property.id}>{property.address}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PropertyFilter;
