import React from 'react';

const PopupLayout = () => {
    return (
        <div>
            <img src="logo.png" alt="main-pic" style={{width: '155px', height: '48px'}} id="logo"/>
            <div id="metrics_container">
                <h3 id = "lifeTimeActivityTitle">Lifetime Activity</h3>
                <div style={{display: 'flex', width:'350px'	}}>
                    <p id="ads_found_label">Ads Found</p>
                    <p id="advertisers_found_label">Advertisers Found</p>
                    <p id="favorite_ads_label">Favorite Ads</p>
                </div>
                <div style={{display: 'flex', width:'300px', padding:'0px'}}>
                    <p id="ads_found_metric">0</p>
                    <p id="advertisers_found_metric">0</p>
                    <p id="favorite_ads_metric">0</p>
                </div>
                <h3 id="todaysActivityTitle">Today's Activity</h3>
                <div style={{display: 'flex', width:'350px'	}}>
                    <p id="ads_found_today_label">Ads Found</p>
                    <p id="advertisers_found_today_label">Advertisers Found</p>
                    <p id="favorite_ads_today_label">Favorite Ads</p>
                </div>
                <div style={{display: 'flex', width:'300px', padding:'0px'}}>
                    <p id="ads_found_today_metric">0</p>
                    <p id="advertisers_found_today_metric">0</p>
                    <p id="favorite_ads_today_metric">0</p>
                </div>
            </div>
            <p id = "gotoFacebookLabel">Go to 
                <a id = "facebookLink" target = "_blank" rel="noreferrer" href="https://www.facebook.com/">Facebook.com</a> 
                to start finding ads
            </p>
            <ul id="firstThing" style={{display:'none'}}>
                <li>
                    <input id="s1" type="checkbox" className="switch"/>
                    <label for="s1" id = "showAdsLabel">Show Ads</label>
                </li>
                <li>
                    <input id="s2" type="checkbox" className="switch"/>
                    <label for="s2" id = "autoScrollLabel">Auto Scroll</label>
                </li>
            </ul>
            <a target="_blank" rel="noreferrer" id="secondThing" href='nowhere' style={{	width: '436px', height: '56px' }}>
                <p id = "seeCollectedAdsText">See Collected Ads</p>
            </a>
            <div id = "errorField" style={{background: '#FEF4CA', display: 'none', flexDirection: 'row', color: '#6D5910',borderRadius: '12px', width: '436px', height: '50px', position: 'fixed', top: '515px', left: '25px' }}>
                <img src="info.png" alt="base-pic" style={{marginLeft: '14px', marginTop: '8px', width:'32px', height:'32px'}}/>
                <p style={{fontSize: '14px', fontFamily: 'Rubik', marginTop: '16px', marginLeft: '12px'}}></p>
            </div>
            <p id="idText">ID: </p>
            <div id = "border-line"></div>
            <div className = "button-container" style={{position: 'fixed',left: '32px',top: '209px'}}></div>
            <div className = "button-container" style={{position: 'fixed',left: '32px',top: '348px'}}></div>
            <div className = "metrics-switch" style={{position: 'fixed', left: '160px',top: '225px'}}></div>
            <div className = "metrics-switch" style={{position: 'fixed', left: '341px',top: '225px'}}></div>
            <div className = "metrics-switch" style={{position: 'fixed', left: '160px',top: '364px'}}></div>
            <div className = "metrics-switch" style={{position: 'fixed', left: '341px',top: '364px'}}></div>
            <div className="button-switch" id = "button-switch" style={{display:  'none', position: 'fixed', left: '250px',top: '97px'}}></div>
        </div>
    );
}

export default PopupLayout;