import React from 'react';

const LookingForDriver = (props) =>{
    return(
        <div>
             <h5 
                onClick={() => props.setVehicleFound(false)}
                className="p-3 w-full absolute top-5.5 -right-80 text-2xl text-gray-500">
                <i className="ri-arrow-down-wide-line"></i>
            </h5>
            <h3 className="text-2xl font-semibold mb-5">Looking for a Driver</h3>
            <div className='flex justify-between  gap-2 flex-col items-center'>
                <img className="h-30" src="https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png" alt="" />
            </div>
            <div className='w-full mt-5'>
                <div className='flex items-center gap-5 p-3 border-b-1'>
                    <i className="ri-map-pin-user-line text-lg"></i>
                    <div>
                        <h3 className='text-lg font-medium'>{props.ride.pickup}</h3>
                        <p className='text-sm -mt-1 text-gray-600'>Pickup</p>
                    </div>
                </div>

                <div className='flex items-center gap-5 p-3 border-b-1'>
                    <i className="ri-map-pin-3-line text-lg"></i>
                    <div>
                        <h3 className='text-lg font-medium'>{props.ride.destination}</h3>
                        <p className='text-sm -mt-1 text-gray-600'>Destination</p>
                    </div>
                </div>
                
                <div className='flex items-center gap-5 p-3 mb-2'>
                    <i className="ri-cash-line text-lg"></i>
                    <div>
                        <h3 className='text-lg font-medium'>₹{props.ride.fare}</h3>
                        <p className='text-sm -mt-1 text-gray-600'>Cash</p>
                    </div>
                </div>
                
            </div>
            <div>
                <button
                onClick={() => [props.setVehicleFound(false) , props.setVehiclePanel(true)]} 
                className='w-full bg-red-600 text-white font-semibold p-2 rounded-lg'>Cancel</button>
            </div>
        </div>
    );
}
export default LookingForDriver;