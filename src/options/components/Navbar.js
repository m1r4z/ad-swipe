import React from 'react';

const Navbar = ({totalAd, totalAdvertisers, favoriteAds}) => {
    return (
        <div className='navbar-container'>
            <div className='navbar-container-inner'>
                <div className='logo-container'>
                    AD SWIPE
                </div>
                <ul className='nav-list'>
                    <li className='nav-list-item active'>Total ads ( {totalAd} ) </li>
                    <li className='nav-list-item'>Total Advertisers ( {totalAdvertisers} )</li>
                    <li className='nav-list-item'>FavoriteAds ( {favoriteAds} )</li>
                </ul>
            </div>
        </div>
    );
}

export default Navbar;