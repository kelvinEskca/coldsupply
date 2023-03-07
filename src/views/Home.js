import React from "react";
import { Link } from "react-router-dom";
const Home = () => {
    return (
        <section className="section hero">
            <video autoPlay muted loop id="myVideo" src="../assets/video.mp4"></video>
            <div className="wrapper">
                <div className="boxes">
                    <div className="box">
                        <Link to='/index'><h3 className="heading">Cold Supply</h3></Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
 
export default Home;