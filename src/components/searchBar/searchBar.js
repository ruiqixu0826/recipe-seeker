import { useState, useEffect } from "react";
import "./searchBar.css";
import { useNavigate } from "react-router-dom"; // if using React Router

const SearchBar = () => {
  const [advSearch, setAdvSearch] = useState(false);
  const [maxTime, setMaxTime] = useState("45");
  const [preferences, setPreferences] = useState({
    glutenFree: false,
    lactoseFree: false,
    vegan: false,
    ovoVegetarian: false,
    vegetarian: false,
  });
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const savedAdvSearch = JSON.parse(localStorage.getItem("advSearch")) || false;
    const savedSearchTerm = localStorage.getItem("searchTerm") || "";
    const savedMaxTime = localStorage.getItem("maxTime") || "45";
    const savedPreferences = JSON.parse(
      localStorage.getItem("preferences")
    ) || {
      glutenFree: false,
      lactoseFree: false,
      vegan: false,
      ovoVegetarian: false,
      vegetarian: false,
    };
    setAdvSearch(savedAdvSearch);
    setSearchTerm(savedSearchTerm);
    setMaxTime(savedMaxTime);
    setPreferences(savedPreferences);
  }, []);

  const toggleAdvancedSearch = (e) => {
    if (!e.target.checked) {
      setMaxTime("45");
      setPreferences({
        glutenFree: false,
        lactoseFree: false,
        vegan: false,
        ovoVegetarian: false,
        vegetarian: false,
      });
      localStorage.setItem("maxTime", maxTime);
      localStorage.setItem("preferences", JSON.stringify(preferences));
    }
    setAdvSearch(e.target.checked);
    localStorage.setItem("advSearch", e.target.checked);
  };

  const sliderChange = (e) => {
    setMaxTime(e.target.value);
    localStorage.setItem("maxTime", e.target.value);
  };

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setPreferences((prev) => ({ ...prev, [name]: checked }));
    localStorage.setItem("preferences", JSON.stringify(preferences));
  };

  const performSearch = () => {
    // Save to local storage

    // Navigate to search page
    navigate("/search", {
      state: { searchTerm, maxTime, preferences }, // passing state to the route
    });
  };

  return (
    <>
      <div className="container">
        <div className="row my-2">
          <div className="search-bar">
            <input
              type="text"
              className="form-control form-control-lg rounded-pill"
              placeholder="Search Recipes..."
              aria-label="Search"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                localStorage.setItem("searchTerm", e.target.value);
              }}
            ></input>
          </div>
        </div>
        <div className="row m-0">
          <div className="form-check">
            <input
              type="checkbox"
              className="d-flex form-check-input"
              checked={advSearch}
              onChange={toggleAdvancedSearch}
            ></input>
            <label>Advanced Search</label>
          </div>
        </div>
        <div className="row mt-3">
          {advSearch ? (
            <>
              <label className="form-label">Maximum Ready Time</label>
              <strong>{maxTime < 195 ? `${maxTime} mins` : "No Limit"}</strong>
              <div>
                <input
                  type="range"
                  className="form-range"
                  min="15"
                  max="195"
                  step="15"
                  value={maxTime}
                  onChange={sliderChange}
                ></input>
              </div>

              <div>
                <label className="form-label">Dietary Preferences</label>
                <label className="form-label">Dietary Preferences</label>
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    name="glutenFree"
                    checked={preferences.glutenFree}
                    onChange={handleCheckboxChange}
                  />
                  <label>Gluten-Free</label>
                </div>
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    name="lactoseFree"
                    checked={preferences.lactoseFree}
                    onChange={handleCheckboxChange}
                  />
                  <label>Lactose-Free</label>
                </div>
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    name="vegan"
                    checked={preferences.vegan}
                    onChange={handleCheckboxChange}
                  />
                  <label>Vegan</label>
                </div>
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    name="ovoVegetarian"
                    checked={preferences.ovoVegetarian}
                    onChange={handleCheckboxChange}
                  />
                  <label>Ovo-Vegetarian</label>
                </div>
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    name="vegetarian"
                    checked={preferences.vegetarian}
                    onChange={handleCheckboxChange}
                  />
                  <label>Vegetarian</label>
                </div>
              </div>
            </>
          ) : (
            <></>
          )}
        </div>
        <div className="row d-flex m-0 justify-content-center">
          <div className="col-3">
            <button
              className="btn w-100 btn-primary rounded-pill"
              type="button"
              id="button-addon2"
              onClick={performSearch}
            >
              Search
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchBar;
