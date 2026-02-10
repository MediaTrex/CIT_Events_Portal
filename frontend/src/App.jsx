import { Routes, Route } from "react-router-dom";

import Card from "./components/Card";
import CardDetails from "./pages/CardDetails";
import Login from "./pages/Login";

import cards from "./data";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <Routes>
      {/* Layout Route */}
      <Route path="/" element={<HomePage />}>
        {/* Home Page (Cards) */}
        <Route
          index
          element={
            <div className="flex flex-wrap justify-center gap-8 px-6 py-8">
              {cards.map((card) => (
                <Card key={card.id} card={card} />
              ))}
            </div>
          }
        />

        {/* Card Details */}
        <Route path="card/:id" element={<CardDetails />} />

        {/* Login */}
        <Route path="login" element={<Login />} />
      </Route>
    </Routes>
  );
}

export default App;
