import React , {useContext , useEffect , useState} from "react";
import { UserContextData } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const UserProtectedWrapper = ({ children }) => {
    const token = localStorage.getItem("token");
    const navigate = useNavigate();
    const {user, setUser} = useContext(UserContextData);
    const [isLoading, setIsLoading] = useState(true); // State to manage

    console.log(token);

    // Check if user is logged in
    // if (!token) {
    //     // return <div>Please log in to access this page.</div>;
    //     navigate("/login"); // Redirect to login page if not logged in
    // }
    useEffect(() => {
        if (!token) {
            navigate("/login"); // Redirect to login page if not logged in
            return; // Exit the effect if no token is found
        }

        axios.get(`${import.meta.env.VITE_BASE_URL}/users/profile`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    .then(response => {
        if (response.status === 200) {
            setUser(response.data); // Set the user data in context
            setIsLoading(false); // Set loading to false after fetching data // Set the user data in context
        }
    })
    .catch(error => {
        console.error("Error fetching user profile:", error);
        localStorage.removeItem("token"); // Remove token if there's an error
        setIsLoading(false); // Set loading to false even if there's an error
        navigate("/login"); // Redirect to login page if there's an error
    });

    }, [token, navigate]);

    // Render the children components if user is logged in

    if (isLoading) {
        return <div>Loading...</div>; // Show a loading state while checking authentication
    }

    return <>{children}</>;
}

export default UserProtectedWrapper;