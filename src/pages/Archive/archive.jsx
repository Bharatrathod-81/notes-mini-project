import { useInputContext } from "../../contexts/input-contexts";
import SideBar from "../../component/side-bar/side-bar";
import SingleNote from "../../component/single-note/single-note";

const Archive = ({ create }) => {

    const setCreateBtn = () => {};

    const getFilterData = () => {
        const { dataOfNodes } = useInputContext();
        
        let newNotesData = [...dataOfNodes];

        newNotesData = newNotesData.filter(item => item.archive);

        return newNotesData ; 
    };

    return(
        <div className="main-page-container flex-row">
            <SideBar />
            <div className="home-container  align-centre flex-column">
                {getFilterData().map(obj => {
                    return (
                        <>
                            <SingleNote data={{ obj }} create={{ setCreateBtn }}/>
                        </>
                    );
                })}
            </div>
        </div>
    );
};

export default Archive ; 