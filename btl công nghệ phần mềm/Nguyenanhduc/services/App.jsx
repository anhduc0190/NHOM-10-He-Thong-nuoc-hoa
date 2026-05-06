import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useState, useEffect } from "react";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Products from "./pages/Products";
import AdminPanel from "./components/AdminPanel";
import { getCurrentUser } from "./utils/auth";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const currentUser = getCurrentUser();
    setUser(currentUser);
  }, []);

  const requireAuth = (Component) => {
    return user ? Component : <Navigate to="/login" />;
  };

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <Toaster />
        <Routes>
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/" element={requireAuth(<Dashboard />)} />
          <Route path="/products" element={requireAuth(<Products />)} />
          <Route path="/admin" element={requireAuth(<AdminPanel />)} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;