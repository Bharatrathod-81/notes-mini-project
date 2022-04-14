import "./single-note.css";
import { useInputContext } from "../../contexts/input-contexts";

const SingleNote = ({ data }) => {

    const { dataOfNodes, dispatchNoteData } = useInputContext();

    const { obj } = data;

    return (
        <div className="note-body margin-Xsmall" style={{ backgroundColor: obj.color }}>
            <div className="top-note  jstfy-spce-btwn  margin-small">
                <h3 className={obj.titleText.join(" ")}>{obj.title}</h3>
                <button
                    className={obj.pined === 1 ? "primary-color" : "normal-color"}
                    onClick={() => dispatchNoteData({ type: "PINED", payload: obj })}
                ><i className="fa fa-thumb-tack"></i></button>
            </div>
            <hr></hr>
            <div className="content-body margin-small">
                <div className={obj.contentText.join(" ")}>{obj.content}</div>
            </div>
            <div className="labels-item flex-row">
                {obj.labels.map(item => {
                    return (
                        <div className="labels-body  margin-small">
                            {item}
                        </div>
                    );
                })}
            </div>
            <div className="jstfy-start  margin-small">
                <div className="priority-content">
                    {obj.priority}
                </div>
            </div>
            <div className="date-body  margin-small jstfy-start">
                Created on {obj.date}
            </div>
            <div className="footer-btn  margin-small  jstfy-end">
                <button><i class="fa fa-edit footer-icon"></i></button>
                <button><i class="fa fa-archive footer-icon"></i></button>
                <button><i class="fa fa-trash-o footer-icon"></i></button>
            </div>
        </div>
    );
};

export default SingleNote; 