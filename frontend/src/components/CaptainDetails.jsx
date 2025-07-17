import React,{useContext} from "react"
import CaptainContext, { CaptainContextData } from "../context/CaptainContext";

const CaptainDetails = () =>{

    const {captain} = useContext(CaptainContextData);

        const firstName = captain?.fullname?.firstname || "Captain";

    return(

        <div>
            <div className="flex items-center justify-between">
                    <div className="flex items-center justify-start gap-3">
                        <img className="h-10 w-10 rounded-full object-cover" src="https://people.com/thmb/Nw5vsnuK4VLLWxiW6HB0fN0INWw=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():focal(749x0:751x2)/johnny-depp-81-070825-2e7dc9b2d3444948a03a968b044b038a.jpg" alt="" />
                        <h4 className="text-lg font-medium">{captain.fullname.firstname + " " + captain.fullname.lastname}</h4>
                    </div>
                    <div>
                        <h4 className="text-xl font-semibold">₹295.20</h4>
                        <p className="text-sm text-gray-600">Earned</p>
                    </div>
                </div>
                <div className="flex p-3 mt-8 bg-gray-100 rounded-xl  justify-center gap-5 items-start">
                    <div className="text-center">
                        <i className="text-3xl mb-2 font-thin ri-time-line"></i>
                        <h5 className="text-lg font-medium">10.2</h5>
                        <p className="text-sm text-gray-600">Hours Online</p>
                    </div>
                    <div className="text-center">
                        <i className="text-3xl mb-2 font-thin ri-speed-up-line"></i>
                        <h5 className="text-lg font-medium">10.2</h5>
                        <p className="text-sm text-gray-600">Hours Online</p>
                    </div>
                    <div className="text-center">
                        <i className="text-3xl mb-2 font-thin ri-booklet-line"></i>
                        <h5 className="text-lg font-medium">10.2</h5>
                        <p className="text-sm text-gray-600">Hours Online</p>
                    </div>
                </div>
        </div>
    );
}

export default CaptainDetails;