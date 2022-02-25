import React, {useEffect, useState} from 'react';
import SearchBar from './SearchBar';
import SingleAd from './SingleAd';
import { addDays } from 'date-fns';
import { Rings } from  'react-loader-spinner'




const AdsContainer = ({fbAds, handleRemoveClick, handleNameClickInSinglePost, specific}) => {

    const [ads, setAds] = useState([]);
    const [loading, setLoading] = useState(false);

    const [data, setData] = useState({
        startDate: new Date(),
        endDate: addDays(new Date(), 7),
        key: 'selection'
      });

    const handleSearch = (e) => {
        var searchValue = e.target.value.toLowerCase();
        var filteredResult = fbAds.filter(ad => {
            var isAdFound = false;
            var text = ad?.['text'] && ad?.['text'].toLowerCase();
            var name = ad?.['name'] && ad?.['name'].toLowerCase();
            var url = ad?.['url'] && ad?.['url'].toLowerCase();
            var footerDomainName = ad?.['footerDomainName'] && ad?.['footerDomainName'].toLowerCase();
            var footerTitleText = ad?.['footerTitleText'] && ad?.['footerTitleText'].toLowerCase();
            var footerActionButtonName = ad?.['footerActionButtonName'] && ad?.['footerActionButtonName'].toLowerCase();
            var actionTitle = ad?.['actionTitle'] && ad?.['actionTitle'].toLowerCase();
            
            if(text && text.includes(searchValue)){
                isAdFound = true;
            }else if(name && name.includes(searchValue)){
                isAdFound = true;
            }else if(url && url.includes(searchValue)){
                isAdFound = true;
            }else if(footerDomainName && footerDomainName.includes(searchValue)){
                isAdFound = true;
            }else if(footerTitleText && footerTitleText.includes(searchValue)){
                isAdFound = true;
            }else if(footerActionButtonName && footerActionButtonName.includes(searchValue)){
                isAdFound = true;
            }else if(actionTitle && actionTitle.includes(searchValue)){
                isAdFound = true;
            }
            if(isAdFound){
                return true;
            }
        });
        if(searchValue && filteredResult.length){
            setAds(filteredResult)
        }
        if(searchValue && !filteredResult.length){
            setAds([]);
        }
        if(!searchValue){
            setAds(fbAds);
        }

        setTimeout(function(){
            setLoading(false);
        },2000);
        setLoading(true);
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

    const selectedDateRange = (item) => {
        console.log('asdfasdf')
        console.log(item.startDate)

        var startDate = new Date(item.startDate);
        var endDate = new Date(item.endDate);
        
        var filteredAds = fbAds.filter(ad=>{
            var postDate = new Date(ad.date);
            if(startDate < postDate && postDate < endDate){
                return ad;
            }
        });

        setData(item);
        setAds(filteredAds);
    }
    
    useEffect(()=>{
        // var allPostIds = fbAds.map(ad => {
        //     return ad?.['post_id'];
        // });
        // allPostIds = Array.from(new Set(allPostIds));

        // var uniquePost = fbAds.filter(ad => {
        //     const index = array.indexOf(ad?.["post_id"]);
        //     if (index > -1) {
        //         allPostIds.splice(index, 1); 
        //         return ad;
        //     }
        // });
        setAds(fbAds);
    },[fbAds]);

    return (
        <>
            <SearchBar handleSearch={handleSearch} handleSorting={handleSorting} selectedDateRange={selectedDateRange} data={data}/>
            <div style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
                {loading ? 
                    <Rings
                        height="100"
                        width="100"
                        color='#6046ff'
                        ariaLabel='loading'
                    /> :
                    <div className='ads-container'>
                        {ads.map(ad=>{
                            if(ad){
                                return <SingleAd key={ad?.['post_id']} specific={specific} ad={ad} handleRemoveClick={handleRemoveClick} handleNameClickInSinglePost={handleNameClickInSinglePost}/>
                            }
                        })}
                    </div>
                }
            </div>
        </>
    );
}

export default AdsContainer;