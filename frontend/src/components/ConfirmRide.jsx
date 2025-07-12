import React from 'react';

const ConfirmRide = (props) => {
    return (
        <div>
             <h5 
                onClick={() => props.setConfirmRide(false)}
                className="p-3 w-full absolute top-5.5 -right-80 text-2xl text-gray-500">
                <i className="ri-arrow-down-wide-line"></i>
            </h5>
            <h3 className="text-2xl font-semibold mb-5">Confirm Your Ride</h3>
            <div className='flex justify-between  gap-2 flex-col items-center'>
                <img className="h-30" src="https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png" alt="" />
            </div>
            <div className='w-full mt-5'>
                <div className='flex items-center gap-5 p-3 border-b-1'>
                    <i className="ri-map-pin-user-line text-lg"></i>
                    <div>
                        <h3 className='text-lg font-medium'>Phoenix Mall</h3>
                        <p className='text-sm -mt-1 text-gray-600'>, Indore</p>
                    </div>
                </div>

                <div className='flex items-center gap-5 p-3 border-b-1'>
                    <i className="ri-map-pin-3-line text-lg"></i>
                    <div>
                        <h3 className='text-lg font-medium'>Phoenix Mall</h3>
                        <p className='text-sm -mt-1 text-gray-600'>, Indore</p>
                    </div>
                </div>
                
                <div className='flex items-center gap-5 p-3 mb-2'>
                    <i className="ri-cash-line text-lg"></i>
                    <div>
                        <h3 className='text-lg font-medium'>₹193.20</h3>
                        <p className='text-sm -mt-1 text-gray-600'>Cash</p>
                    </div>
                </div>
                
            </div>
            <div>
                <button 
                onClick={() =>[ props.setVehicleFound(true) , props.setConfirmRide(false)]}
                className='w-full bg-green-600 text-white font-semibold p-2 rounded-lg'>Confirm</button>
            </div>
        </div>
    );
}

export default ConfirmRide;