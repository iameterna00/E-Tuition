import './App.css';
import ThemeProvider from './utilities/themeprovider';
import Navbar from './navbar';
import OnlineClasses from './Pages/onlineclass';
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import HomePage from './Pages/homepage';
import BecomeTuitor from './Pages/betuitor';
import CourseDetails from './Pages/coursedetail';
import ProfilePage from './Pages/profile';
import ScrollToTop from './services/scrolltotop';
import { Provider, useDispatch, useSelector } from 'react-redux'; // Import useDispatch and useSelector
import store from './services/Redux/store';
import ADMIN from './admin/admin';
import TeacherManager from './admin/teachermanager';;
import AddClass from './Pages/addclasses';
import TeacherDashboardWrapper from './services/ProtectedRoutes/routesmanagement';
import TeacherCommunityPage from './Pages/teacherscommunitypage';
import TeachersCommunity from './services/ProtectedRoutes/protectioncommunity';
import AdminRoute from './services/ProtectedRoutes/adminprotection';
import ConditionalChatbot from './chatbot/condition_bot';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <ThemeProvider>
          <Navbar />
          <ConditionalChatbot/>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/onlineclasses" element={<OnlineClasses />} />
            <Route path="/coursesdetails/:id" element={<CourseDetails />} />
            <Route path="/tutorhome" element={<BecomeTuitor />} />
           
            
            <Route path="/teacherdashboard" element={<TeacherDashboardWrapper />} />
            <Route path="/addclasses" element={<AddClass />} />
            <Route path="/profile" element={<ProfilePage />} />
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
