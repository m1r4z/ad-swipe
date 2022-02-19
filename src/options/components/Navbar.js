import React, { useState } from 'react';

const Navbar = ({totalAd, totalAdvertisers, favoriteAds, handleTotalAd, handleTotalAdvertisers, handleFavoriteAds, activeLiName}) => {
    
    let totalAdClass = "nav-list-item ";
    let allAdvertisersPage = "nav-list-item ";
    let favoritePage = "nav-list-item ";

    if(activeLiName == 'allAdsPage'){
        totalAdClass += 'active';
        allAdvertisersPage = "nav-list-item ";
        favoritePage = "nav-list-item ";
    }else if(activeLiName == 'allAdvertisersPage'){
        totalAdClass = ' nav-list-item ';
        allAdvertisersPage += " active ";
        favoritePage = " nav-list-item ";
    }else if(activeLiName == 'favoritePage'){
        totalAdClass = 'nav-list-item ';
        allAdvertisersPage = "nav-list-item ";
        favoritePage += " active";
    }
    
    return (
        <div className='navbar-container'>
            <div className='navbar-container-inner'>
                <div className='logo-container'>
                    AD SWIPE
                </div>
                <ul className='nav-list'>
                    <li className={totalAdClass} onClick={handleTotalAd}>Total ads ( {totalAd} ) </li>
                    <li className={allAdvertisersPage} onClick={handleTotalAdvertisers}>Total Advertisers ( {totalAdvertisers} )</li>
                    <li className={favoritePage} onClick={handleFavoriteAds}>FavoriteAds ( {favoriteAds} )</li>
                </ul>
            </div>
        </div>
    );
}

export default Navbar;