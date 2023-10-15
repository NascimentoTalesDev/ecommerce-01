import { createContext, useState } from "react";

export const UserContext = createContext({})

const UserContextProvider = ({children}) => {
    const [modalUser, setModalUser] = useState(false)
    
    function isLoggedIn() {
        setModalUser(true)
    }
    
    return (
        <UserContext.Provider value={{isLoggedIn, modalUser, setModalUser}}>
            {children}
        </UserContext.Provider>
    );
}
 
export default UserContextProvider;