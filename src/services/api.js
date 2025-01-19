// src/services/api.js
let profiles = [
    {
      id: 1,
      name: "John Doe",
      description: "Software Engineer",
      location: { lat: 37.7749, lng: -122.4194 },
    },
    {
      id: 2,
      name: "Jane Smith",
      description: "Graphic Designer",
      location: { lat: 34.0522, lng: -118.2437 },
    },
  ];
  
  // Fetch profiles
  export const getProfiles = async () => profiles;
  
  // Add a new profile
  export const addProfile = async (newProfile) => {
    const id = profiles.length > 0 ? profiles[profiles.length - 1].id + 1 : 1;
    profiles.push({ ...newProfile, id });
    return profiles;
  };
  
  // Update an existing profile
  export const updateProfile = async (updatedProfile) => {
    profiles = profiles.map((profile) =>
      profile.id === updatedProfile.id ? updatedProfile : profile
    );
    return profiles;
  };
  
  // Delete a profile
  export const deleteProfile = async (id) => {
    profiles = profiles.filter((profile) => profile.id !== id);
    return profiles;
  };
  