import "react-toastify/dist/ReactToastify.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'primeicons/primeicons.css';
import "./assets/sass/main.scss";
import ReactDOM from 'react-dom/client'
import React from 'react'
import App from './App.jsx'
import { RecoilRoot } from "recoil";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RecoilRoot>
      <App />
    </RecoilRoot>
  </React.StrictMode>
);
