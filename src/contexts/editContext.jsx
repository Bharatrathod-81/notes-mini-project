import { useContext, createContext, useReducer } from "react";

const editContext = createContext();

const EditContextProvider = ({ children }) => {
    

    const getEditFunc = (state, action) => {
        switch (action.type) {
            case "EDIT_CARD" :
                return {...action.payload};
            case "CHANGE_PRIORITY_LOW":
                return { ...state, priority: "Low" };
            case "CHANGE_PRIORITY_MEDIUM":
                return { ...state, priority: "Medium" };
            case "CHANGE_PRIORITY_HIGH":
                return { ...state, priority: "High" };
            default:
                return {};
        };
    };

    const [editData, dispatchEditData] = useReducer(getEditFunc, {})

    return (
        <editContext.Provider value={{editData, dispatchEditData}}>
            { children }
        </editContext.Provider>
    );
};

const useEditContext = () => useContext(editContext);

export { useEditContext, EditContextProvider };