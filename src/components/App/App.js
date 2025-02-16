import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "components/features/Auth/Login";
import Signup from "components/features/Auth/Signup";
import ForgotPassword from "components/features/Auth/ForgotPassword";
import Feed from "components/features/Feed/Feed";
import Profile from "components/features/Profile/Profile";

function App() {
  return (
  
      <Routes>
        <Route path="/" element={<Feed />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    
  );
}

export default App;
