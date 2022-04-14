import "./form.css";
import { useState } from "react";
import { useInputContext } from "../../contexts/input-contexts";

const Form = ({ closeForm }) => {



    const { setCreateBtn } = closeForm;

    const [newNotesValue, setNewNotesValue] = useState(
        {
            title: "",
            content: "",
            labels: [],
            date: null,
            pined: 0,
            priority: "",
            color: "",
            titleText:[],
            contentText:[],
            trash: false,
            archive: false
        });

    const [error, setError] = useState(false);

    const [Priority, setPriority] = useState("");

    const [colorBtn, setColorBtn] = useState(false);

    const { dataOfNodes, dispatchNoteData } = useInputContext();

    // for the color of the card
    const gotColor = (Clr) => {
        setNewNotesValue({ ...newNotesValue, color: Clr })
    };


    // text Editer for the title
    const textEditerForTitle = (style) => {
        if (!newNotesValue.titleText.includes(style)){
            setNewNotesValue({ ...newNotesValue, titleText:[...newNotesValue.titleText,style]});
        }else{
            const newTitleText = newNotesValue.titleText.filter(item => item !== style);
            setNewNotesValue({ ...newNotesValue, titleText:[...newTitleText]});
        };   
    };

    // text Editer for the content
    const textEditerForContent = (style) => {
        if (!newNotesValue.contentText.includes(style)){
            setNewNotesValue({ ...newNotesValue, contentText:[...newNotesValue.contentText,style]});
        }else{
            const newContentText = newNotesValue.contentText.filter(item => item !== style);
            setNewNotesValue({ ...newNotesValue, contentText:[...newContentText]});
        }; 
    };


    // for the labels
    const arrayOfLabels = ["WORK", "BUSINESS", "HEALTH", "BIRTHDAY", "OTHERS"];

    const labelFunc = labelData => {
        if (!newNotesValue.labels.includes(labelData)) {
            setNewNotesValue({ ...newNotesValue, labels: [...newNotesValue.labels, labelData] })
        } else {
            const newLabels = newNotesValue.labels.filter(item => item !== labelData);
            setNewNotesValue({ ...newNotesValue, labels: newLabels })
        }
    };


    const titleFunc = value => setNewNotesValue({ ...newNotesValue, title: value });

    const contentFunc = value => setNewNotesValue({ ...newNotesValue, content: value });



    const isTitleSame = dataOfNodes.some(item => item.title === newNotesValue.title)

    const saveFunc = () => {

        if (newNotesValue.content !== "" &&
            newNotesValue.title !== "" &&
            newNotesValue.labels[0] !== undefined) {
            if (!isTitleSame) {
                dispatchNoteData({ type: "NEW_NOTES", payload: { ...newNotesValue, priority: Priority } });
                setCreateBtn(false);
            };
        } else {
            setError(true)
        };
    }


    return (
        <div className="create-container align-centre flex-column">
            <div className="title-input-container flex-column  margin-small">
                <div className="flex-row jstfy-spce-btwn">
                    <label htmlFor="title-input">TITLE</label>
                    <div className="jstfy-spce-btwn ">
                        <div className="color-btn-container">
                            <button onClick={() => setColorBtn(true)}
                                className="color-btn"><i class="fa fa-paint-brush footer-icon"></i></button>
                            {colorBtn && <div className="color-container jstfy-spce-btwn"
                                onClick={() => {
                                    setColorBtn(false)
                                }}>
                                <div onClick={() => {
                                    gotColor("rgb(248, 220, 185)")
                                }}
                                    className="colors color1"></div>
                                <div onClick={() => {
                                    gotColor("rgb(185, 248, 189)")
                                }}
                                    className="colors color2"></div>
                                <div onClick={() => {
                                    gotColor("rgb(185, 193, 248)")
                                }}
                                    className="colors color3"></div>
                                <div onClick={() => {
                                    gotColor("rgb(193, 245, 243)")
                                }}
                                    className="colors color4"></div>
                                <div onClick={() => {
                                    gotColor("rgb(248, 185, 188)")
                                }}
                                    className="colors color5"></div>
                            </div>}
                        </div>
                        <button className="edit-Btn bold"
                            onClick={() => textEditerForTitle("bold")}
                        >B</button>
                        <button className="edit-Btn italic"
                            onClick={() => textEditerForTitle("italic")}
                            >I</button>
                        <button className="edit-Btn underline"
                            onClick={() => textEditerForTitle("underline")}
                        >U</button>
                        <button className="edit-Btn lineThrough"
                            onClick={() => textEditerForTitle("lineThrough")}
                        >S</button>
                    </div>
                </div>
                <input
                    className={`title-input padding-small ${newNotesValue.titleText.join(" ")}`}
                    type="text"
                    placeholder="Title..."
                    onChange={e => titleFunc(e.target.value)}
                />
            </div>
            {isTitleSame && <p className="error-msge">This Title is already used!</p>}
            <div className="content-input-container flex-column  margin-small">
                <div className=" jstfy-spce-btwn">
                    <label htmlFor="content-input">CONTENT</label>
                    <div>
                        <button className="edit-Btn bold"
                        onClick={() => textEditerForContent("bold")}
                        >B</button>
                        <button className="edit-Btn italic"
                        onClick={() => textEditerForContent("italic")}
                        >I</button>
                        <button className="edit-Btn underline"
                        onClick={() => textEditerForContent("underline")}
                        >U</button>
                        <button className="edit-Btn lineThrough"
                        onClick={() => textEditerForContent("lineThrough")}
                        >S</button>
                    </div>
                </div>
                <textarea
                    className={`content-input padding-small ${newNotesValue.contentText.join(" ")}`}
                    type="text"
                    placeholder="Enter note..."
                    onChange={e => contentFunc(e.target.value)}
                />
            </div>
            <div className="labels-input-container  margin-small ">
                <div>LABELS</div>
                <div className="label-list jstfy-spce-btwn">
                    {arrayOfLabels.map(label => {
                        return (
                            <div>
                                <input
                                    className="labels-input"
                                    type="checkbox"
                                    checked={newNotesValue.labels.includes(label)}
                                    onClick={() => labelFunc(label)}
                                />
                                <label htmlFor="labels-input">{label}</label>
                            </div>
                        );
                    })}
                </div>
            </div>
            <div className="priority">
                <div>PRIORITY</div>
                <div className="priority-inputs">
                    <span>
                        <input
                            type="radio"
                            className="low"
                            name="priority"
                            onClick={() => setPriority("Low")}
                        />
                        <label htmlFor="low">LOW</label>
                    </span>
                    <span className="margin-small">
                        <input
                            type="radio"
                            className="medium"
                            name="priority"
                            onClick={() => setPriority("Medium")}
                        />
                        <label htmlFor="medium">MEDIUM</label>
                    </span>
                    <span className="margin-small">
                        <input
                            type="radio"
                            className="high"
                            name="priority"
                            onClick={() => setPriority("High")}
                        />
                        <label htmlFor="high">HIGH</label>
                    </span>
                </div>
            </div>
            <div className="save-close margin-small  jstfy-start">
                <button
                    className="save-btn padding-small margin-small"
                    onClick={() => saveFunc()}
                >SAVE</button>
                <button
                    className="close-btn padding-small margin-small"
                    onClick={() => setCreateBtn(false)}
                >CLOSE</button>
            </div>
            {error && <p className="error-msge" >Fill all the empty Place</p>}
        </div>
    );
};

export default Form;