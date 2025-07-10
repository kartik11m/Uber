import React , {useState , useContext} from "react";
import axios from "axios";
import { Link , useNavigate } from "react-router-dom";
import { CaptainContextData } from "../context/CaptainContext";

const CaptainSignup = () => {
        const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [vehicleColor, setVehicleColor] = useState("");
    const [vehiclePlate, setVehiclePlate] = useState("");
    const [vehicleCapacity, setVehicleCapacity] = useState(0);
    const [vehicleType, setVehicleType] = useState("");
    const [userData, setUserData] = useState({});

    const navigate = useNavigate();
    const {captain , setCaptain} = React.useContext(CaptainContextData);

    const submitHandler = async (e) => {
        e.preventDefault(); // Prevent default form submission
        const newCaptain = {
            fullname: {
                firstname: firstName,
                lastname: lastName,
            },
            email: email,
            password: password,
            vehicle: {
                color: vehicleColor,
                plate: vehiclePlate,
                capacity: vehicleCapacity,
                vehicleType: vehicleType
            }
        };
        const response = await  axios.post(`${import.meta.env.VITE_BASE_URL}/captains/register`, newCaptain);
        if(response.status === 201) {
            const data = response.data;
            setCaptain(data.captain);
            localStorage.setItem("token", data.token);
            // Redirect to home page after successful signup
            navigate("/captain/home");
        }
        // setUserData({ 
        //     fullname:{
        //         firstname: firstName,   
        //         lastname: lastName,
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
        setVehicleColor("");
        setVehiclePlate("");
        setVehicleCapacity(0);
        setVehicleType("");
        // You can add your authentication logic here, like calling an API
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

                <h3 className=" text-lg font-medium mb-2">Vehicle details</h3>
                <div className="flex gap-4 mb-5">
                    <input className="bg-[#eeeeee] w-1/2  rounded px-4 py-2  text-lg placeholder:text-sm" 
                    required 
                    type="text"  
                    placeholder="Vehicle Color"
                    value={vehicleColor}
                    onChange={(e) => setVehicleColor(e.target.value)}
                />
                <input className="bg-[#eeeeee] w-1/2  rounded px-4 py-2  text-lg placeholder:text-sm" 
                    required 
                    type="text"  
                    placeholder="Vehicle Plate"
                    value={vehiclePlate}
                    onChange={(e) => setVehiclePlate(e.target.value)}
                />
                </div>
                <div className="flex gap-4 mb-5">
                    <input className="bg-[#eeeeee] w-1/2  rounded px-4 py-2  text-lg placeholder:text-sm" 
                    required 
                    type="number"  
                    placeholder="Vehicle Capacity"
                    value={vehicleCapacity}
                    onChange={(e) => setVehicleCapacity(e.target.value)}
                />
                <select className="bg-[#eeeeee] w-1/2  rounded px-4 py-2  text-lg placeholder:text-sm" 
                    required 
                    type="text"  
                    placeholder="Vehicle Type"
                    value={vehicleType}
                    onChange={(e) => setVehicleType(e.target.value)}
                >
                    <option value="" disabled>Select Vehicle Type</option>
                    <option value="car">car</option>
                    <option value="bike">bike</option>
                    <option value="auto">auto</option>
                </select>
                </div>
                <button className="bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2 w-full text-lg placeholder:text-base">Create Account</button>
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