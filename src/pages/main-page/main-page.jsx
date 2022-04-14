import "./main-page.css";
import { useState } from "react";
import { useInputContext } from "../../contexts/input-contexts";
import SingleNote from "../../component/single-note/single-note";
import SideBar from "../../component/side-bar/side-bar";
import Form from "../form/form";

const MainPage = () => {

    const [createBtn, setCreateBtn] = useState(false);

    const { dataOfNodes, dispatchNoteData } = useInputContext();


    return (
        <div className="main-page-container flex-row">
            <SideBar/>
            <div className="home-container  align-centre flex-column">
                <div className="search-container">
                    <input
                        className="search-input margin-small padding-small"
                        type="text"
                        placeholder="Search by Title" />
                    <button
                        className="create-btn padding-small"
                        onClick={() => setCreateBtn(true)}
                    >Create New</button>
                </div>
                {createBtn &&
                    <Form closeForm={{setCreateBtn}}/>
                }
                {dataOfNodes.map(obj => {
                    return (
                        <>
                            <SingleNote data={{obj}}/>
                        </>
                    );
                })}
            </div>
        </div>
    );
};

export default MainPage; 