import { createContext, useContext, useReducer } from "react";

const inputContext = createContext();

const InputContectProvider = ({ children }) => {

    // for the current date
    const today = new Date();
    const currentDate = today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear();


    const Reducer = (state, action) => {
        switch (action.type) {
            case "NEW_NOTES":
                const newObj = { ...action.payload, date: currentDate }
                return [...state, newObj];
            case "PINED":
                if (action.payload.pined === 0) {
                    const addToPined = state.map(item => item.title === action.payload.title ? { ...action.payload, pined: 1 } : item);
                    addToPined.sort((a, b) => b.pined - a.pined);
                    return [...addToPined];
                } else {
                    const removeFromPined = state.map(item => item.title === action.payload.title ? { ...action.payload, pined: 0 } : item);
                    return [...removeFromPined];
                };
            case "ADD_ARCHIVE" :
                const newArchiveArr = state.map(item => item.title===action.payload.title ? {...item,archive:true}:item);
                return [...newArchiveArr];
            case "REMOVE_ARCHIVE" :
                const removeArchive = state.map(item => item.title===action.payload.title ? {...item,archive:false}:item);
                return [...removeArchive];
            case "ADD_TRASH" :
                const newTrashArr = state.map(item => item.title===action.payload.title ? {...item,trash:true}:item);
                return [...newTrashArr];
            case "REMOVE_TRASH" :
                const removeTrash = state.map(item => item.title===action.payload.title ? {...item,trash:false}:item);
                return [...removeTrash];
            case "DELETE_NOTE":
                const removedDataForEdit = state.filter(item => item.title !== action.payload.title);
                return [...removedDataForEdit];
            default:
                return state;

        };
    };

    const [dataOfNodes, dispatchNoteData] = useReducer(Reducer, []);


    return (
        <inputContext.Provider value={{ dataOfNodes, dispatchNoteData }}>
            {children}
        </inputContext.Provider>
    );
};

const useInputContext = () => useContext(inputContext);

export { useInputContext, InputContectProvider };