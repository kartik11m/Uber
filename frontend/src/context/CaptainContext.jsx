import React, { createContext } from "react";

export const CaptainContextData = createContext();


const CaptainContext = ({children}) => {

    const [captain, setCaptain] = React.useState({
        fullname: {
            firstname: "",
            lastname: ""
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