import { useContext, createContext, useState } from "react";

const editContext = createContext();

const EditContextProvider = ({ children }) => {
    

    const [editData, setEditData] = useState({})

    return (
        <editContext.Provider value={{editData, setEditData}}>
            { children }
        </editContext.Provider>
    );
};

const useEditContext = () => useContext(editContext);

export { useEditContext, EditContextProvider };