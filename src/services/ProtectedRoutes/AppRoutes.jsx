import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "../../Pages/homepage";
import TeacherDashboard from "../../Pages/tuitordashboard";
import ProtectedRoute from "./ProtectedRoutes";
import { useSelector } from "react-redux";
import { selectUser } from "../../services/Redux/userSlice";
import OnlineClasses from "../../Pages/onlineclass";
import BecomeTuitor from "../../Pages/betuitor";
import ApplyForTuitor from "../../Pages/applyfortuitot";
import CourseDetails from "../../Pages/coursedetail";
import UserList from "../../Pages/dashboard";
import ProfilePage from "../../Pages/profile";

const AppRoutes = () => {
    const user = useSelector(selectUser);

    return (
        <Routes>
            <Route path="/" element={user?.purpose === "teacher" ? <Navigate to="/teacher/dashboard" replace /> : <HomePage />} />
            <Route path="/onlineclasses" element={<OnlineClasses />} />
            <Route path="/coursesdetails/:id" element={<CourseDetails />} />
            <Route path="/iamatuitor" element={<BecomeTuitor />} />
            <Route path="/tuitorform" element={<ApplyForTuitor />} />
            <Route path="/dashboard" element={<UserList />} />
            <Route path="/profile" element={<ProfilePage />} />


            <Route element={<ProtectedRoute role="teacher" redirectPath="/" />}>
                <Route path="/teacher/dashboard" element={<TeacherDashboard />} />
            </Route>

            {/* Fallback: Redirect unknown routes to home */}
            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    );
};

export default AppRoutes;
