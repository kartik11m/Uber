import React , {useState , useContext} from "react";
import { Link , useNavigate } from "react-router-dom";
import { CaptainContextData } from "../context/CaptainContext";
import axios from "axios";

const CaptainLogin = () => {
    const [email ,setEmail] = React.useState("");
    const [password ,setPassword] = React.useState("");
    const [captainData, setCaptainData] = React.useState({});

    const navigate = useNavigate();
    const {captain , setCaptain} = React.useContext(CaptainContextData);

    const submitHandler = async (e) => {
        // Handle login logic here
        e.preventDefault(); // Prevent default form submission
        const newCaptain = {
            email: email,
            password: password
        };

        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/login`, newCaptain);

        if(response.status === 200) {
            const data = response.data;
            setCaptain(data.captain);
            localStorage.setItem("token", data.token);
            // Redirect to home page after successful login
            navigate("/captain/home");
        }
        
        // setCaptainData({ 
        //     email:email, 
        //     password:password
        //  });
         console.log("Captain Data:", captainData);
        // For demonstration, we log the email and password
        console.log("Email:", email);
        console.log("Password:", password);
        setEmail("");
        setPassword("");
        // You can add your authentication logic here, like calling an API
    }


    return (
        <div className="p-7 h-screen flex flex-col justify-between">
          <div>
            <img className="w-20 mb-3" src="https://freelogopng.com/images/all_img/1659761425uber-driver-logo-png.png" alt="" />
            <form onSubmit={(e) =>{
                submitHandler(e);
            }}>
                <h3 className=" text-lg font-medium mb-2">What is your email</h3>
                <input className="bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base" 
                    required 
                    type="email"  
                    placeholder="email@example.com"
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)}
                />
                <h3 className=" text-lg font-medium mb-2">Enter password</h3>
                <input className="bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base" 
                required 
                type="password" 
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                />
                <button className="bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2 w-full text-lg placeholder:text-base">Login</button>
            </form>
            <p className="text-center">Join a fleet? <Link to="/Captain-Signup" className="text-blue-600">Register as a Captain</Link></p>
          </div>
          <div>
            <Link to="/login"  className="bg-[#d5622d] flex items-center justify-center text-white font-semibold mb-5 rounded px-4 py-2 w-full text-lg placeholder:text-base">Sign in as User</Link>
          </div>
        </div>
    );
}

export default CaptainLogin;