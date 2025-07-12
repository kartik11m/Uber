import React from "react";

const LocationSearchPanel = (props) => {
    // console.log(props);
    const locations = [
        "Phoenix Mall, Indore",
        "TI Mall, Indore",
        "Central Mall, Indore",
        "C21 Mall, Indore",
    ]; // This should be replaced with actual location data
    return(
        <div>
            Location:
            {
                locations.map(function(elem,idx){
                    return (
                    <div key={idx} onClick={() => {
                        props.setVehiclePanel(true);
                        props.setPanelOpen(false);
                        }
                    } 
                    className="flex items-center justify-center gap-2 my-4 border-2 active:border-black  p-3 rounded-xl border-gray-50">
                        <h2 className="bg-[#eee] p-2 rounded-full h-8 w-8 flex items-center justify-center"><i className="ri-map-pin-line"></i></h2>
                        <h4 className="font-medium">{elem}</h4>
                    </div>
                    );
                })
            }
        </div>
    )
}
export default LocationSearchPanel;