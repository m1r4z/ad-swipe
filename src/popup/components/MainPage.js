import React from "react";
import Eye from "../svg-components/Eye";
import Card from "../components/Card";
import Search from "../svg-components/Search";
import Advertiser from "../svg-components/Advertiser";
import Favorite from "../svg-components/Favorite";
import Info from "../svg-components/Info";

const MainPage = () => {
    return (
        <>
            <div className="auto-collect-container">
                <input id="auto-collect" type="checkbox" className="switch" />
                <label htmlFor="auto-collect" id="auto-collect-label">
                    Auto Collect - On
                </label>
                <Info />
            </div>
            <Card title="Ads Swiped" icon={<Search />} allTimeCount="10000" todayCount="158" />
            <Card title="Advertisers" icon={<Advertiser />} allTimeCount="384" todayCount="82" />
            <Card title="Favorites" icon={<Favorite />} allTimeCount="57" todayCount="3" />
            <button className="view-swiped-ads">
                <Eye />
                <span>View Swiped Ads</span>
            </button>
        </>
    );
};

export default MainPage;
