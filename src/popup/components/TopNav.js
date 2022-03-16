import React from "react";
import Eye from "../svg-components/Eye";
import Logo from "../svg-components/Logo";
import MoreOption from "../svg-components/MoreOption";

const TopNav = ({ optionClick }) => {
    return (
        <div className="top-nav">
            <div className="logo">
                <Logo />
            </div>
            <div className="icon options-icon" onClick={optionClick}>
                <MoreOption />
            </div>
        </div>
    );
};

export default TopNav;
