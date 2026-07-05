import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import { EventsPage } from "./pages/EventsPage";
import EventDetails from "./pages/EventDetails";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import Register from "./pages/Register";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/events/:id" element={<EventDetails />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/register" element={<Register />} />
        </Routes>
    );
}

export default App;
