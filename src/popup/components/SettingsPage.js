import React from "react";
import Back from "../svg-components/Back";
import Info from "../svg-components/Info";

const SettingsPage = ({ handleBackClick }) => {
    return (
        <div className="settings-page-container">
            <div className="settings-heading">
                <span style={{ cursor: "pointer" }} onClick={handleBackClick}>
                    <Back />
                </span>
                <span className="title">Settings</span>
            </div>
            <div className="auto-scrolling-container">
                <div className="text-container">
                    <span className="text">Auto Scrolling - </span>
                    <span className="status auto-scrolling-status">On</span>
                    <Info />
                </div>
                <input id="s2" type="checkbox" className="switch" />
            </div>
            <div className="show-ads-container">
                <div className="text-container">
                    <span className="text">Show Ads Only- </span>
                    <span className="status show-ads-status">Off</span>
                    <Info />
                </div>
                <input id="s1" type="checkbox" className="switch" />
            </div>
        </div>
    );
};

export default SettingsPage;
