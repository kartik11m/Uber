import React, {useContext } from "react";
import {Route , Routes} from "react-router-dom";
import Start from "./pages/Start";
import Home from "./pages/Home";
import CaptainSignup from "./pages/CaptainSignup";
import CaptainLogin from "./pages/CaptainLogin";
import UserLogin from "./pages/UserLogin";
import UserSignup from "./pages/UserSignup";
import {UserContextData} from "./context/UserContext";  
import {CaptainContextData} from "./context/CaptainContext";  
import UserProtectedWrapper from "./pages/UserProtectedWrapper";
import UserLogout from "./pages/UserLogout";
import CaptainHome from "./pages/CaptainHome";
import CaptainProtectedWrapper from "./pages/CaptainProtectedWrapper";
import CaptainLogout from "./pages/CaptainLogout";
import Riding from "./pages/Riding";
import CaptainRiding from "./pages/CaptainRiding"
import "remixicon/fonts/remixicon.css";


const App = () => {
    const ans = useContext(UserContextData);
    console.log(ans);
    const captainAns = useContext(CaptainContextData);
    console.log(captainAns);
    return (
        <Routes>
            <Route path="/" element={<Start/>} />
            <Route path="/login" element={<UserLogin/>} />
            <Route path="/riding" element={<Riding/>} />
            <Route path="/signup" element={<UserSignup/>} />
            <Route path="/Captain-Login" element={<CaptainLogin/>} />
            <Route path="/Captain-Signup" element={<CaptainSignup/>} />
            <Route path="/home" element={
                <UserProtectedWrapper>
                    <Home />
                </UserProtectedWrapper>
            }></Route>
            <Route path="/user/logout" element = {
                <UserLogout></UserLogout>
                }></Route>
            <Route path="/captain/home" element={
                <CaptainProtectedWrapper>
                    <CaptainHome />
                </CaptainProtectedWrapper>
            }></Route>
            <Route path="/captain/logout" element = {
                <CaptainLogout/>
            }></Route>
            <Route path="/captain-riding" element={<CaptainRiding/>}></Route>
        </Routes>
    );
}
export default App;