import React,{use, useState} from "react";
import {gsap} from "gsap";
import {useGSAP} from "@gsap/react"
import 'remixicon/fonts/remixicon.css'
import LocationSearchPanel from "../components/LocationSearchPanel";
import VehiclePanel from "../components/VehiclePanel";
import ConfirmRide from "../components/ConfirmRide";
import LookingForDriver from "../components/LookingForDriver";
import WaitingForDriver from "../components/WaitingforDriver";
import axios from "axios";

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

          function findTrip(){
            setVehiclePanel(true);
            setPanelOpen(false);
          }

    return(
        <div className="relative h-screen overflow-hidden">
            <img className="w-16 absolute left-5 top-5" src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
            <div>
                {/* temporary image */}
                <img className="h-150 w-screen object-cover" src="https://cdn.theatlantic.com/thumbor/BlEOtTo9L9mjMLuyCcjG3xYr4qE=/0x48:1231x740/960x540/media/img/mt/2017/04/IMG_7105/original.png" alt="" />
            </div>
            <div className="flex flex-col justify-end absolute top-0 w-full h-screen">
                <div className="h-[30%] bg-white p-6 relative">
                    <h5 
                    ref={panelCloseRef}
                    onClick={() => setPanelOpen(false)}
                    className="absolute top-6 right-6 text-2xl opacity-0">
                        <i className="ri-arrow-down-wide-line"></i>
                    </h5>
                    <h4 className="text-2xl font-semibold">Find a trip</h4>
                    <form onSubmit={(e) => {
                        submitHandler(e);
                }}>
                        <div className="line absolute h-16 w-1 top-[40%] left-8 bg-gray-900 rounded-full"></div>
                        <input 
                        onClick={() => { setPanelOpen(true); setActiveField('pickup'); }}
                        value={pickup}
                        onChange={(e) => { setPickup(e.target.value); setActiveField('pickup'); setPanelOpen(true); }}
                        className="bg-[#eee] px-12 py-2 text-base rounded-lg w-full mt-5"
                        type="text"
                        placeholder="Add a pickup location"
                        autoComplete="off"
                        />
                        <input
                        onClick={() => { setPanelOpen(true); setActiveField('drop'); }}
                        value={drop}
                        onChange={(e) => { setDrop(e.target.value); setActiveField('drop'); setPanelOpen(true); }}
                        className="bg-[#eee] px-12 py-2 text-base rounded-lg w-full mt-3"
                        type="text"
                        placeholder="Add a drop location"
                        autoComplete="off"
                        />
                    </form>
                    <button 
                    onClick={findTrip}
                    className="bg-black text-white px-4 py-2 rounded-lg mt-5 w-full">
                        Find Trip
                    </button>
                </div>
                <div ref={panelRef} className=" bg-white h-0">
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
                <VehiclePanel setConfirmRide={setConfirmRide} setVehiclePanel={setVehiclePanel}/>
            </div>
            <div ref={confirmRideRef} className="fixed w-full z-10 bottom-0 translate-y-full bg-white py-6 pt-8">
                <ConfirmRide setConfirmRide={setConfirmRide} setVehicleFound={setVehicleFound}/>
            </div>
            <div ref={vehicleFoundRef} className="fixed w-full z-10 bottom-0 translate-y-full bg-white py-6 pt-8">
                <LookingForDriver setVehicleFound={setVehicleFound} setVehiclePanel={setVehiclePanel}/>
            </div>
            <div ref={WaitingforDriverRef} className="fixed w-full z-10 bottom-0 translate-y-full bg-white py-6 pt-8">
                <WaitingForDriver setWaitingForDriver={setWaitingForDriver} setVehicleFound={setVehicleFound} />
            </div>
        </div>
    );
};

export default Home;