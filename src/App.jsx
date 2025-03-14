import './App.css';
import ThemeProvider from './utilities/themeprovider';
import Navbar from './navbar';
import OnlineClasses from './Pages/onlineclass';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from './Pages/homepage';
import BecomeTuitor from './Pages/betuitor';
import CourseDetails from './Pages/coursedetail';
import ProfilePage from './Pages/profile';
import ScrollToTop from './services/scrolltotop';
import { Provider } from 'react-redux';
import store from './services/Redux/store';
import ADMIN from './admin/admin';
import TeacherManager from './admin/teachermanager';
import AddClass from './Pages/addclasses';
import TeacherDashboardWrapper from './services/ProtectedRoutes/routesmanagement';
import TeacherCommunityPage from './Pages/teacherscommunitypage';
import AdminRoute from './services/ProtectedRoutes/adminprotection';
import ConditionalChatbot from './chatbot/condition_bot';
import { webApi } from './api';
import { useEffect, useRef } from 'react';
import Chats from './widgets/classroom/chats';
import ClassChatRoom from './widgets/classroom/classroom';


function App() {
  const PING_URL = `${webApi}/api/ping`; // Replace with your Render URL
  const intervalRef = useRef(null);

  useEffect(() => {
    // Only create interval if it doesn't exist
    if (!intervalRef.current) {
      intervalRef.current = setInterval(async () => {
        try {
          const response = await fetch(PING_URL);
          if (response.ok) {
            console.log("Server is alive:", response.status);
          }
        } catch (error) {
          console.error("Ping failed:", error);
        }
      }, 300000); // Every 5 minutes
    }

    // Cleanup interval when component unmounts
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, []); // Run only once when the component mounts

  return (
    <Provider store={store}>
      <Router>
        <ThemeProvider>
          <Navbar />
          <ConditionalChatbot />
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/academicclasses" element={<OnlineClasses />} />
            <Route path="/coursesdetails/:id" element={<CourseDetails />} />
            <Route path="/tutorhome" element={<BecomeTuitor />} />
            <Route path="/teacherdashboard" element={<TeacherDashboardWrapper />} />
            <Route path="/addclasses" element={<AddClass />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/chat" element={<Chats />} />
            <Route path="/class/:classId/chat" element={<ClassChatRoom />} />
            <Route element={<AdminRoute />}>
              <Route path="/admin" element={<ADMIN />} />
              <Route path="/admin/teacher/" element={<TeacherManager />} />
            </Route>
            <Route path="/teacherscommunity" element={<TeacherCommunityPage />} />
          </Routes>
        </ThemeProvider>
      </Router>
    </Provider>
  );
}

export default App;
