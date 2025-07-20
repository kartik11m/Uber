import React,{useState} from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const FinishRide = (props) =>{
    const navigate = useNavigate();
    async function endRide(){
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/end-ride`,{
            rideId:props.ride._id,
        },{
            headers:{
                Authorization:`Bearer ${localStorage.getItem('token')}`
            }
        });

        if(response.status === 200){
            props.setFinishRidePanel(false);
            // props.setRidePopupPanel(false);
            navigate('/captain/home');
        }
    }
    return(
        <div>
            <h5 
                onClick={() => props.setFinishRidePanel(false)}
                className="p-3 w-full absolute top-5.5 -right-80 text-2xl text-gray-500">
                <i className="ri-arrow-down-wide-line"></i>
            </h5>
            <h3 className="text-2xl font-semibold mb-5">Finish this ride</h3>
            <div className="flex items-center justify-between p-4 border-2 border-yellow-400 rounded-lg mt-4">
                <div className="flex items-center gap-3">
                    <img className="h-15 w-15 rounded-full object-cover" src="https://people.com/thmb/Nw5vsnuK4VLLWxiW6HB0fN0INWw=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():focal(749x0:751x2)/johnny-depp-81-070825-2e7dc9b2d3444948a03a968b044b038a.jpg" alt="" />
                    <h2 className="text-xl font-medium">{props.ride?.user.fullname.firstname +" "+props.ride?.user.fullname.lastname}</h2>
                </div>
                <h5 className="text-lg font-semibold">{props.ride?.distance} Km</h5>
            </div>
            <div className='flex justify-between  gap-2 flex-col items-center'>
            </div>
            <div className='w-full mt-5'>
                <div className='flex items-center gap-5 p-3 border-b-1'>
                    <i className="ri-map-pin-user-line text-lg"></i>
                    <div>
                        <h3 className='text-lg font-medium'>{props.ride?.pickup}</h3>
                        <p className='text-sm -mt-1 text-gray-600'>pickup</p>
                    </div>
                </div>

                <div className='flex items-center gap-5 p-3 border-b-1'>
                    <i className="ri-map-pin-3-line text-lg"></i>
                    <div>
                        <h3 className='text-lg font-medium'>{props.ride?.destination}</h3>
                        <p className='text-sm -mt-1 text-gray-600'>destination</p>
                    </div>
                </div>
                
                <div className='flex items-center gap-5 p-3 mb-2'>
                    <i className="ri-cash-line text-lg"></i>
                    <div>
                        <h3 className='text-lg font-medium'>₹{props.ride?.fare}</h3>
                        <p className='text-sm -mt-1 text-gray-600'>Cash</p>
                    </div>
                </div>
                
            </div>
        
            <div className="mt-6 w-full p-3 ">
                    <button onClick={endRide}
                    className='w-full text-lg flex justify-center mt-4 bg-green-600 text-white font-semibold p-3 rounded-lg'>Finish Ride</button>
                    <p className="text-red-500 mt-10 text-xs ">Click on finish ride button if you have received the payment.</p>
            </div>
        </div>
    );
}

export default FinishRide;