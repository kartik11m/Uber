import React,{use, useContext, useEffect, useState} from "react";
import {gsap} from "gsap";
import {useGSAP} from "@gsap/react"
import 'remixicon/fonts/remixicon.css'
import LocationSearchPanel from "../components/LocationSearchPanel";
import VehiclePanel from "../components/VehiclePanel";
import ConfirmRide from "../components/ConfirmRide";
import LookingForDriver from "../components/LookingForDriver";
import WaitingForDriver from "../components/WaitingforDriver";
import axios from "axios";
import { SocketContextData } from "../context/SocketContext";
import { UserContextData } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import LiveTracking from "../components/LiveTracking";
import {Link} from "react-router-dom"

const Home = () => {

    const [pickup, setPickup] = useState("");
    const [drop, setDrop] = useState("");
    const [panelOpen, setPanelOpen] = useState(false);
    const [activeField, setActiveField] = useState(null); // 'pickup' or 'drop'
    const [suggestions, setSuggestions] = useState([]);
    const [loadingSuggestions, setLoadingSuggestions] = useState(false);
    const panelRef = React.useRef(null);
    const panelCloseRef = React.useRef(null);
    const vehiclePanelRef = React.useRef(null);
    const confirmRideRef = React.useRef(null);
    const vehicleFoundRef = React.useRef(null);
    const WaitingforDriverRef = React.useRef(null);
    const [vehiclePanel, setVehiclePanel] = useState(false);
    const [confirmRide, setConfirmRide] = useState(false);
    const [vehicleFound, setVehicleFound] = useState(false);
    const [waitingForDriver, setWaitingForDriver] = useState(false);
    const [fare , setFare] = useState({});
    const [ride , setRide] = useState({});
    const [rideCaptain , setRideCaptain] = useState(null);

    const navigate = useNavigate();

    const {socket,sendMessage , receiveMessage} = useContext(SocketContextData);
    const {user} = useContext(UserContextData);

    useEffect(() => {
        // console.log(user);
        socket.emit("join" , {userType: "user" , userId: user._id});
    },[user,socket]);

    socket.on('ride-confirmed', ride =>{
        setRideCaptain(ride);
        setVehiclePanel(false);
        setWaitingForDriver(true);
    })

    socket.on('ride-started' , ride =>{
        setWaitingForDriver(false);
        navigate('/riding' , {state: {ride}});
    })

    const submitHandler = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log("Form submitted");
    };

    // Fetch suggestions from backend as user types
    React.useEffect(() => {
        let cancelTokenSource = axios.CancelToken.source();
        const fetchSuggestions = async (query) => {
            if (!query || query.length < 2) {
                setSuggestions([]);
                setLoadingSuggestions(false);
                return;
            }
            setLoadingSuggestions(true);
            try {
                const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`, {
                    params: { input: query },
                    cancelToken: cancelTokenSource.token,
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                });
                setSuggestions(res.data.predictions || res.data.suggestions || res.data || []);
            } catch (err) {
                if (!axios.isCancel(err)) {
                    setSuggestions([]);
                }
            } finally {
                setLoadingSuggestions(false);
            }
        };
        if (panelOpen && activeField) {
            fetchSuggestions(activeField === 'pickup' ? pickup : drop);
        } else {
            setSuggestions([]);
        }
        return () => cancelTokenSource.cancel();
    }, [pickup, drop, panelOpen, activeField]);

    useGSAP(function(){
        if(panelOpen){
            gsap.to(panelRef.current, {
            height:"70%",
            padding: 24,
            // opacity:1,
        })
        gsap.to(panelCloseRef.current, {
            opacity:1,
        })
        }else{
            gsap.to(panelRef.current, {
                height:"0%",
                padding:0,
                // opacity:0,
            })
            gsap.to(panelCloseRef.current, {
                opacity:0,
            })
        }
},[panelOpen])

          useGSAP(function(){
            if(vehiclePanel){
                gsap.to(vehiclePanelRef.current, {
                    transform:"translateY(0)",
                })
            }else{
                gsap.to(vehiclePanelRef.current, {
                    transform:"translateY(100%)",
                })
            }
          },[vehiclePanel])

          useGSAP(function(){
            if(confirmRide){
                gsap.to(confirmRideRef.current, {
                    transform:"translateY(0)",
                })
            }else{
                gsap.to(confirmRideRef.current, {
                    transform:"translateY(100%)",
                })
            }
          },[confirmRide])

          useGSAP(function(){
            if(vehicleFound){
                gsap.to(vehicleFoundRef.current, {
                    transform:"translateY(0)",
                })
            }else{
                gsap.to(vehicleFoundRef.current, {
                    transform:"translateY(100%)",
                })
            }
          },[vehicleFound])

          useGSAP(function(){
            if(waitingForDriver){
                gsap.to(WaitingforDriverRef.current, {
                    transform:"translateY(0)",
                })
            }else{
                gsap.to(WaitingforDriverRef.current, {
                    transform:"translateY(100%)",
                })
            }
          },[waitingForDriver])

          async function findTrip(){
            setVehiclePanel(true);
            setPanelOpen(false);

        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/get-fare`, {
                params: { pickup, destination: drop },
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        });
        setFare(response.data);
        console.log(response.data); // Should be a valid string
          }

       async function createRide(vehicleType){
          const response = await  axios.post(`${import.meta.env.VITE_BASE_URL}/rides/create`,{
                pickup,
                destination:drop,
                vehicleType
            }, {
                headers : {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })

            setRide(response.data);
            // console.log(response.data)
        }

    return(
        <div className=" h-screen relative overflow-hidden">
                <div className="fixed p-6 -top-3 flex items-center justify-between w-screen bg-gray-100">
                <img className="w-16" src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
                <Link to="/user/logout" className="h-10 w-10 bg-white flex items-center justify-center rounded-full">
                    <i className="ri-logout-box-r-line"></i>
                </Link>
                </div>
            <div className="h-screen mt-13">
                {/* temporary image */}
                {/* <img className="h-150 w-screen object-cover" src="https://cdn.theatlantic.com/thumbor/BlEOtTo9L9mjMLuyCcjG3xYr4qE=/0x48:1231x740/960x540/media/img/mt/2017/04/IMG_7105/original.png" alt="" /> */}
                <LiveTracking/>
            </div>
            <div className="flex flex-col justify-end absolute -top-2 w-full h-screen pointer-events-none">
                <div className="h-[30%] bg-white p-6 relative">
                    <h5 
                    ref={panelCloseRef}
                    onClick={() => setPanelOpen(false)}
                    className="absolute top-6 right-6 text-2xl opacity-0 pointer-events-auto">
                        <i className="ri-arrow-down-wide-line"></i>
                    </h5>
                    <h4 className="text-2xl font-semibold pointer-events-auto">Find a trip</h4>
                    <form onSubmit={(e) => {
                        submitHandler(e);
                }}>
                        <div className="line absolute h-16 w-1 top-[40%] left-8 bg-gray-900 rounded-full pointer-events-auto"></div>
                        <input 
                        onClick={() => { setPanelOpen(true); setActiveField('pickup'); }}
                        value={pickup}
                        onChange={(e) => { setPickup(e.target.value); setActiveField('pickup'); setPanelOpen(true); }}
                        className="bg-[#eee] px-12 py-2 text-base rounded-lg w-full mt-5 pointer-events-auto"
                        type="text"
                        placeholder="Add a pickup location"
                        autoComplete="off"
                        />
                        <input
                        onClick={() => { setPanelOpen(true); setActiveField('drop'); }}
                        value={drop}
                        onChange={(e) => { setDrop(e.target.value); setActiveField('drop'); setPanelOpen(true); }}
                        className="bg-[#eee] px-12 py-2 text-base rounded-lg w-full mt-3 pointer-events-auto"
                        type="text"
                        placeholder="Add a drop location"
                        autoComplete="off"
                        />
                    </form>
                    <button 
                    onClick={findTrip}
                    className="bg-black text-white px-4 py-2 rounded-lg mt-5 w-full pointer-events-auto">
                        Find Trip
                    </button>
                </div>
                <div ref={panelRef} className=" bg-white h-0 pointer-events-auto">
                    <LocationSearchPanel
                        suggestions={suggestions}
                        loading={loadingSuggestions}
                        setPanelOpen={setPanelOpen}
                        setVehiclePanel={setVehiclePanel}
                        onSuggestionClick={(suggestion) => {
                            const value = suggestion && suggestion.description ? suggestion.description : suggestion;
                            if (activeField === 'pickup') setPickup(value);
                            if (activeField === 'drop') setDrop(value);
                            setPanelOpen(false);
                        }}
                        activeField={activeField}
                    />
                </div>
            </div>
            <div ref={vehiclePanelRef} className="fixed w-full z-10 bottom-0 translate-y-full bg-white py-8 px-3">
                <VehiclePanel createRide={createRide} fare={fare} setConfirmRide={setConfirmRide} setVehiclePanel={setVehiclePanel}/>
            </div>
            <div ref={confirmRideRef} className="fixed w-full z-10 bottom-0 translate-y-full bg-white py-6 pt-8">
                <ConfirmRide setConfirmRide={setConfirmRide} setVehicleFound={setVehicleFound} ride={ride}/>
            </div>
            <div ref={vehicleFoundRef} className="fixed w-full z-9 bottom-0 translate-y-full bg-white py-6 pt-8">
            <LookingForDriver setVehicleFound={setVehicleFound} setVehiclePanel={setVehiclePanel} ride={ride}/>
            </div>
            <div ref={WaitingforDriverRef} className="fixed w-full z-10 bottom-0 translate-y-full bg-white py-6 pt-8">
                <WaitingForDriver setWaitingForDriver={setWaitingForDriver} setVehicleFound={setVehicleFound} rideCaptain={rideCaptain}/>
            </div>
        </div>
    );
};

export default Home;