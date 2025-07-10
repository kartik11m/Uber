import React, { createContext } from "react";

export const CaptainContextData = createContext();


const CaptainContext = ({children}) => {

    const [captain, setCaptain] = React.useState({
        fullName: {
            firstName: "",
            lastName: ""
        },
        email: "",
        password: "",
        vehicle: {
            color: "",
            plate: "",
            capacity: 0,
            vehicleType: ""
        }
    });
    return(
        <CaptainContextData.Provider value={{captain, setCaptain}}>
            <div>{children}</div>
        </CaptainContextData.Provider>
    );
}

export default CaptainContext;