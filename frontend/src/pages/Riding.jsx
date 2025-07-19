import React from "react";
import { Link,useLocation } from "react-router-dom";

const Riding = () => {
    const location = useLocation();
    const {ride} = location.state || {};
    return (
        <div className="h-screen">
            <Link to="/home" className="fixed right-2 top-2 h-10 w-10 bg-white flex items-center justify-center rounded-full">
                <i className="text-lg font-medium ri-home-2-line"></i>
            </Link>
            <div className="h-1/2">
                <img className="h-full w-screen object-cover" src="https://cdn.theatlantic.com/thumbor/BlEOtTo9L9mjMLuyCcjG3xYr4qE=/0x48:1231x740/960x540/media/img/mt/2017/04/IMG_7105/original.png" alt="" />
            </div>

            <div className="h-1/2 p-4">
                <div className='flex items-center justify-between'>
                    <img className='h-12' src="https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png" alt="" />
                    <div className='text-right'>
                        <h2 className='text-lg font-medium capitalize'>{ride?.captain.fullname.firstname + " " + ride?.captain.fullname.lastname}</h2>
                        <h4 className='text-xl font-semibold -mt-1 -mb-1 '>{ride?.captain.vehicle.plate}</h4>
                        <p className='text-sm text-gray-600'>Maruti Suzuki Alto</p>
                    </div>
                </div>
                <div className='w-full mt-5'>
                    
                    <div className='flex items-center gap-5 p-3 border-b-1'>
                        <i className="ri-map-pin-3-line text-lg"></i>
                        <div>
                            <h3 className='text-lg font-medium'>{ride?.destination}</h3>
                            <p className='text-sm -mt-1 text-gray-600'>destination</p>
                        </div>
                    </div>
                
                    <div className='flex items-center gap-5 p-3 mb-2'>
                        <i className="ri-cash-line text-lg"></i>
                        <div>
                            <h3 className='text-lg font-medium'>₹{ride?.fare}</h3>
                            <p className='text-sm -mt-1 text-gray-600'>Cash</p>
                        </div>
                    </div>
                
                </div>
                <button className='w-full bg-green-600 text-white font-semibold p-2 rounded-lg'>Make a Payment</button>
            </div>
        </div>
    );
}

export default Riding;