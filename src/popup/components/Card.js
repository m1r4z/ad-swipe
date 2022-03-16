import React from "react";
import Cup from "../svg-components/Cup";

const Card = ({ title, allTimeCount, todayCount, icon }) => {
    return (
        <div className="card-container">
            <div className="icon-container">{icon}</div>
            <div className="text-container">
                <p className="title">{title}</p>
            </div>
            <div className="all-time-container">
                <p className="text">All Time</p>
                <p className="number">{allTimeCount}</p>
            </div>
            <div className="today-container">
                <p className="text">Today</p>
                <p className="number">{todayCount}</p>
            </div>
        </div>
    );
};

export default Card;
