import React, { createContext } from "react";

export const UserContextData = createContext();


const UserContext = ({children}) => {

    const [user, setUser] = React.useState({
        fullName: {
            firstName: "",
            lastName: ""
        },
        email: "",
        password: ""
    });
    return(
        <UserContextData.Provider value={{user, setUser}}>
            <div>{children}</div>
        </UserContextData.Provider>
    );
}

export default UserContext;