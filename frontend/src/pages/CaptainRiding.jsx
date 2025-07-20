import React, { useState , useRef } from "react";
import {Link , useLocation} from "react-router-dom";
import FinishRide from "../components/FinishRide";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap/gsap-core";
import LiveTracking from "../components/LiveTracking";

const CaptainRiding = () =>{

    const [finishRidePanel , setFinishRidePanel ] = useState(false);
    const finishRidePanelRef = React.useRef(null);
    const location = useLocation();
    const rideData = location.state?.ride;

    console.log(rideData);

     useGSAP(function(){
            if(finishRidePanel){
                gsap.to(finishRidePanelRef.current, {
                    transform:"translateY(0)",
                })
            }else{
                gsap.to(finishRidePanelRef.current, {
                    transform:"translateY(100%)",
                })
            }
          },[finishRidePanel])


    return(
        <div className="h-screen relative">
           
            <div className="fixed p-6 top-0 flex items-center justify-between w-screen">
                <img className="w-16" src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
                <Link to="/home" className="h-10 w-10 bg-white flex items-center justify-center rounded-full">
                    <i className="ri-logout-box-r-line"></i>
                </Link>
            </div>
            <div className="h-4/5">
                {/* <img className="h-full w-screen object-cover" src="https://cdn.theatlantic.com/thumbor/BlEOtTo9L9mjMLuyCcjG3xYr4qE=/0x48:1231x740/960x540/media/img/mt/2017/04/IMG_7105/original.png" alt="" /> */}
                <LiveTracking/>
            </div>

            <div className="h-1/5 relative flex items-center justify-between  p-6 bg-yellow-400"
            onClick={() => {
                setFinishRidePanel(true);
            }}
            >
             <h5 
                onClick={() => {}}
                className="p-3 absolute top-0 right-45 text-center text-2xl text-gray-500">
                <i className="ri-arrow-up-wide-line"></i>
            </h5>
                <h4 className="text-xl font-semibold">4 KM away</h4>
                <button className='w-full mt-5 bg-green-600 text-white font-semibold p-3 px-8 rounded-lg'>Complete Ride</button>
            </div>
            <div ref={finishRidePanelRef} className="fixed w-screen z-10 translate-y-full bottom-0  bg-white py-6 pt-8">
                    <FinishRide  setFinishRidePanel={setFinishRidePanel} ride ={rideData}/>
            </div>
        </div>
    );
}

export default CaptainRiding;