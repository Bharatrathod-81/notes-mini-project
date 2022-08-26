import { createContext, useContext, useReducer} from "react";

const filterContext = createContext();

const FilterContextProvider = ({ children }) => {

    const getFilterData = (state, action) => {
        switch(action.type) {
            case "PRIORITY" :
                return{...state,priority:action.payload};
            case "DATE" :
                return{...state,date:action.payload};
            case "LABELS" :
                return{...state,labels:action.payload};
            case 'SEARCH':
                console.log(action);
                return{...state,search:action.payload};
            case "CLEAR" :
                return{
                    priority:"",
                    date:"",
                    labels:"",
                    search:""
                }
            default:
                return state;
            
        };
    };

    const [filterData, dispatchFilterData] = useReducer(getFilterData,{
        priority:"",
        date:"",
        labels:"",
        search:""
    });

    return(
        <filterContext.Provider value={{filterData, dispatchFilterData}}>
            { children }
        </filterContext.Provider>
    );
};

const useFilterContext = () => useContext(filterContext);

export { useFilterContext, FilterContextProvider} ;