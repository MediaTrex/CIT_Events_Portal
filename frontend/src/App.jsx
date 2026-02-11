import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import HomePage from "./pages/HomePage";
import Layout from "./Layouts/Layout";
import Signup from "./pages/Signup";

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
            </Routes>
    );
}

export default App;
