import React, {useEffect, useState} from 'react';
import SearchBar from './SearchBar';
import SingleAd from './SingleAd';

const AdsContainer = ({fbAds, handleRemoveClick, handleNameClickInSinglePost, specific}) => {

    const [ads, setAds] = useState([]);

    const handleSearch = (e) => {
        let isAdFound = false;
        var searchValue = e.target.value;
        var filteredResult = fbAds.filter(ad => {
            var text = ad.text.toLowerCase();
            var name = ad.name.toLowerCase();
            if(text.match(searchValue) || name.match(searchValue)){
                isAdFound = true;
                return ad;
            }
        });

        if(searchValue && isAdFound){
            setAds(filteredResult)
        }
        if(searchValue && !isAdFound){
            setAds([]);
        }
    }

    function BubbleSort(arr, target){
        var key = "";
        if(target==='likes'){
            key="likeCount";
        }else if(target==='comments'){
            key="commentCount";
        }else if(target === 'shares'){
            key="shareCount";
        }else if(target === 'oldest'){
            return fbAds
        }else if(target === 'latest'){
            return arr.reverse();
        }

        for(var i = 0; i < arr.length; i++){
            for(var j = 0; j < ( arr.length - i -1 ); j++){
                if(arr[j][key] < arr[j+1][key]){
                    var temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j+1] = temp;
                }
            }
        }

        return arr
    }
    const handleSorting = (e) => {
        var target = e.target.value;
        const sortedAds = BubbleSort(ads, target);
        setAds([...sortedAds]);
    }

    
    useEffect(()=>{
        setAds(fbAds);
    },[fbAds]);

    return (
        <>
            <SearchBar handleSearch={handleSearch} handleSorting={handleSorting}/>
            <div className='ads-container'>
                {ads.map(ad=>{
                    return <SingleAd key={ad.post_id} specific={specific} ad={ad} handleRemoveClick={handleRemoveClick} handleNameClickInSinglePost={handleNameClickInSinglePost}/>
                })}
            </div>
        </>
    );
}

export default AdsContainer;