import "./Options.css";
import Navbar from "./components/Navbar";
import React, { useState, useEffect } from "react";
import AdsContainer from "./components/AdsContainer";
import {
	addStorageChangeListener,
	removeStorageChangeListener,
	getDataFromStorage,
	setDataInStorage,
} from "../common/storageUtil";
import {
	STORAGE_KEY_FB_AD,
	AUTO_SCROLL_ON_MESSAGE,
	AUTO_SCROLL_OFF_MESSAGE,
	SHOW_AD_OFF_MESSAGE,
	SHOW_AD_ON_MESSAGE,
	OPTION_PAGE_OPEN,
	STORAGE_KEYFB_AD,
	STORAGE_KEY_TODAYS_TOTAL_ADS,
	STORAGE_KEY_TODAYS_TOTAL_AD_DOMAIN,
	STORAGE_KEY_TODAYS_TOTAL_FAVORITES,
	STORAGE_KEY_TOTAL_ADS,
	STORAGE_KEY_TOTAL_AD_DOMAIN,
	STORAGE_KEY_TOTAL_FAVORITES,
} from "../common/constant";
import AdvertiserContainer from "./components/AdvertiserContainer";
import FavoriteAdsContainer from "./components/FavoriteAdsContainer";
import { getInfo } from "fb-video-downloader";
import AllAdsOfAdvertiser from "./components/AllAdsOfAdvertiser";

