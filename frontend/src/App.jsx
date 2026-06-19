import { Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout";

function App() {
    return (
        <Routes>
            <Route
                path="/"
                element={
                    <Layout>
                        <h1>Home </h1>
                    </Layout>
                }
            />
        </Routes>
    );
}

export default App;
