import { createContext, useState } from "react";

export const UserContext = createContext({})

const UserContextProvider = ({children}) => {
    const [modalUser, setModalUser] = useState(false)
    const [user, setUser] = useState(false)

    function isLoggedIn(user) {
        
        if (!user) {
            setModalUser(true)
            return user
        }
        return user
    }
    
        
    return (
        <UserContext.Provider value={{isLoggedIn, modalUser, setModalUser, setUser}}>
            {children}
        </UserContext.Provider>
    );
}
 
export default UserContextProvider;