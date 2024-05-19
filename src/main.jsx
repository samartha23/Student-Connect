import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "react-loading-skeleton/dist/skeleton.css";
import { Toaster } from "react-hot-toast";

import { store } from "./store.js";
import { Provider } from "react-redux";

import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import Root from "./pages/Root.jsx";
import Home from "./pages/home/Home.jsx";
import About from "./pages/about/About.jsx";
import Contact from "./pages/contact/Contact.jsx";
import Signup from "./pages/auth/signup/Signup.jsx";
import Login from "./pages/auth/login/Login.jsx";
import Profile from "./pages/profile/Profile.jsx";
import KanbanHome from "./pages/kanban/home/KanbanHome.jsx";
import KanbanBoard from "./pages/kanban/board/KanbanBoard.jsx";
import OpenContributions from "./pages/open_contributions/OpenContributions.jsx";
import AuthorizeCode from "./pages/auth/AuthorizeCode.jsx";
import Blogs from "./pages/blogs/Blogs.jsx";
import Blog from "./pages/blogs/blog/Blog.jsx";
import _404 from "./pages/error/_404.jsx";
import ProfileById from "./pages/profile/ProfileById.jsx";
import GenerateQuiz from "./pages/automatic_quiz/GenerateQuiz.jsx";
import AutomaticQuiz from "./pages/automatic_quiz/AutomaticQuiz.jsx";
import AutomaticOpenEnded from "./pages/automatic_quiz/AutomaticOpenEnded.jsx";
import Settings from "./pages/dashboard/settings/Settings.jsx";
import DashboardBlogs from "./pages/dashboard/blogs/DashboardBlogs.jsx";
import DashboardProjects from "./pages/dashboard/projects/DashboardProjects.jsx";
import AddBlog from "./pages/write_blog/AddBlog.jsx";
import KanbanSettings from "./pages/kanban/settings/KanbanSettings.jsx";
import KanbanNotifications from "./pages/kanban/notifications/KanbanNotifications.jsx";
import Dashboard from "./pages/educator/dashboard/Dashboard";
import Courses from "./pages/educator/courses/Courses";
import Assessments from "./pages/educator/assessments/Assessments";
import CourseModules from "./pages/educator/courses/CourseModules";
import CreateQuizAssessment from "./pages/educator/assessments/CreateQuizAssessment";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route path="" element={<Home />} />
      <Route path="about" element={<About />} />
      <Route path="contact" element={<Contact />} />

      {/* Login Signup */}
      <Route path="signup" element={<Signup />} />
      <Route path="login" element={<Login />} />

      <Route path="authorize/" element={<AuthorizeCode />}>
        <Route path=":provider" element={<AuthorizeCode />} />
      </Route>

      {/* Profile */}
      <Route path="profile" element={<Profile />} />
      <Route path="profile/:id" element={<ProfileById />} />

      {/* Blog */}
      <Route path="write-blog" element={<AddBlog />} />
      <Route path="blogs/" element={<Blogs />} />
      <Route path="blogs/:id" element={<Blog />} />

      {/* Kanban */}
      <Route path="kanban" element={<KanbanHome />} />
      <Route path="kanban/:id" element={<KanbanBoard />} />
      <Route path="kanban/:id/board" element={<KanbanBoard />} />
      <Route path="kanban/:id/settings" element={<KanbanSettings />} />
      <Route
        path="kanban/:id/notifications"
        element={<KanbanNotifications />}
      />

      {/* Open Contributions */}
      <Route path="open-contributions" element={<OpenContributions />} />

      {/* Automatic Quiz */}
      <Route path="automatic-quiz" element={<GenerateQuiz />} />
      <Route path="automatic-quiz/mcq/:id" element={<AutomaticQuiz />} />
      <Route
        path="automatic-quiz/open-ended/:id"
        element={<AutomaticOpenEnded />}
      />

      {/* User Dashboard (Settings, Blogs, Projects)*/}
      <Route path="dashboard" element={<Settings />} />
      <Route path="dashboard/settings" element={<Settings />} />
      <Route path="dashboard/projects" element={<DashboardProjects />} />
      <Route path="dashboard/blogs" element={<DashboardBlogs />} />

      {/* Educator (Dashboard, Courses, Assessment)  */}
      <Route path="educator" element={<Dashboard />} />
      <Route path="educator/courses" element={<Courses />} />
      <Route path="educator/courses/:id/module" element={<CourseModules />} />
      <Route path="educator/assessments" element={<Assessments />} />
      <Route
        path="educator/assessments/:id/quiz"
        element={<CreateQuizAssessment />}
      />

      {/* Error */}
      <Route path="*" element={<_404 />} />
    </Route>,
  ),
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <Toaster
      position="top-center"
      reverseOrder={false}
      toastOptions={{
        duration: 5000,
        success: {
          duration: 3000,
          style: {
            background: "#0bb42a",
            color: "#fff",
          },
        },
        error: {
          duration: 3000,
          style: {
            background: "#d82a0b",
            color: "#fff",
          },
        },
      }}
    />
    <RouterProvider router={router} />
  </Provider>,
);
