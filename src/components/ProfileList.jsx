import React from "react";
import ProfileCard from "./ProfileCard";
import './ProfileList.css';

const ProfileList = ({ profiles, onSummaryClick }) => {
  if (!profiles || profiles.length === 0) {
    return <p>No profiles available</p>;
  }

  return (
    <div className="profile-list">
      {profiles.map((profile) => (
        <div className="profile-list-item" key={profile.id}>
          <ProfileCard
            profile={profile}
            onSummaryClick={onSummaryClick}
          />
        </div>
      ))}
    </div>
  );
};

export default ProfileList;
