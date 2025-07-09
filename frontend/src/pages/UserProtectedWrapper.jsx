import React , {useContext} from "react";
import { UserContextData } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

const UserProtectedWrapper = ({ children }) => {
    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    console.log(token);

    // Check if user is logged in
    if (!token) {
        // return <div>Please log in to access this page.</div>;
        navigate("/login"); // Redirect to login page if not logged in
    }

    // Render the children components if user is logged in
    return <>{children}</>;
}

export default UserProtectedWrapper;