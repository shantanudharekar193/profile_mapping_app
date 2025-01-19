import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import MapComponent from "../components/MapComponent";
import './ProfileDetails.css';
import '../components/MapComponent.css'

const ProfileDetails = ({ profiles }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  if (!profiles || profiles.length === 0) {
    return <p>Loading profile details...</p>;
  }

  const profile = profiles.find((p) => p.id === parseInt(id));

  if (!profile) {
    return <p>Profile not found!</p>;
  }

  return (
    <div className="profile-details">
      <button onClick={() => navigate(-1)}>Go Back</button>
      <h2>{profile.name}</h2>
      <p>{profile.description}</p>
      {/* Render the map with the selected location */}
      {console.log(`selected location in profile.jsx 53,`, typeof(profile.location))}

      <MapComponent location={profile.location} />
    </div>
  );
};

export default ProfileDetails;
