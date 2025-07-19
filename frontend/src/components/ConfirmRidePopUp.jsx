import React,{useState} from "react";
import {Link} from "react-router-dom";

const ConfirmRidePopUp = (props) =>{

    const [otp , setOtp] = useState("");

    const submitHandler = (e) =>{
        e.preventDefault();

        
    };

    return(
        <div>
            <h5 
                onClick={() => props.setConfirmRidePopupPanel(false)}
                className="p-3 w-full absolute top-5.5 -right-80 text-2xl text-gray-500">
                <i className="ri-arrow-down-wide-line"></i>
            </h5>
            <h3 className="text-2xl font-semibold mb-5">Confirm this ride to start</h3>
            <div className="flex items-center justify-between p-3 bg-yellow-400 rounded-lg mt-4">
                <div className="flex items-center gap-3">
                    <img className="h-15 w-15 rounded-full object-cover" src="https://people.com/thmb/Nw5vsnuK4VLLWxiW6HB0fN0INWw=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():focal(749x0:751x2)/johnny-depp-81-070825-2e7dc9b2d3444948a03a968b044b038a.jpg" alt="" />
                    <h2 className="text-xl font-medium capitalize">{props.ride?.fullname.firstname + " " + props.ride?.fullname.lastname}</h2>
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
                <form onSubmit={(e) => {
                    submitHandler(e)
                }}>
                    <input value={otp} onChange={(e) => {setOtp(e.target.value)}} className="bg-[#eee] px-6 py-4 text-base rounded-lg w-full mt-5 font-mono" type="text" placeholder="Enter OTP"/>
                    <button
                    className='w-full tetx-lg flex justify-center mt-4 bg-green-600 text-white font-semibold p-3 rounded-lg'>Confirm</button>
                    <button 
                    onClick={() =>[props.setConfirmRidePopupPanel(false) , props.setRidePopupPanel(false)]}
                    className='w-full text-lg mt-2 bg-red-600 text-white font-semibold p-3 rounded-lg'>Cancel</button>
                </form>
            </div>
        </div>
    );
}

export default ConfirmRidePopUp;