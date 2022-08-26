import "./single-note.css";
import { useInputContext } from "../../contexts/input-contexts";
import { useEditContext } from "../../contexts/editContext";
import { useRef } from "react";

const SingleNote = ({ data, create }) => {
    const { dataOfNodes, dispatchNoteData } = useInputContext();
    
    const { editData, setEditData } = useEditContext();
    
    const { obj } = data;
    
    const Ref = useRef(Date(obj.date))
    const { setCreateBtn } = create;

    const dateFormat = Ref.current.toString().split(" ").slice(1,5)
    return (
        <div className="note-body margin-Xsmall" style={{ backgroundColor: obj.color }}>
            <div className="top-note  jstfy-spce-btwn  margin-small">
                <h3>{obj.title}</h3>
                <button
                    className={obj.pined === 1 ? "primary-color" : "normal-color"}
                    onClick={() => dispatchNoteData({ type: "PINED", payload: obj })}
                ><i className="fa fa-thumb-tack"></i></button>
            </div>
            <hr></hr>
            <div className="content-body margin-small">
                <div dangerouslySetInnerHTML={{__html:obj.content}}></div>
            </div>
            <div className="labels-item flex-row">
                {obj.labels?.map(item => {
                    return (
                        <div className="labels-body  margin-small">
                            {item}
                        </div>
                    );
                })}
            </div>
            <div className="jstfy-start  margin-small">
                <div className="priority-content">
                    {obj.priority.toLowerCase()}
                </div>
            </div>
            <div className="date-body  margin-small jstfy-start">
                {dateFormat.map(e => <span style={{marginRight:"0.3rem"}}>{e}</span>)}
            </div>
            <div className="footer-btn  margin-small  jstfy-end">
                {!obj.archive && !obj.trash && <button
                    onClick={() => {
                        setCreateBtn(true)
                        setEditData(obj)
                    }
                    }
                ><i class="fa fa-edit footer-icon"></i></button>}
                {obj.archive ?
                    <div>
                        <button
                            onClick={() => dispatchNoteData({ type: "REMOVE_ARCHIVE", payload: obj })}
                        ><i class="fa fa-archive footer-icon archive"></i>
                        </button>
                    </div>
                    :
                    <button
                        onClick={() => dispatchNoteData({ type: "ADD_ARCHIVE", payload: obj })}
                    ><i class="fa fa-archive footer-icon"></i>
                    </button>}

                {obj.trash ?
                    <div>
                        <button
                            onClick={() => dispatchNoteData({ type: "REMOVE_TRASH", payload: obj })}
                        ><i class="fa fa-trash-o footer-icon trash"></i>
                        </button>
                        <button
                            onClick={() => dispatchNoteData({ type: "DELETE_NOTE", payload: obj })}
                        >DELETE
                        </button>
                    </div>
                    :
                    <button
                        onClick={() => dispatchNoteData({ type: "ADD_TRASH", payload: obj })}
                    ><i class="fa fa-trash-o footer-icon"></i>
                    </button>}
            </div>
        </div>
    );
};

export default SingleNote; 