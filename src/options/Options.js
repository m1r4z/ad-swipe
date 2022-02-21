import './Options.css';
import Navbar from './components/Navbar';
import React, { useState, useEffect } from 'react';
import AdsContainer from './components/AdsContainer';
import { addStorageChangeListener, removeStorageChangeListener, getDataFromStorage } from '../common/storageUtil';
import {STORAGE_KEY_FB_AD, AUTO_SCROLL_ON_MESSAGE, AUTO_SCROLL_OFF_MESSAGE, SHOW_AD_OFF_MESSAGE, SHOW_AD_ON_MESSAGE, OPTION_PAGE_OPEN, STORAGE_KEYFB_AD, STORAGE_KEY_TODAYS_TOTAL_ADS, STORAGE_KEY_TODAYS_TOTAL_AD_DOMAIN, STORAGE_KEY_TODAYS_TOTAL_FAVORITES, STORAGE_KEY_TOTAL_ADS, STORAGE_KEY_TOTAL_AD_DOMAIN, STORAGE_KEY_TOTAL_FAVORITES } from '../common/constant';
import AdvertiserContainer from './components/AdvertiserContainer';
import FavoriteAdsContainer from './components/FavoriteAdsContainer';
import { getInfo } from 'fb-video-downloader';

const Options = () =>{
  const [fbAds, setFbAds] = useState([{}]);
    getInfo('https://www.facebook.com/100048228941124/videos/341613557702921/').then((info) => console.log(JSON.stringify(info, null, 2)));
  const [totalAds, setTotalAds ] = useState(0);
  const [totalAdsDomain, setTotalAdsDomain ] = useState(0);
  const [totalFavorites, setTotalFavorites ] = useState(0);
  const [todaysTotalAds, setTodaysTotalAds ] = useState(0);
  const [todaysTotalAdsDomain, setTodaysTotalAdsDomain ] = useState(0);
  const [todaysTotalFavorites, setTodaysTotalFavorites ] = useState(0);

  const [allAdsPage, setAllAdsPage] = useState(true);  
  const [allAdvertisersPage, setAllAdvertisersPage] = useState(false);
  const [favoritePage, setFavoritePage] = useState(false);

  const [activeLiName, setActiveLiName] = useState('allAdsPage');

  const storageChangeListener = (change, area) => {
    if(area === "local" && change[STORAGE_KEY_TODAYS_TOTAL_ADS]) {
        setTodaysTotalAds(change[STORAGE_KEY_TODAYS_TOTAL_ADS]?.newValue?.results);
    }
    if(area === "local" && change[STORAGE_KEY_TODAYS_TOTAL_AD_DOMAIN]) {
        setTodaysTotalAdsDomain(change[STORAGE_KEY_TODAYS_TOTAL_AD_DOMAIN]?.newValue?.results);
    }
    if(area === "local" && change[STORAGE_KEY_TODAYS_TOTAL_FAVORITES]) {
        setTodaysTotalFavorites(change[STORAGE_KEY_TODAYS_TOTAL_FAVORITES]?.newValue?.results);
    }
    if(area === "local" && change[STORAGE_KEY_TOTAL_ADS]) {
        setTotalAds(change[STORAGE_KEY_TOTAL_ADS]?.newValue?.results);
    }
    if(area === "local" && change[STORAGE_KEY_TOTAL_AD_DOMAIN]) {
        setTotalAdsDomain(change[STORAGE_KEY_TOTAL_AD_DOMAIN]?.newValue?.results);
    }
    if(area === "local" && change[STORAGE_KEY_TOTAL_FAVORITES]) {
        setTotalFavorites(change[STORAGE_KEY_TOTAL_FAVORITES]?.newValue?.results);
    }
    if(area === "local" && change[STORAGE_KEY_FB_AD]) {
      setFbAds(change[STORAGE_KEY_FB_AD]?.newValue?.results);
    }
};


useEffect(() => {
    getDataFromStorage(STORAGE_KEY_TODAYS_TOTAL_ADS).then((response)=>{
        if(response){
            setTodaysTotalAds(response);
        }
    })
    getDataFromStorage(STORAGE_KEY_TODAYS_TOTAL_AD_DOMAIN).then((response)=>{
        if(response){
            setTodaysTotalAdsDomain(response);
        }
    })
    getDataFromStorage(STORAGE_KEY_TODAYS_TOTAL_FAVORITES).then((response)=>{
        if(response){
            setTodaysTotalFavorites(response);
        }
    })
    getDataFromStorage(STORAGE_KEY_TOTAL_ADS).then((response)=>{
        if(response){
            setTotalAds(response);
        }
    })
    getDataFromStorage(STORAGE_KEY_TOTAL_AD_DOMAIN).then((response)=>{
        if(response){
            setTotalAdsDomain(response);
        }
    })
    getDataFromStorage(STORAGE_KEY_TOTAL_FAVORITES).then((response)=>{
        if(response){
            setTotalFavorites(response);
        }
    })


    getDataFromStorage(STORAGE_KEY_FB_AD).then((response)=>{
      if(response){
        setFbAds(response);
      }
    })
    addStorageChangeListener(storageChangeListener);
    return () => removeStorageChangeListener(storageChangeListener);
}, []);

  // const storageChangeListener = (change, area) => {
  //   if(area === "local" && change[STORAGE_KEY_FB_AD]) {
  //     setFbAds(change[STORAGE_KEY_FB_AD]?.newValue?.results);
  //   }
  // };

  // useEffect(() => {
  //   getDataFromStorage(STORAGE_KEY_FB_AD).then((response)=>{
  //     if(response){
  //       setFbAds(response);
  //     }
  //   })
  //   addStorageChangeListener(storageChangeListener);
  //   return () => removeStorageChangeListener(storageChangeListener);
  // }, []);

const handleTotalAd = () => {
    setAllAdsPage(true);
    setAllAdvertisersPage(false);
    setFavoritePage(false);
    setActiveLiName('allAdsPage');
}

const handleTotalAdvertisers = () => {
    setAllAdsPage(false);
    setAllAdvertisersPage(true);
    setFavoritePage(false);
    setActiveLiName('allAdvertisersPage');
}
const handleFavoriteAds = () => {
    setAllAdsPage(false);
    setAllAdvertisersPage(false);
    setFavoritePage(true);
    setActiveLiName('favoritePage');
}
  return (
    <div className="App">
      <Navbar activeLiName={activeLiName} handleTotalAd={handleTotalAd} handleTotalAdvertisers={handleTotalAdvertisers} handleFavoriteAds={handleFavoriteAds}  totalAd={totalAds} totalAdvertisers={totalAdsDomain} favoriteAds={totalFavorites}/>
      { allAdsPage ? <AdsContainer fbAds={fbAds}/> : null}
      { allAdvertisersPage ? <AdvertiserContainer fbAds={fbAds}/> : null}
      { favoritePage ? <FavoriteAdsContainer fbAds={fbAds} /> : null} 
    </div>
  );
}

export default Options;

