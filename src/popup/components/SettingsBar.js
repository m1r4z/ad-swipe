import React from "react";
import Settings from "../svg-components/Settings";

const SettingsBar = ({ handleSettingsClick }) => {
    return (
        <div className="settings-bar">
            <p className="text">
                Go To <a href="www.facebook.com">Facebook.com</a> to Start Swiping Ads
            </p>
            <div className="settings-container">
                <span>Settings</span>
                <span className="settings-icon" onClick={handleSettingsClick}>
                    <Settings />
                </span>
            </div>
        </div>
    );
};

export default SettingsBar;
