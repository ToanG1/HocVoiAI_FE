import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Course from "./pages/Course/Course";
import CourseDetails from "./pages/CourseDetails/CourseDetails";
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        
      </Routes>
    </BrowserRouter>
    /**<Route path="Course" element={<Course />} />
        <Route path="Course/:courseId" element={<CourseDetails />} /> */
  );
}
