import React from 'react';

const VehiclePanel = (props) => {
    return(
        <div>
            <h5 
                onClick={() => props.setVehiclePanel(false)}
                className="p-3 w-full absolute top-5.5 -right-80 text-2xl text-gray-500"><i className="ri-arrow-down-wide-line"></i></h5>
                <h3 className="text-2xl font-semibold mb-5">Choose a Vehicle</h3>
                <div onClick={()=>{[props.setConfirmRide(true) , props.setVehiclePanel(false),props.createRide('car')]}} className="flex active:border-2 border-black bg-gray-100 rounded-xl p-3 w-full items-center justify-between mb-2">
                    <img className="h-12" src="https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png" alt="" />
                    <div className="ml-2 w-1/2" >
                        <h4 className="font-medium text-base">UberGo <span><i className="ri-user-line">4</i></span></h4>
                        <h5 className="font-medium text-sm">2 mins away</h5>
                        <p className="font-normal text-xs text-gray-600 ">Affordable, compact rides</p>
                    </div>
                        <h2 className="text-lg font-semibold">₹{props.fare.car}</h2>
                </div>
                <div onClick={()=>{[props.setConfirmRide(true) , props.setVehiclePanel(false),props.createRide('bike')]}} className="flex active:border-2 border-black rounded-xl bg-gray-100 p-3 w-full items-center justify-between mb-2">
                    <img className="h-12" src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_956,h_637/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png" alt="" />
                    <div className="-ml-2 w-1/2" >
                        <h4 className="font-medium text-base">Uber Bike <span><i className="ri-user-line">2</i></span></h4>
                        <h5 className="font-medium text-sm">2 mins away</h5>
                        <p className="font-normal text-xs text-gray-600 ">Affordable, Motorcycle rides</p>
                    </div>
                        <h2 className="text-lg font-semibold">₹{props.fare.bike}</h2>
                </div>
                <div onClick={()=>{[props.setConfirmRide(true) , props.setVehiclePanel(false),props.createRide('auto')]}} className="flex active:border-2 border-black bg-gray-100 rounded-xl p-3 w-full items-center justify-between mb-2">
                    <img className="h-12" src="https://clipart-library.com/2023/Uber_Auto_312x208_pixels_Mobile.png" alt="" />
                    <div className="ml-2 w-1/2" >
                        <h4 className="font-medium text-base">Uber Auto <span><i className="ri-user-line">3</i></span></h4>
                        <h5 className="font-medium text-sm">2 mins away</h5>
                        <p className="font-normal text-xs text-gray-600 ">Affordable, Auto rides</p>
                    </div>
                        <h2 className="text-lg font-semibold">₹{props.fare.auto}</h2>
                </div>
        </div>
    );
}

export default VehiclePanel;