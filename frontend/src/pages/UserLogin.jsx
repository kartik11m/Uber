import React , {useState} from "react";
import { Link } from "react-router-dom";

const UserLogin = () => {
    const [email ,setEmail] = React.useState("");
    const [password ,setPassword] = React.useState("");
    const [userData, setUserData] = React.useState({});

    const submitHandler = (e) => {
        // Handle login logic here
        e.preventDefault(); // Prevent default form submission
        setUserData({ 
            email:email, 
            password:password
         });
         console.log("User Data:", userData);
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
            <img className="w-16 mb-10" src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
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
            <p className="text-center">New here? <Link to="/signup" className="text-blue-600">Create new Account</Link></p>
          </div>
          <div>
            <Link to="/Captain-Login"  className="bg-[#10b461] flex items-center justify-center text-white font-semibold mb-5 rounded px-4 py-2 w-full text-lg placeholder:text-base">Sign in as Captain</Link>
          </div>
        </div>
    );
}

export default UserLogin;