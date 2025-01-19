import React from "react";
import { Link } from "react-router-dom";
import './ProfileCard.css';

const ProfileCard = ({ profile, onSummaryClick }) => (
  <div className="profile-card">
    <h3>{profile.name}</h3>
    <p>{profile.description}</p>
    <button onClick={() => onSummaryClick(profile)}>Show on Map</button>
    <Link to={`/profile/${profile.id}`}>View Details</Link>
  </div>
);

export default ProfileCard;
