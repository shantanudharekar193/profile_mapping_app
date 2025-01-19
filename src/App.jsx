import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ProfileDetails from "./pages/ProfileDetails";
import AdminPanel from "./components/AdminPanel";
import HomePage from "./pages/Home";
import MapView from "./components/MapComponent";

import './styles/app.css';

function App() {
  // Simulating profiles data for testing purposes
  const profiles = [
    { id: 1, name: "John Doe", description: "Software Engineer", location: "New York" },
    { id: 2, name: "Jane Smith", description: "Designer", location: "Los Angeles" }
  ];

  return (
    <Router>
      <div>
        {/* Navigation Bar */}
        <nav style={{ padding: "10px", backgroundColor: "#333", color: "#fff" }}>
          <Link to="/" style={{ margin: "10px", color: "white", textDecoration: "none" }}>
            Home
          </Link>
          <Link to="/admin" style={{ margin: "10px", color: "white", textDecoration: "none" }}>
            Admin Panel
          </Link>
        </nav>

        {/* Application Routes */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/map" element={<MapView />} />
          <Route path="/profile/:id" element={<ProfileDetails profiles={profiles} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
