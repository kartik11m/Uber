import React, {useState , useContext} from "react";
import { Link , useNavigate } from "react-router-dom";
import axios from "axios";
import  {UserContextData}  from "../context/UserContext";

const UserSignup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [userData, setUserData] = useState({});

    const navigate = useNavigate();

    const {user, setUser} = React.useContext(UserContextData);

    const submitHandler = async (e) => {
        e.preventDefault(); // Prevent default form submission
        const newUser = {
            fullname: {
                firstname: firstName,
                lastname: lastName,
            },
            email: email,
            password: password,
        };

        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`, newUser);

        if(response.status === 201) {
            const data = response.data;

            setUser(data.user);
            localStorage.setItem("token", data.token);
            // Redirect to home page after successful signup
            navigate("/home");
        }
        // setUserData({ 
        //     fullName:{
        //         firstName: firstName,   
        //         lastName: lastName,
        //     },
        //     email: email,
        //     password: password,
        // });
        // console.log("User Data:", userData);
        setEmail("");
        setPassword("");
        setFirstName("");
        setLastName("");
        setPassword("");
    };
    return (
        <div className="p-7 h-screen flex flex-col justify-between">
          <div>
            <img className="w-16 mb-10" src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
            <form onSubmit={(e) => {
                submitHandler(e);}
                }>
                <h3 className=" text-lg font-medium mb-2">What is your name</h3>
                <div className="flex gap-4 mb-5">
                    <input className="bg-[#eeeeee] w-1/2  rounded px-4 py-2  text-lg placeholder:text-sm" 
                    required 
                    type="text"  
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                />
                <input className="bg-[#eeeeee] w-1/2  rounded px-4 py-2  text-lg placeholder:text-sm" 
                    required 
                    type="text"  
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                />
                </div>
                <h3 className=" text-lg font-medium mb-2">What is your email</h3>
                <input className="bg-[#eeeeee] mb-7 rounded px-4 py-2  w-full text-lg placeholder:text-base" 
                    required 
                    type="email"  
                    placeholder="email@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <h3 className=" text-lg font-medium mb-2">Enter password</h3>
                <input className="bg-[#eeeeee] mb-7 rounded px-4 py-2  w-full text-lg placeholder:text-base" 
                required 
                type="password" 
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                />
                <button className="bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2 w-full text-lg placeholder:text-base">Create Account</button>
            </form>
            <p className="text-center">Already have an account? <Link to="/login" className="text-blue-600">Login here</Link></p>
          </div>
          <div>
            <p className="text-[13px] leading-tight text-center">By proceeding, you consent to get calls , Whatsapp or SMS messages</p>
          </div>
        </div>
    );
}

export default UserSignup;