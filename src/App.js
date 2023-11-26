import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Course from "./pages/Course/Course";
import CourseDetails from "./pages/CourseDetails/CourseDetails";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import Roadmap from "./pages/Roadmap/Roadmap";
import Question from "./pages/Question/Question";
import QuestionDetail from "./pages/QuestionDetail/QuestionDetail";
import Features from "./pages/Features/Features";
import NotFound from "./pages/NotFound/NotFound";
import Profile from "./components/Profile/Profile";
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="/" element={<Home />} />
        <Route path="features" element={<Features />} />
        <Route path="course" element={<Course />} />
        <Route path="course/:courseId" element={<CourseDetails />} />
        <Route path="roadmap/:roadmapId" element={<Roadmap />} />
        <Route path="questions" element={<Question />} />
        <Route path="questions/:questionId" element={<QuestionDetail />} />
        <Route path="profile" element={<Profile />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
