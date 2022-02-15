import './Options.css';
import Navbar from './components/Navbar';
import React, { useState } from 'react';
import AdsContainer from './components/AdsContainer';

const Options = () =>{
  const [totalAd, setTotalAd] = useState(0);
  const [totalAdvertisers, setTotalAdvertisers] = useState(0);
  const [favoriteAds, setFavoriteAds] = useState(0);
  return (
    <div className="App">
      <Navbar totalAd={totalAd} totalAdvertisers={totalAdvertisers} favoriteAds={favoriteAds}/>
      <AdsContainer />
    </div>
  );
}

export default Options;

