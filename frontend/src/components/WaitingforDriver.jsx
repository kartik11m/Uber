import React from 'react';

const WaitingForDriver = (props) => {
    return (
        <div>
             <h5 
                onClick={() => props.setWaitingForDriver(false)}
                className="p-3 w-full absolute top-1.5 -right-40 text-2xl text-gray-500">
                <i className="ri-arrow-down-wide-line"></i>
            </h5>
            <div className='flex items-center justify-between'>
                <img className='h-12' src="https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png" alt="" />
                <div className='text-right'>
                    <h2 className='text-lg font-medium capitalize'>{props.rideCaptain?.captain.fullname.firstname}</h2>
                    <h4 className='text-xl font-semibold -mt-1 -mb-1 '>{props.rideCaptain?.captain.vehicle.plate}</h4>
                    <p className='text-sm text-gray-600'>Maruti Suzuki Alto</p>
                    <h1 className=" font-semibold">{props.rideCaptain?.otp}</h1>
                </div>
            </div>
            <div className='w-full mt-5'>
                <div className='flex items-center gap-5 p-3 border-b-1'>
                    <i className="ri-map-pin-user-line text-lg"></i>
                    <div>
                        <h3 className='text-lg font-medium'>{props.rideCaptain?.pickup}</h3>
                        <p className='text-sm -mt-1 text-gray-600'>, Indore</p>
                    </div>
                </div>

                <div className='flex items-center gap-5 p-3 border-b-1'>
                    <i className="ri-map-pin-3-line text-lg"></i>
                    <div>
                        <h3 className='text-lg font-medium'>{props.rideCaptain?.destination}</h3>
                        <p className='text-sm -mt-1 text-gray-600'>, Indore</p>
                    </div>
                </div>
                
                <div className='flex items-center gap-5 p-3 mb-2'>
                    <i className="ri-cash-line text-lg"></i>
                    <div>
                        <h3 className='text-lg font-medium'>₹{props.rideCaptain?.fare}</h3>
                        <p className='text-sm -mt-1 text-gray-600'>Cash</p>
                    </div>
                </div>
                
            </div>
            <div>
                <button className='w-full bg-green-600 text-white font-semibold p-2 rounded-lg'>Confirm</button>
            </div>
        </div>
    );
}

export default WaitingForDriver;