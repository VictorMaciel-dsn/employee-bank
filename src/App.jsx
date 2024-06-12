import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useEffect } from "react";
import WOW from "wow.js";
import LoginPage from "./components/login";
import HomePage from "./components/home";
import { app } from "./services";

function App() {
  useEffect(() => {
    const wow = new WOW();
    wow.init();
    app;
  }, []);

  return (
    <div className="main">
      <ToastContainer />
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/home" element={<HomePage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
