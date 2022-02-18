import './Options.css';
import Navbar from './components/Navbar';
import React, { useState, useEffect } from 'react';
import AdsContainer from './components/AdsContainer';
import { addStorageChangeListener, removeStorageChangeListener } from '../common/storageUtil';

const Options = () =>{
  const [totalAd, setTotalAd] = useState(0);
  const [totalAdvertisers, setTotalAdvertisers] = useState(0);
  const [favoriteAds, setFavoriteAds] = useState(0);

  const storageChangeListener = (change, area) => {
    if(area === "sync" && change["miraz"]) {
      console.log(change["miraz"]?.newValue?.results);
    }
  };

  useEffect(() => {
    addStorageChangeListener(storageChangeListener);

    return () => removeStorageChangeListener(storageChangeListener);
  }, []);

  return (
    <div className="App">
      <Navbar totalAd={totalAd} totalAdvertisers={totalAdvertisers} favoriteAds={favoriteAds}/>
      <AdsContainer />
    </div>
  );
}

export default Options;

