import React from 'react';
import { AUTO_SCROLL_ON_MESSAGE, AUTO_SCROLL_OFF_MESSAGE, SHOW_AD_OFF_MESSAGE, SHOW_AD_ON_MESSAGE } from '../common/constant';

const PopupLayout = () => {
    const handleAutoScrollSwitch = (e) => {
        if(e.target.checked){
            chrome.runtime.sendMessage({query: AUTO_SCROLL_ON_MESSAGE});
        }else{
            chrome.runtime.sendMessage({query: AUTO_SCROLL_OFF_MESSAGE});
        }
    }
    return (
        <>
        <div className='main-container'>
            <p className='logo'>AD SWIPE</p>
            <p className='gotoFacebookLabel'>Go to 
                <a target = "_blank" rel="noreferrer" href="https://www.facebook.com/"> Facebook.com </a> 
                 to start finding ads
            </p>
            <ul className="firstThing">
                <li>
                    <input id="s1" type="checkbox" className="switch"/>
                    <label htmlFor="s1" id = "showAdsLabel">Show Ads</label>
                </li>
                <li>
                    <input id="s2" type="checkbox" className="switch" onChange={handleAutoScrollSwitch}/>
                    <label htmlFor="s2" id = "autoScrollLabel">Auto Scroll</label>
                </li>
            </ul>
            <div id="metrics_container">
                <div className='lifeTimeActivityContainer'>
                    <h3>Lifetime Activity</h3>
                    <div className='three_fields'>
                        <div className='container adsFoundLifeTime'>
                            <p className='count'>5</p>
                            <p>Ads Found</p>
                        </div>
                        <div className='container advertusersFoundLifeTime'>
                            <p className='count'>3</p>
                            <p>Advertisers Found</p>
                        </div>
                        <div className='container favoriteAdsLifeTime'>
                            <p className='count'>1</p>
                            <p>Favorite Ads</p>
                        </div>
                    </div>
                </div>
                <div className='todaysActivityContainer'>
                    <h3>Today's Activity</h3>
                    <div className='three_fields'>
                        <div className='container adsFoundToday'>
                            <p className='count'>5</p>
                            <p>Ads Found</p>
                        </div>
                        <div className='container advertusersFoundToday'>
                            <p className='count'>3</p>
                            <p>Advertisers Found</p>
                        </div>
                        <div className='container favoriteAdsToday'>
                            <p className='count'>1</p>
                            <p>Favorite Ads</p>
                        </div>
                    </div>
                </div>
            </div>
            <div id = "errorField" style={{background: '#FEF4CA', display: 'none', flexDirection: 'row', color: '#6D5910',borderRadius: '12px' }}>
                <img src="info.png" alt="base-pic" style={{padding: "10px 10px", width:'32px', height:'32px'}}/>
                <p style={{fontSize: '14px', fontFamily: 'Rubik'}}></p>
            </div>
            <p id="idText" style={{display: "none"}}>ID: </p>
            <div className="button-switch" id = "button-switch" style={{display:  'none', position: 'fixed', left: '250px',top: '97px'}}></div>
            <a target="_blank" rel="noreferrer" id="secondThing" href='nowhere'>
                <p id = "seeCollectedAdsText">See Collected Ads</p>
            </a>
        </div>
        </>
    );
}

export default PopupLayout;