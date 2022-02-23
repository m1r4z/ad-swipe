import React from 'react';

const SingleAdvertiser = ({ad, handleAdvertiserClick}) => {


    return (
        <div className='singleAdvertiser' style={{cursor: "pointer"}} onClick={()=>handleAdvertiserClick(ad.page_id)}>
            <div className='profileContainer'>
                <img src={ad.logoUrl} alt="profile pic" />
                <span className='title'><span >{ad.name}</span></span>
            </div>
            <div className='adsContainer'>
                <span className='count'>1</span>
                <span className='text'>Ads Found</span>
            </div>
        </div>
    );
}

export default SingleAdvertiser;