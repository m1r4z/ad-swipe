import React from 'react';
import SingleAdvertiser from './SingleAdvertiser';

const AdvertiserContainer = ({fbAds, handleAdvertiserClick}) => {
    return (
        <div className='advertiser-container'>
            {fbAds.map((ad=>{
                return <SingleAdvertiser ad={ad} handleAdvertiserClick={handleAdvertiserClick}/>
            }))}
        </div>
    );
}

export default AdvertiserContainer;
