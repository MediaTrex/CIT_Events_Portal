import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import HomePage from "./pages/HomePage";
import Layout from "./Layouts/Layout";
import Signup from "./pages/Signup";
import EventHub from "./pages/EventHub";
import FallBack404 from "./pages/FallBack404";
import './index.css';
import ResetPassword from "./pages/ResetPassword";

function App() {
    return (
        <Routes>
            <Route
                path="/"
                element={
                    <Layout>
                        <HomePage />
                    </Layout>
                }
            />

            <Route
                path="/login"
                element={
                    <Layout>
                        <Login />
                    </Layout>
                }
            />

            <Route
                path="/signup"
                element={
                    <Layout>
                        <Signup />
                    </Layout>
                }
            />
            <Route
                path="/EventHub/:tab"
                element={
                    <Layout>
                        <EventHub />
                    </Layout>
                }
            />
            <Route
                path="/resetPassword"
                element={
                    <Layout>
                        <ResetPassword />
                    </Layout>
                }
            />
            <Route
                path="*"
                element={
                    <Layout>
                        <FallBack404 />
                    </Layout>
                }
            />
        </Routes>
    );
}

export default App;
