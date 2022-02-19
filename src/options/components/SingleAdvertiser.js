import React from 'react';

const SingleAdvertiser = ({ad}) => {
    return (
        <div className='singleAdvertiser'>
            <div className='profileContainer'>
                <img src={ad.logoUrl} alt="profile pic" />
                <span className='title'>{ad.name}</span>
            </div>
            <div className='adsContainer'>
                <span className='count'>1</span>
                <span className='text'>Ads Found</span>
            </div>
        </div>
    );
}

export default SingleAdvertiser;