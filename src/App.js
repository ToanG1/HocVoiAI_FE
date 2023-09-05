import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Course from "./pages/Course/Course";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="Home" element={<Home />} />
        <Route path="Course" element={<Course />} />
      </Routes>
    </BrowserRouter>
  );
}
