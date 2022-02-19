import React from 'react';
import SingleAdvertiser from './SingleAdvertiser';

const AdvertiserContainer = ({fbAds}) => {
    return (
        <div className='advertiser-container'>
            {fbAds.map((ad=>{
                return <SingleAdvertiser ad={ad}/>
            }))}
        </div>
    );
}

export default AdvertiserContainer;
