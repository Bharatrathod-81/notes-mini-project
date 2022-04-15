import "./side-bar.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useFilterContext } from "../../contexts/filterContext";

const SideBar = () => {

    const arrayOfLabels = ["WORK", "BUSINESS", "HEALTH", "BIRTHDAY", "OTHERS"];

    const [filterBtn, setFilterBtn] = useState(false);

    const [filterType, setFilterType] = useState("Date");

    const {filterData, dispatchFilterData} = useFilterContext();
    
    return (
        <div className="side-bar-container margin-small flex-column jstfy-spce-btwn align-start">
            <Link className="links" to="/"><div className="bar-elements margin-Xsmall"><i class="fa fa-home side-icon"></i> HOME</div></Link>
            <div className="bar-elements margin-Xsmall"><i class="fa fa-archive side-icon"></i> ARCHIVE</div>
            <div className="bar-elements margin-Xsmall"><i class="fa fa-trash-o side-icon"></i> TRASH</div>
            <div className="bar-elements margin-Xsmall"><i class="fa fa-tags side-icon"></i> LABELS</div>
            <button
                onClick={() => {
                    dispatchFilterData({type:"CLEAR",payload:""})
                    setFilterBtn(!filterBtn)}}
                className="filter-Btn margin-Xsmall jstfy-spce-around padding-small"><i class="fa fa-sliders"></i>{filterType}</button>
            {filterBtn && <div className="filter-types ">
                <div
                    onClick={() => setFilterType("Date")}
                    className="date-filter">Date</div>
                <div
                    onClick={() => setFilterType("Priority")}
                    className="priority-filter ">Priority</div>
                <div
                    onClick={() => setFilterType("Labels")}
                    className="tag-filter">Labels</div>
            </div>
            }
            {/* Date filter */}
            {filterType==="Date" && filterBtn && <div className="date-filter-container  flex-column">
                <button  
                onClick={() => dispatchFilterData({type:"DATE",payload:"Descending"})}
                className="date-btns ">Recents</button>
                <button
                onClick={() => dispatchFilterData({type:"DATE",payload:"Ascending"})} 
                className="date-btns ">Lasts</button>
            </div>
            }
            {/* Priority filter */}
            {filterType==="Priority" && filterBtn && <div className="priority-filter-btn flex-column">
                <button 
                onClick={() => dispatchFilterData({type:"PRIORITY",payload:"Low"})}
                className="priority-btns ">Low</button>
                <button 
                onClick={() => dispatchFilterData({type:"PRIORITY",payload:"Medium"})}
                className="priority-btns ">Medium</button>
                <button 
                onClick={() => dispatchFilterData({type:"PRIORITY",payload:"High"})}
                className="priority-btns ">High</button>
                </div>
                }
            {/* Labels filter */}
            {filterType === "Labels" && filterBtn && <div>
                <div className="label-filter margin-small ">
                    {arrayOfLabels.map(items => {
                        return (
                            <div className="margin-small jstfy-start">
                                <input
                                    className="label-filter-input"
                                    type="radio"
                                    name="labels"
                                    onClick={() => dispatchFilterData({type:"LABELS",payload:items})}
                                />
                                <label htmlFor="label-filter-input">{items}</label>
                            </div>
                        );
                    })}
                </div>
            </div>}
        </div>
    );
};

export default SideBar;