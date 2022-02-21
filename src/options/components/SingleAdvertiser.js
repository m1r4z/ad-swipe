import React from 'react';

const SingleAdvertiser = ({ad}) => {

    var href = `https://www.facebook.com/ads/library/?active_status=all&ad_type=all&country=BD&view_all_page_id=${ad.page_id}&search_type=page&media_type=all`;

    return (
        <div className='singleAdvertiser'>
            <div className='profileContainer'>
                <img src={ad.logoUrl} alt="profile pic" />
                <span className='title'><a href={href} target="_blank">{ad.name}</a></span>
            </div>
            <div className='adsContainer'>
                <span className='count'>1</span>
                <span className='text'>Ads Found</span>
            </div>
        </div>
    );
}

export default SingleAdvertiser;