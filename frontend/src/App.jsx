import React from "react";
import {Route , Routes} from "react-router-dom";
import Home from "./pages/Home";
import CaptainSignup from "./pages/CaptainSignup";
import CaptainLogin from "./pages/CaptainLogin";
import UserLogin from "./pages/UserLogin";
import UserSignup from "./pages/UserSignup";


const App = () => {
    return (
        <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/login" element={<UserLogin/>} />
            <Route path="/signup" element={<UserSignup/>} />
            <Route path="/Captain-Login" element={<CaptainLogin/>} />
            <Route path="/Captain-Signup" element={<CaptainSignup/>} />
        </Routes>
    );
}
export default App;