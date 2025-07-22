import React , {useState , useRef , useEffect , useContext} from "react";
import { Link } from "react-router-dom";
import RidePopUp from "../components/RidePopUp";
import {gsap} from "gsap";
import {useGSAP} from "@gsap/react"
import CaptainDetails from "../components/CaptainDetails"
import ConfirmRidePopUp from "../components/ConfirmRidePopUp";
import { SocketContextData } from "../context/SocketContext";
import { CaptainContextData } from "../context/CaptainContext";
import axios from "axios"
import LiveTracking from "../components/LiveTracking";

const CaptainHome = () => {
    const [ridePopupPanel , setRidePopupPanel] = useState(false);
    const [confirmRidePopUpPanel , setConfirmRidePopupPanel] = useState(false);
    const ridePopupPanelRef = React.useRef(null);
    const confirmRidePopupPanelRef = React.useRef(null);
    const [ride , setRide] = useState(null);
    const {socket} = useContext(SocketContextData);
    const {captain} = useContext(CaptainContextData);

    useEffect(() =>{
        socket.emit('join',{userId: captain._id , userType: 'captain'});

        const updateLocation = () =>{
            if(navigator.geolocation){
                navigator.geolocation.getCurrentPosition(position =>{
                    // console.log(
                    //     {userId : captain._id,
                    //    location: {
                    //         lat: position.coords.latitude,
                    //         lng: position.coords.longitude
                    //     }}
                    // );
                    socket.emit('update-location-captain' , {
                        userId : captain._id,
                       location: {
                            lat: position.coords.latitude,
                            lng: position.coords.longitude
                        }
                    });
                });
            }
        }

        const locationInterval = setInterval(updateLocation , 10000);
        updateLocation();

        // return () => clearInterval(locationInterval);

    },[captain , socket]);

    socket.on('new-ride' , (data) => {
        console.log(data);
        setRide(data);
        setRidePopupPanel(true);
    });

    async function confirmRide(){
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/confirm`,{
            rideId : ride._id,
            captainId: captain._id,
        },{
            headers:{
                Authorization : `Bearer ${localStorage.getItem('token')}`
            }
        });
    }

    useGSAP(function(){
            if(ridePopupPanel){
                gsap.to(ridePopupPanelRef.current, {
                    transform:"translateY(0)",
                })
            }else{
                gsap.to(ridePopupPanelRef.current, {
                    transform:"translateY(100%)",
                })
            }
          },[ridePopupPanel])
    
    useGSAP(function(){
            if(confirmRidePopUpPanel){
                gsap.to(confirmRidePopupPanelRef.current, {
                    transform:"translateY(0)",
                })
            }else{
                gsap.to(confirmRidePopupPanelRef.current, {
                    transform:"translateY(100%)",
                })
            }
          },[confirmRidePopUpPanel])

    return(
        <div className="h-screen">
            <div className="fixed p-6 -top-3 flex items-center justify-between w-screen bg-gray-100">
                <img className="w-16" src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
                <Link to="/captain/logout" className="h-10 w-10 bg-white flex items-center justify-center rounded-full">
                    <i className="ri-logout-box-r-line"></i>
                </Link>
            </div>
            <div className="h-3/5 mt-15">
                <LiveTracking/>
            </div>

            <div className="h-2/5  p-6">
                <CaptainDetails/>
            </div>
            <div ref={ridePopupPanelRef} className="fixed w-screen z-10 translate-y-full bottom-0  bg-white py-6 pt-8">
                    <RidePopUp setRidePopupPanel={setRidePopupPanel} setConfirmRidePopupPanel={setConfirmRidePopupPanel} ride={ride} confirmRide={confirmRide}/>
            </div>
            <div ref={confirmRidePopupPanelRef} className="fixed w-screen h-screen z-10 translate-y-full bottom-0  bg-white py-6 pt-8">
                    <ConfirmRidePopUp setRidePopupPanel={setRidePopupPanel} setConfirmRidePopupPanel={setConfirmRidePopupPanel} ride={ride}/>
            </div>
        </div>
    );
};

export default CaptainHome;