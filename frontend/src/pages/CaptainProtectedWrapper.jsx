import React , {useContext , useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import { CaptainContextData } from "../context/CaptainContext";
import axios from "axios";

const CaptainProtectedWrapper = ({ children }) => {
    const token = localStorage.getItem("token");
    const navigate = useNavigate();
    const {captain, setCaptain} = useContext(CaptainContextData);
    const [isLoading, setIsLoading] = useState(true); // State to manage loading status

    console.log(token);

    // Check if user is logged in
    // if (!token) {
    //     // return <div>Please log in to access this page.</div>;
    //     navigate("/login"); // Redirect to login page if not logged in
    // }
    useEffect(() => {
        if (!token) {
            navigate("/Captain-Login"); // Redirect to login page if not logged in
        }
    }, [token, navigate]);

    axios.get(`${import.meta.env.VITE_BASE_URL}/captains/profile`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    .then(response => {
        if (response.status === 200) {
            setCaptain(response.data.captain); // Set the captain data in context
            setIsLoading(false); // Set loading to false after fetching data
        }
    })
    .catch(error => {
        console.error("Error fetching captain profile:", error);
        localStorage.removeItem("token"); // Remove token if there's an error
        setIsLoading(false); // Set loading to false even if there's an error
        navigate("/Captain-Login"); // Redirect to login page if there's an error
    });


    if (isLoading) {
        return <div>Loading...</div>; // Show a loading state while checking authentication
    }



    // Render the children components if user is logged in
    return <>{children}</>;
}

export default CaptainProtectedWrapper;