const Options = () => {
	const [fbAds, setFbAds] = useState([{}]);
	getInfo("https://www.facebook.com/100048228941124/videos/341613557702921/").then((info) =>
		console.log(JSON.stringify(info, null, 2))
	);
	const [totalAds, setTotalAds] = useState(0);
	const [totalAdsDomain, setTotalAdsDomain] = useState(0);
	const [totalFavorites, setTotalFavorites] = useState(0);
	const [todaysTotalAds, setTodaysTotalAds] = useState(0);
	const [todaysTotalAdsDomain, setTodaysTotalAdsDomain] = useState(0);
	const [todaysTotalFavorites, setTodaysTotalFavorites] = useState(0);

	const [allAdsPage, setAllAdsPage] = useState(true);
	const [allAdvertisersPage, setAllAdvertisersPage] = useState(false);
	const [favoritePage, setFavoritePage] = useState(false);

	const [activeLiName, setActiveLiName] = useState("allAdsPage");

	const storageChangeListener = (change, area) => {
		if (area === "local" && change[STORAGE_KEY_TODAYS_TOTAL_ADS]) {
			setTodaysTotalAds(change[STORAGE_KEY_TODAYS_TOTAL_ADS]?.newValue?.results);
		}
		if (area === "local" && change[STORAGE_KEY_TODAYS_TOTAL_AD_DOMAIN]) {
			setTodaysTotalAdsDomain(change[STORAGE_KEY_TODAYS_TOTAL_AD_DOMAIN]?.newValue?.results);
		}
		if (area === "local" && change[STORAGE_KEY_TODAYS_TOTAL_FAVORITES]) {
			setTodaysTotalFavorites(change[STORAGE_KEY_TODAYS_TOTAL_FAVORITES]?.newValue?.results);
		}
		if (area === "local" && change[STORAGE_KEY_TOTAL_ADS]) {
			setTotalAds(change[STORAGE_KEY_TOTAL_ADS]?.newValue?.results);
		}
		if (area === "local" && change[STORAGE_KEY_TOTAL_AD_DOMAIN]) {
			setTotalAdsDomain(change[STORAGE_KEY_TOTAL_AD_DOMAIN]?.newValue?.results);
		}
		if (area === "local" && change[STORAGE_KEY_TOTAL_FAVORITES]) {
			setTotalFavorites(change[STORAGE_KEY_TOTAL_FAVORITES]?.newValue?.results);
		}
		if (area === "local" && change[STORAGE_KEY_FB_AD]) {
			setFbAds(change[STORAGE_KEY_FB_AD]?.newValue?.results);
		}
	};

	useEffect(() => {
		getDataFromStorage(STORAGE_KEY_TODAYS_TOTAL_ADS).then((response) => {
			if (response) {
				setTodaysTotalAds(response);
			}
		});
		getDataFromStorage(STORAGE_KEY_TODAYS_TOTAL_AD_DOMAIN).then((response) => {
			if (response) {
				setTodaysTotalAdsDomain(response);
			}
		});
		getDataFromStorage(STORAGE_KEY_TODAYS_TOTAL_FAVORITES).then((response) => {
			if (response) {
				setTodaysTotalFavorites(response);
			}
		});
		getDataFromStorage(STORAGE_KEY_TOTAL_ADS).then((response) => {
			if (response) {
				setTotalAds(response);
			}
		});
		getDataFromStorage(STORAGE_KEY_TOTAL_AD_DOMAIN).then((response) => {
			if (response) {
				setTotalAdsDomain(response);
			}
		});
		getDataFromStorage(STORAGE_KEY_TOTAL_FAVORITES).then((response) => {
			if (response) {
				setTotalFavorites(response);
			}
		});

		getDataFromStorage(STORAGE_KEY_FB_AD).then((response) => {
			if (response) {
				setFbAds(response);
			}
		});
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
		setActiveLiName("allAdsPage");
		setAllAdsOfAdvertiser(false);
	};

	const handleTotalAdvertisers = () => {
		setAllAdsPage(false);
		setAllAdvertisersPage(true);
		setFavoritePage(false);
		setActiveLiName("allAdvertisersPage");
		setAllAdsOfAdvertiser(false);
	};
	const handleFavoriteAds = () => {
		setAllAdsPage(false);
		setAllAdvertisersPage(false);
		setFavoritePage(true);
		setActiveLiName("favoritePage");
		setAllAdsOfAdvertiser(false);
	};

	const handleRemoveClick = (postId, specific) => {
		var filteredAds = fbAds;
		var indexOfDeleteItem = -1;
		for (var i = 0; i < fbAds.length; i++) {
			if (postId === fbAds[i]?.["post_id"]) {
				indexOfDeleteItem = i;
			}
		}
		var isFavorite = fbAds[indexOfDeleteItem]?.isFavorite;
		var page_id = fbAds[indexOfDeleteItem]?.page_id;

		if (indexOfDeleteItem > -1) {
			filteredAds.splice(indexOfDeleteItem, 1);
		}

		if (filteredAds.filter((ad) => ad?.page_id === page_id)?.length === 0) {
			getDataFromStorage(STORAGE_KEY_TOTAL_AD_DOMAIN).then((res) => {
				setDataInStorage(STORAGE_KEY_TOTAL_AD_DOMAIN, res - 1);
			});
		}

		if (isFavorite) {
			getDataFromStorage(STORAGE_KEY_TOTAL_FAVORITES).then((res) => {
				setDataInStorage(STORAGE_KEY_TOTAL_FAVORITES, res - 1);
			});
		}

		getDataFromStorage(STORAGE_KEY_TOTAL_ADS).then((res) => {
			setDataInStorage(STORAGE_KEY_TOTAL_ADS, res - 1);
		});

		setFbAds(filteredAds);
		setDataInStorage(STORAGE_KEY_FB_AD, filteredAds).then((response) =>
			console.log("data updated")
		);
		if (specific) {
			setAllAdsOfAdvertiser(false);
		}
	};

	const [showAllAdsOfAdvertiser, setAllAdsOfAdvertiser] = useState(false);
	const [specificPagePosts, setSpecificPagePosts] = useState([]);
	const handleAdvertiserClick = (pageId) => {
		var specificPagePosts = fbAds.filter((ad) => ad.page_id === pageId);
		setSpecificPagePosts(specificPagePosts);
		setAllAdsOfAdvertiser(true);
	};

	const handleBackClick = () => {
		setAllAdsOfAdvertiser(false);
	};

	const handleNameClickInSinglePost = (pageId) => {
		handleAdvertiserClick(pageId);
	};
	return (
		<div className="App">
			<Navbar
				activeLiName={activeLiName}
				handleTotalAd={handleTotalAd}
				handleTotalAdvertisers={handleTotalAdvertisers}
				handleFavoriteAds={handleFavoriteAds}
				totalAd={totalAds}
				totalAdvertisers={totalAdsDomain}
				favoriteAds={totalFavorites}
			/>
			{showAllAdsOfAdvertiser ? (
				<AllAdsOfAdvertiser
					allAds={specificPagePosts}
					specific={true}
					handleRemoveClick={handleRemoveClick}
					handleBackClick={handleBackClick}
				/>
			) : null}

			{allAdsPage && !showAllAdsOfAdvertiser ? (
				<AdsContainer
					fbAds={fbAds}
					specific={false}
					handleRemoveClick={handleRemoveClick}
					handleNameClickInSinglePost={handleNameClickInSinglePost}
				/>
			) : null}
			{allAdvertisersPage && !showAllAdsOfAdvertiser ? (
				<AdvertiserContainer fbAds={fbAds} handleAdvertiserClick={handleAdvertiserClick} />
			) : null}
			{favoritePage && !showAllAdsOfAdvertiser ? (
				<FavoriteAdsContainer
					fbAds={fbAds}
					specific={false}
					handleRemoveClick={handleRemoveClick}
				/>
			) : null}
		</div>
	);
};

export default Options;
