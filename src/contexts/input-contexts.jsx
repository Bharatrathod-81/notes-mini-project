import { createContext, useContext, useReducer } from "react";

const inputContext = createContext();

const InputContectProvider = ({ children }) => {

    // for the current date
    const today = new Date();
    const currentDate =  today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear();


    const Reducer = (state, action) => {
        switch (action.type) {
            case "NEW_NOTES":
                const newObj = {...action.payload,date:currentDate}
                return [...state, newObj];
            case "PINED" :
                if (action.payload.pined === 0) {
                    const addToPined = state.map(item => item.title === action.payload.title ? {...action.payload,pined:1}:item);
                    addToPined.sort((a,b) => b.pined - a.pined);
                    return[...addToPined];
                }else{
                    const removeFromPined = state.map(item => item.title === action.payload.title ? {...action.payload,pined:0}:item);
                    return[...removeFromPined];
                }
            default:
                return state;

        };
    };

    const [dataOfNodes, dispatchNoteData] = useReducer(Reducer,[] );

    console.log(dataOfNodes);

    return (
        <inputContext.Provider value={{ dataOfNodes, dispatchNoteData }}>
            {children}
        </inputContext.Provider>
    );
};

const useInputContext = () => useContext(inputContext);

export { useInputContext, InputContectProvider };