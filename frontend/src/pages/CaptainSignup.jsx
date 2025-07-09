import React , {useState} from "react";
import { Link , useNavigate } from "react-router-dom";

const CaptainSignup = () => {
        const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [userData, setUserData] = useState({});

    const navigate = useNavigate();

    const submitHandler = (e) => {
        e.preventDefault(); // Prevent default form submission
        setUserData({ 
            fullname:{
                firstname: firstName,   
                lastname: lastName,
            },
            email: email,
            password: password,
        });
        console.log("User Data:", userData);
        setEmail("");
        setPassword("");
        setFirstName("");
        setLastName("");
        setPassword("");
    };
    return (
        <div className="py-5 px-5 h-screen flex flex-col justify-between">
          <div>
            <img className="w-20 mb-3" src="https://freelogopng.com/images/all_img/1659761425uber-driver-logo-png.png" alt="" />
            <form onSubmit={(e) => {
                submitHandler(e);}
                }>
                <h3 className=" text-lg font-medium mb-2">What is your name</h3>
                <div className="flex gap-4 mb-5">
                    <input className="bg-[#eeeeee] w-full  rounded px-4 py-2  text-lg placeholder:text-sm" 
                    required 
                    type="text"  
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                />
                <input className="bg-[#eeeeee] w-full  rounded px-4 py-2  text-lg placeholder:text-sm" 
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
                <button className="bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2 w-full text-lg placeholder:text-base">Login</button>
            </form>
            <p className="text-center">Already have an account? <Link to="/Captain-Login" className="text-blue-600">Log in</Link></p>
          </div>
          <div>
            <p className="text-[13px] leading-tight text-center">This site is protected by reCaptcha and the <span className="underline">Google Privacy Policy </span> and <span className="underline">Terms of Service apply</span></p>
          </div>
        </div>
    );
}

export default CaptainSignup;