import "./main-page.css";
import { useState } from "react";
import { useInputContext } from "../../contexts/input-contexts";
import { useEditContext } from "../../contexts/editContext";
import { useFilterContext } from "../../contexts/filterContext";
import SingleNote from "../../component/single-note/single-note";
import SideBar from "../../component/side-bar/side-bar";
import Form from "../form/form";

const MainPage = () => {

    const [createBtn, setCreateBtn] = useState(false);

    const { dispatchEditData } = useEditContext();

    // const {filterData, dispatchFilterData} = useFilterContext();
    const { filterData: {
        priority,
        date,
        labels,
        search
    }, dispatchFilterData } = useFilterContext();

    const getFilterData = () => {
        const { dataOfNodes, dispatchNoteData } = useInputContext();
        let newDataArray = [...dataOfNodes];
        
        
        if (priority !== "") {
            newDataArray = newDataArray.filter(item => item.priority === priority)
        }
        if (labels !== "") {
            newDataArray = newDataArray.filter(item => item.labels.includes(labels))
        }
        if (date === "Descending") {
            newDataArray = newDataArray.sort((a, b) => b.date-a.date)
        }
        if (date === "Ascending") {
            newDataArray = newDataArray.sort((a, b) => a.date-b.date)
        }
        if(search !== ""){
            newDataArray = newDataArray.filter(e => e.title.includes(search));
        }
        newDataArray = newDataArray.filter(item => !item.trash);
        
        newDataArray = newDataArray.filter(item => !item.archive);

        
        return newDataArray
    }
    
    const inputHandler = (e) => {
        
    }
    
    return (
        <div className="main-page-container flex-row">
            <SideBar />
            <div className="home-container  align-centre flex-column">
                <div className="search-container">
                    <input
                        className="search-input margin-small padding-small"
                        type="text"
                        onChange={e => dispatchFilterData({type:"SEARCH",payload:e.target.value})}
                        placeholder="Search by Title" />
                    <button
                        className="create-btn padding-small"
                        onClick={() => {
                            setCreateBtn(true)
                        }}
                    >Create New</button>
                </div>
                {createBtn &&
                    <Form closeForm={{ setCreateBtn }} />
                }
                {getFilterData().map(obj => {
                    return (
                        <>
                            <SingleNote data={{ obj }} create={{ setCreateBtn }} />
                        </>
                    );
                })}
            </div>
        </div>
    );
};

export default MainPage; 