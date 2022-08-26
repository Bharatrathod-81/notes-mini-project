import "./form.css";
import { useState } from "react";
import { useInputContext } from "../../contexts/input-contexts";
import { useEditContext } from "../../contexts/editContext";
import 'react-quill/dist/quill.snow.css';
import ReactQuill from "react-quill";


const Form = ({ closeForm }) => {

    const { editData } = useEditContext();

    const { setCreateBtn } = closeForm;

    const [newNotesValue, setNewNotesValue] = useState(
        {
            labels: [],
            trash: false,
            archive: false
        });

    const [color, setColor] = useState("")

    const [Priority, setPriority] = useState("");

    const [colorBtn, setColorBtn] = useState(false);

    const [oldData, setOldData] = useState({ title: editData.title, content: editData.content });

    const { dataOfNodes, dispatchNoteData } = useInputContext();

    const formats = ["bold", "italic", "underline", "strike", "image", "list", "link", "clean", "video"];
    const modules = {
        toolbar: [
            ["bold", "italic", "underline", "strike"],
            [],
            [{ list: "ordered" }, { list: "bullet" }],
            [],
            ["image", "video", "link"],
            ["clean"],
        ],
    };

    // for the color of the card
    const gotColor = (Clr) => {
        setColor(Clr)
        setNewNotesValue({ ...newNotesValue, color: Clr })
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


    const saveFunc = () => {
        dispatchNoteData({ type: "NEW_NOTES", payload: { ...editData, ...newNotesValue, priority: Priority, } });
        setCreateBtn(false);
    }

    const inputHandler = (e) => {
        setNewNotesValue({ ...newNotesValue, content: e })
    }

    return (
        <div
            style={{ backgroundColor: color }}
            className="create-container align-centre flex-column">
            <div className="title-input-container flex-column  margin-small">
                <div className="flex-row jstfy-spce-btwn">
                    <label htmlFor="title-input">TITLE</label>
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
                    <div className="jstfy-spce-btwn ">
                        <div className="color-btn-container">
                            <button onClick={() => setColorBtn(true)}
                                className="color-btn"><i class="fa fa-paint-brush footer-icon"></i></button>
                        </div>

                    </div>
                </div>
                <input
                    className="title-input padding-small"
                    name="title"
                    type="text"
                    value={oldData.title}
                    placeholder="Title..."
                    onChange={e => {
                        setOldData(e.target.value)
                        setNewNotesValue({ ...newNotesValue, title: e.target.value });
                    }}
                />
            </div>
            <div className="content-input-container flex-column  margin-small">
                <div className=" jstfy-spce-btwn">
                    <label htmlFor="content-input">CONTENT</label>
                </div>
                <ReactQuill
                    name="content"
                    modules={modules}
                    formats={formats}
                    value={editData.content ?? newNotesValue.content}
                    placeholder="Take a note..."
                    onChange={inputHandler}
                    className="content-input padding-small"
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
                    {['LOW', 'MEDIUM', 'HIGH'].map(e =>
                        <span>
                            <input
                                type="radio"
                                className="low"
                                name="priority"
                                onClick={() => setPriority(e)}
                            />
                            <label htmlFor="low">{e}</label>
                        </span>
                    )}
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
        </div>
    );
};

export default Form;