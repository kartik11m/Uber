import React, {useContext } from "react";
import {Route , Routes} from "react-router-dom";
import Start from "./pages/Start";
import Home from "./pages/Home";
import CaptainSignup from "./pages/CaptainSignup";
import CaptainLogin from "./pages/CaptainLogin";
import UserLogin from "./pages/UserLogin";
import UserSignup from "./pages/UserSignup";
import {UserContextData} from "./context/UserContext";    
import UserProtectedWrapper from "./pages/UserProtectedWrapper";
import UserLogout from "./pages/UserLogout";


const App = () => {
    const ans = useContext(UserContextData);
    console.log(ans);
    return (
        <Routes>
            <Route path="/" element={<Start/>} />
            <Route path="/login" element={<UserLogin/>} />
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
        </Routes>
    );
}
export default App;