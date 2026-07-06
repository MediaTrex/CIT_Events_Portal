import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import { EventsPage } from "./pages/EventsPage";
import EventDetails from "./pages/EventDetails";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import DashboardLayout from "./layout/DashboardLayout.jsx";
import StudentDashboard from "./pages/student/StudentDashboard";
import StudentMyEvents from "./pages/student/StudentMyEvents";
import StudentMyTeams from "./pages/student/StudentMyTeams";
import StudentCertificates from "./pages/student/StudentCertificates";
import StudentProfile from "./pages/student/StudentProfile";
import StudentResults from "./pages/student/StudentResults";
import OrganizerDashboard from "./pages/organizer/OrganizerDashboard";
import OrganizerProfile from "./pages/organizer/OrganizerProfile";
import OrganizerManageEvents from "./pages/organizer/OrganizerManageEvents";
import OrganizerCreateEvent from "./pages/organizer/OrganizerCreateEvent";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminEvents from "./pages/admin/AdminEvents";
import AdminSettings from "./pages/admin/AdminSettings";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/events/:id" element={<EventDetails />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/register" element={<Register />} />

            <Route
                path="/student"
                element={
                    <ProtectedRoute allowedRoles={["student"]}>
                        <DashboardLayout role="student" />
                    </ProtectedRoute>
                }
            >
                <Route index element={<Navigate to="dashboard" replace />} />
                <Route path="dashboard" element={<StudentDashboard />} />
                <Route path="my-events" element={<StudentMyEvents />} />
                <Route path="my-teams" element={<StudentMyTeams />} />
                <Route path="certificates" element={<StudentCertificates />} />
                <Route path="profile" element={<StudentProfile />} />
                <Route path="result" element={<StudentResults />} />
            </Route>

            <Route
                path="/organizer"
                element={
                    <ProtectedRoute allowedRoles={["organizer"]}>
                        <DashboardLayout role="organizer" />
                    </ProtectedRoute>
                }
            >
                <Route index element={<Navigate to="dashboard" replace />} />
                <Route path="dashboard" element={<OrganizerDashboard />} />
                <Route
                    path="manage-events"
                    element={<OrganizerManageEvents />}
                />
                <Route path="create-event" element={<OrganizerCreateEvent />} />
                <Route path="profile" element={<OrganizerProfile />} />
            </Route>

            <Route
                path="/admin"
                element={
                    <ProtectedRoute allowedRoles={["admin"]}>
                        <DashboardLayout role="admin" />
                    </ProtectedRoute>
                }
            >
                <Route index element={<Navigate to="dashboard" replace />} />
                <Route path="dashboard" element={<AdminDashboard />} />
                <Route path="users" element={<AdminUsers />} />
                <Route path="events" element={<AdminEvents />} />
                <Route path="settings" element={<AdminSettings />} />
            </Route>
        </Routes>
    );
}

export default App;
