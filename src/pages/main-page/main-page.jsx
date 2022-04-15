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

    const getFilterData = () => {
        const { dataOfNodes, dispatchNoteData } = useInputContext();
        let newDataArray = [...dataOfNodes];

        const { filterData: {
            priority,
            date,
            labels
        }, dispatchFilterData } = useFilterContext();

        if (priority !== "") {
            newDataArray = newDataArray.filter(item => item.priority === priority)
        }
        if (labels !== ""){
            newDataArray = newDataArray.filter(item => item.labels.includes(labels))
        }
        if (date === "Descending"){
            newDataArray = newDataArray.sort((a,b) => {
                let d1 = a.date.split("/")
                let d2 = b.date.split("/")
                let temp1, temp2
                temp1 = d1[0]
                temp2 = d2[0]
                d1[0] = d1[1]
                d2[0] = d2[1]
                d1[1] = temp1 
                d2[1] = temp2 
                return new Date(d2) - new Date(d1)
            })  
        }
        if (date === "Ascending"){
            newDataArray = newDataArray.sort((a,b) => {
                let d1 = a.date.split("/")
                let d2 = b.date.split("/")
                let temp1, temp2
                temp1 = d1[0]
                temp2 = d2[0]
                d1[0] = d1[1]
                d2[0] = d2[1]
                d1[1] = temp1 
                d2[1] = temp2 
                return new Date(d1) - new Date(d2)
        })
    }

        return newDataArray
    }


    return (
        <div className="main-page-container flex-row">
            <SideBar />
            <div className="home-container  align-centre flex-column">
                <div className="search-container">
                    <input
                        className="search-input margin-small padding-small"
                        type="text"
                        placeholder="Search by Title" />
                    <button
                        className="create-btn padding-small"
                        onClick={() => {
                            dispatchEditData({ type: "NEW_NOTES", payload: {} })
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