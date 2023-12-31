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
import ResetPassword from "./pages/ResetPassword/ResetPassword";
import Activate from "./pages/Activate/Activate";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import Search from "./pages/Search/Search";
import SuggestedDocument from "./pages/SuggestedDocument/SuggestedDocument";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="reset-pwd/:token" element={<ResetPassword />} />
        <Route path="forgot-pwd" element={<ForgotPassword />} />
        <Route path="/" element={<Home />} />
        <Route path="features" element={<Features />} />
        <Route path="course" element={<Course />} />
        <Route path="course/:courseId" element={<CourseDetails />} />
        <Route path="roadmap/:roadmapId" element={<Roadmap />} />
        <Route
          path="roadmap/:roadmapId/suggested-document/:milestoneId"
          element={<SuggestedDocument />}
        />
        <Route path="questions" element={<Question />} />
        <Route path="questions/:questionId" element={<QuestionDetail />} />
        <Route path="profile/:userId" element={<Profile />} />
        <Route path="activate" element={<Activate />} />
        <Route path="search" element={<Search />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
