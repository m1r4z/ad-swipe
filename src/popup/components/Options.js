import React from "react";
import Logoff from "../svg-components/Logoff";
import Settings from "../svg-components/Settings";
import WebPortal from "../svg-components/WebPortal";

const Options = () => {
    return (
        <div className="options-container">
            <div className="options-inner-container">
                <div className="angle"></div>
                <div className="options-list">
                    <div className="option">
                        <span className="option-icon">
                            <WebPortal />
                        </span>
                        Web Portal
                    </div>
                    <div className="option">
                        <span className="option-icon">
                            <Settings />
                        </span>
                        Settings
                    </div>
                    {/* <div className="option">
                        <span className="option-icon">
                            <Logoff />
                        </span>
                        Logoff
                    </div> */}
                </div>
            </div>
        </div>
    );
};

export default Options;
