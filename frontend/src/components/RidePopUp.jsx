import React,{useState} from "react";


const RidePopUp = (props) =>{
    return(
        <div>
            <h5 
                onClick={() => props.setRidePopupPanel(false)}
                className="p-3 w-full absolute top-5.5 -right-80 text-2xl text-gray-500">
                <i className="ri-arrow-down-wide-line"></i>
            </h5>
            <h3 className="text-2xl font-semibold mb-5">New Ride Available!</h3>
            <div className="flex items-center justify-between p-3 bg-yellow-400 rounded-lg mt-4">
                <div className="flex items-center gap-3">
                    <img className="h-15 w-15 rounded-full object-cover" src="https://people.com/thmb/Nw5vsnuK4VLLWxiW6HB0fN0INWw=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():focal(749x0:751x2)/johnny-depp-81-070825-2e7dc9b2d3444948a03a968b044b038a.jpg" alt="" />
                    <h2 className="text-xl font-medium">{props.ride?.user.fullname.firstname + " " + props.ride?.user.fullname.lastname}</h2>
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
                        <p className='text-sm -mt-1 text-gray-600'>, pickup</p>
                    </div>
                </div>

                <div className='flex items-center gap-5 p-3 border-b-1'>
                    <i className="ri-map-pin-3-line text-lg"></i>
                    <div>
                        <h3 className='text-lg font-medium'>{props.ride?.destination}</h3>
                        <p className='text-sm -mt-1 text-gray-600'>, destination</p>
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
            <div className="flex gap-15 items-center justify-between w-full">
                <button 
                onClick={() =>[props.setRidePopupPanel(false)]}
                className='w-full mt-5 bg-gray-300 text-gray-700 font-semibold p-3 px-8 rounded-lg'>Ignore</button>
                <button 
                onClick={() =>[props.setConfirmRidePopupPanel(true) , props.confirmRide()]}
                className='w-full mt-5 bg-green-600 text-white font-semibold p-3 px-8 rounded-lg'>Accept</button>
                
            </div>
        </div>
    );
}

export default RidePopUp;