import "./side-bar.css";

const SideBar = () => {

    return(
        <div className="side-bar-container margin-small flex-column jstfy-spce-btwn align-start">
            <div className="bar-elements margin-Xsmall"><i class="fa fa-home side-icon"></i> HOME</div>
            <div className="bar-elements margin-Xsmall"><i class="fa fa-archive side-icon"></i> ARCHIVE</div>
            <div className="bar-elements margin-Xsmall"><i class="fa fa-trash-o side-icon"></i> TRASH</div>
            <div className="bar-elements margin-Xsmall"><i class="fa fa-tags side-icon"></i> LABELS</div>
        </div>
    );
};

export default SideBar ;