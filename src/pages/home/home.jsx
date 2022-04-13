import "./home.css";

const Home = () => {

    return (
        <div className="home-body flex-row align-centre">
            <div className="home-texts jstfy-spce-btwn flex-column margin-Xsmall">
                <h1 className="main-heading"><span className="heading">My</span>Website</h1>
                <div>
                    <h2>Meet your modern</h2>
                    <h2>Note Taking App</h2>
                    <p>Manage your daily tasks and workflow in a modern way and boost your efficiency without any efforts.</p>
                </div>
                <div>
                    <button className="guest-login-btn padding-Xsmall">Join Now as a Guest</button>
                </div>
            </div>
            <div className="img-container">
                <img className="img" src="https://pbs.twimg.com/media/EXzqzKdWoAADjTL.png" alt="home-img" />
            </div>
        </div>
    );
};

export default Home; 