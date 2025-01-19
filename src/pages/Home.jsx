import React, { useState, useEffect } from "react";
import ProfileList from "../components/ProfileList";
import MapComponent from "../components/MapComponent";
import Loader from "../components/Loader";
import { getProfiles } from "../services/api";
import './Home.css';

const Home = () => {
  const [profiles, setProfiles] = useState([]);
  const [filteredProfiles, setFilteredProfiles] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProfiles()
      .then((data) => {
        setProfiles(data);
        setFilteredProfiles(data);
      })
      .catch(() => setError("Failed to fetch profiles. Please try again later."))
      .finally(() => setLoading(false));
  }, []);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setFilteredProfiles(
      profiles.filter(
        (profile) =>
          profile.name.toLowerCase().includes(query) ||
          profile.description.toLowerCase().includes(query)
      )
    );
  };

  if (loading) return <Loader />;
  if (error) return <p>{error}</p>;

  return (
    <div className="home-container">
      <h2 className="home-header">Home</h2>
      <p className="home-description">Welcome to the home page</p>
      <input
        type="text"
        placeholder="Search profiles..."
        onChange={handleSearch}
        style={{ marginBottom: "16px", padding: "8px", width: "100%" }}
      />
      <ProfileList
        profiles={filteredProfiles}
        onSummaryClick={(profile) => setSelectedLocation(profile.location)}
      />
      {console.log(`selected location in home.jsx 53,${selectedLocation}`,typeof(selectedLocation))}
      {selectedLocation && <MapComponent location={selectedLocation} />}
    </div>
  );
};

export default Home;
