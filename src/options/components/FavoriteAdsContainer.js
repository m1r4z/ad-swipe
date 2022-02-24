import React from 'react';
import SingleAd from './SingleAd';

const FavoriteAdsContainer = ({fbAds}) => {
    console.log(fbAds);
    var favoriteAds = fbAds.filter((ad)=>{
        return ad.isFavorite;
    })
    return (
        <div className='ads-container'>
            {favoriteAds.map((ad=>{
                return <SingleAd ad={ad} key={ad.post_id}/>
            }))}
        </div>
    );
}

export default FavoriteAdsContainer;