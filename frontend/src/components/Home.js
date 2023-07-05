import React from "react";
import './styles/Home.style.css';

const Home = () => {
    return (
        <div className="container">
            <div className="homeCard">
                <h1 className="title">Welcome to Yodlr!</h1>
                <h3 className="subtitle">Where would you like to go?</h3>
                <div className="linkContainer">
                    <a href="/admin">Admin Page</a>
                    <a href="/register">Registration</a>
                </div>
            </div>
        </div>
    )
}

export default Home;