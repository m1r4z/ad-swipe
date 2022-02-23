import React from 'react';
import SingleAd from './SingleAd';

const AllAdsOfAdvertiser = ({allAds = [{}], handleBackClick, handleRemoveClick, specific}) => {
    return (
        <div className='ad-container'>
            <span style={{margin: "15px 0 0 0", cursor: "pointer", color: "black", fontSize: "16px", alignSelf: "flex-start"}} onClick={handleBackClick}> Back </span> 
            <div className='singleAdvertiser' style={{cursor: "pointer", width: "100%"}}>
                <div className='profileContainer'>
                    <img src={allAds[0]?.['logoUrl']} alt="profile pic" />
                    <span className='title'><span >{allAds[0]?.['name']}</span></span>
                </div>
                <div className='adsContainer'>
                    <span className='count'>{allAds.length}</span>
                    <span className='text'>Ads Found</span>
                </div>
            </div>
            <div className='ads-container'>
                {allAds.map(ad=>{ 
                    return <SingleAd key={ad.post_id} ad={ad} specific={specific} handleRemoveClick={handleRemoveClick}/>
                })}
            </div>
        </div>
    );
}

export default AllAdsOfAdvertiser;