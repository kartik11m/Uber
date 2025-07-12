import React,{use, useState} from "react";
import {gsap} from "gsap";
import {useGSAP} from "@gsap/react"
import 'remixicon/fonts/remixicon.css'
import LocatinSearchPanel from "../components/LocationSearchPanel";
import VehiclePanel from "../components/VehiclePanel";
import ConfirmRide from "../components/ConfirmRide";
import LookingForDriver from "../components/LookingForDriver";
import WaitingForDriver from "../components/WaitingforDriver";

const Home = () => {

        const [pickup , setPickup] = useState("");
        const [drop , setDrop] = useState("");
        const [panelOpen, setPanelOpen] = useState(false);
        const panelRef = React.useRef(null);
        const panelCloseRef = React.useRef(null);
        const vehiclePanelRef = React.useRef(null);
        const confirmRideRef = React.useRef(null);
        const vehicleFoundRef = React.useRef(null);
        const WaitingforDriverRef = React.useRef(null);
        const [vehiclePanel, setVehiclePanel] = useState(false);    
        const [confirmRide , setConfirmRide] = useState(false);
        const[vehicleFound, setVehicleFound] = useState(false);
        const [waitingForDriver, setWaitingForDriver] = useState(false);

    const submitHandler = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log("Form submitted");
    };

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
                        onClick={() => setPanelOpen(true)}
                        value={pickup}
                        onChange={(e) => setPickup(e.target.value)}
                         className="bg-[#eee] px-12 py-2 text-base rounded-lg w-full mt-5"
                         type="text" 
                         placeholder="Add a pickup location"/>
                        <input 
                        onClick={() => setPanelOpen(true)}
                        value={drop}
                        onChange={(e) => setDrop(e.target.value)}
                        className="bg-[#eee] px-12 py-2 text-base rounded-lg w-full mt-3" 
                        type="text" 
                        placeholder="Add a drop location"/>
                    </form>
                </div>
                <div ref={panelRef} className=" bg-white h-0">
                    <LocatinSearchPanel  setPanelOpen={setPanelOpen} setVehiclePanel={setVehiclePanel}/>
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