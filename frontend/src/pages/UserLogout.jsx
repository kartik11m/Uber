import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UserLogout = () => {

    const token = localStorage.getItem("token");
    const navigate = useNavigate();
    axios.get(`${import.meta.env.VITE_BASE_URL}/users/logout`, {
        headers: {
            Authorization: `Bearer ${token}`// Include the token in the request header
        }
    })
        .then((response) => {
            if (response.status === 200) {
                localStorage.removeItem("token"); // Remove token from local storage
                // Optionally, you can also clear user data from context or state
                navigate("/login"); // Redirect to login page after logout
                console.log("Logout successful");
            } else {
                console.error("Logout failed");
            }
        }).catch((error) => {
            console.error("Error during logout:", error);
        });

    return (
        <div>
            <h2>You have been logged out successfully.</h2>
        </div>
    );
}

export default UserLogout;