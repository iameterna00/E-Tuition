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
import StudyAbroad from './Pages/studyabroad';
import UniversityDetail from "./widgets/studyabroad/universitydetail.jsx";
import { generateToken } from './firebase_config.js';
import VacancyDetail from './widgets/teachercommunity/vacancydetailpage.jsx';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { v4 as uuidv4 } from 'uuid'; 
import UsersActivity from './admin/useractivity.jsx';
import ConditionalFooter from './services/conditionalfooter.jsx';
import PrivacyPolicy from './Pages/privacypolicy';
import UniversityList from './widgets/studyabroad/universitylists.jsx';



function App() {
  const PING_URL = `${webApi}/api/ping`;
  const intervalRef = useRef(null);
  const auth = getAuth();

  useEffect(() => {
    const generateGuestId = () => {
      let guestId = localStorage.getItem("guest_id");
      if (!guestId) {
        guestId = uuidv4();
        localStorage.setItem("guest_id", guestId);
      }
      return guestId;
    };

    const sendPingRequest = async (user) => {
      const isLoggedIn = !!user;
      const payload = isLoggedIn
        ? { user_id: user.uid }
        : { guest_id: generateGuestId() };

      try {
        const response = await fetch(PING_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        console.log("Ping response status:", response.status);
      } catch (err) {
        console.error("Ping error:", err);
      }
    };

    const handleAuthChange = (user) => {
      // For logged in users
      if (user) {
        generateToken();
      }
      
      // Clear any existing interval
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      
      // Send immediate ping
      sendPingRequest(user);
      
      // Set up new interval
      intervalRef.current = setInterval(() => sendPingRequest(user), 60000);
    };

    const unsubscribe = onAuthStateChanged(auth, handleAuthChange);

    // Cleanup function
    return () => {
      unsubscribe();
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []); // Empty dependency array means this runs once on mount

  

  return (
    <Provider store={store}>
      <Router>
        <div className="page-wrapper">
        <ThemeProvider>
          <Navbar />
          <ConditionalChatbot />
          <ScrollToTop />
        <main className='mainapp-content'>
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/universities/:countryParam" element={<UniversityList />} />
            <Route path="/university/:id" element={<UniversityDetail />} />
            <Route path="/academicclasses" element={<OnlineClasses />} />
            <Route path="/coursesdetails/:id" element={<CourseDetails />} />
            <Route path="/tutorhome" element={<BecomeTuitor />} />
            <Route path="/teacherdashboard" element={<TeacherDashboardWrapper />} />
            <Route path="/addclasses" element={<AddClass />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/chat" element={<Chats />} />
            <Route path="/studyabroad" element={<StudyAbroad />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/vacancy/:vacancyId/ref/:referralCode" element={<VacancyDetail />} />
            <Route path="/vacancy/:vacancyId" element={<VacancyDetail />} />
            <Route path="/class/:classId/chat" element={<ClassChatRoom />} />
            <Route element={<AdminRoute />}>
              <Route path="/admin" element={<ADMIN />} />
              <Route path="/admin/teacher/" element={<TeacherManager />} />
              <Route path="/admin/useractivity" element={<UsersActivity />} />
            </Route>
            <Route path="/teacherscommunity" element={<TeacherCommunityPage />} />
          </Routes>
        </main>
          <ConditionalFooter/>
        </ThemeProvider>
     
        </div>
      </Router>
    </Provider>
  );
}

export default App;
