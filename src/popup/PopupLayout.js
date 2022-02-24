import React, { useState, useEffect } from "react";
import {
	STORAGE_KEY_SETTINGS_AUTO_SCROLL,
	STORAGE_KEY_SETTINGS_SHOW_AD,
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
	STORAGE_KEY_LAST_CHECKED_TIME,
	GET_CURRENT_URL,
} from "../common/constant";
import {
	addStorageChangeListener,
	removeStorageChangeListener,
	getDataFromStorage,
	setDataInStorage,
} from "../common/storageUtil";

const PopupLayout = () => {
	const [totalAds, setTotalAds] = useState(0);
	const [totalAdsDomain, setTotalAdsDomain] = useState(0);
	const [totalFavorites, setTotalFavorites] = useState(0);
	const [todaysTotalAds, setTodaysTotalAds] = useState(0);
	const [todaysTotalAdsDomain, setTodaysTotalAdsDomain] = useState(0);
	const [todaysTotalFavorites, setTodaysTotalFavorites] = useState(0);
	const [isDomainIsFacebook, setIsDomainIsFacebook] = useState(false);

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
	};
	useEffect(() => {
		getDataFromStorage(STORAGE_KEY_LAST_CHECKED_TIME).then((res) => {
			let currentTime = new Date().getTime();
			if (res) {
				if (new Date(currentTime).getDate() - new Date(res).getDate() > 0) {
					setDataInStorage(STORAGE_KEY_TODAYS_TOTAL_ADS, 0);
					setDataInStorage(STORAGE_KEY_TODAYS_TOTAL_AD_DOMAIN, 0);
					setDataInStorage(STORAGE_KEY_TODAYS_TOTAL_FAVORITES, 0);
				}
			}

			setDataInStorage(STORAGE_KEY_LAST_CHECKED_TIME, currentTime);
		});

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

		getDataFromStorage(STORAGE_KEY_SETTINGS_SHOW_AD).then((response) => {
			if (response) {
				document.querySelector("#s1") && (document.querySelector("#s1").checked = true);
			} else {
				document.querySelector("#s1") && (document.querySelector("#s1").checked = false);
			}
		});

		getDataFromStorage(STORAGE_KEY_SETTINGS_AUTO_SCROLL).then((response) => {
			if (response) {
				document.querySelector("#s2") && (document.querySelector("#s2").checked = true);
			} else {
				document.querySelector("#s2") && (document.querySelector("#s2").checked = false);
			}
		});

		chrome.tabs.query({ currentWindow: true, active: true }, (tabs) => {
			chrome.tabs.sendMessage(tabs[0].id, { query: GET_CURRENT_URL }, (response) => {
				console.log(response);
				if (!response && chrome.runtime.lastError) return;
				if (response?.query === GET_CURRENT_URL) {
					if (response?.url?.includes("facebook.com")) setIsDomainIsFacebook(true);
					else setIsDomainIsFacebook(false);
				}
			});
		});

		addStorageChangeListener(storageChangeListener);
		return () => removeStorageChangeListener(storageChangeListener);
	}, []);

	const handleAutoScrollSwitch = (e) => {
		if (e.target.checked) {
			setDataInStorage(STORAGE_KEY_SETTINGS_AUTO_SCROLL, true);
			chrome.runtime.sendMessage({ query: AUTO_SCROLL_ON_MESSAGE });
		} else {
			setDataInStorage(STORAGE_KEY_SETTINGS_AUTO_SCROLL, false);
			chrome.runtime.sendMessage({ query: AUTO_SCROLL_OFF_MESSAGE });
		}
	};

	const handleShowAdSwitch = (e) => {
		if (e.target.checked) {
			setDataInStorage(STORAGE_KEY_SETTINGS_SHOW_AD, true);
			chrome.runtime.sendMessage({ query: SHOW_AD_ON_MESSAGE });
		} else {
			setDataInStorage(STORAGE_KEY_SETTINGS_SHOW_AD, false);
			chrome.runtime.sendMessage({ query: SHOW_AD_OFF_MESSAGE });
		}
	};

	const handleOpenOptionPage = (e) => {
		chrome.runtime.openOptionsPage(() => {
			console.log("option page opened successfully");
		});
	};
	return (
		<>
			<div className="main-container">
				<p className="logo">
					<img alt="ad-swipe logo" src="adswipe_png.png" />
				</p>

				<p
					className="gotoFacebookLabel"
					style={isDomainIsFacebook ? { display: "none" } : { display: "" }}
				>
					Go to
					<a target="_blank" rel="noreferrer" href="https://www.facebook.com/">
						{" "}
						Facebook.com{" "}
					</a>
					to start finding ads
				</p>

				<ul
					className="firstThing"
					style={!isDomainIsFacebook ? { display: "none" } : { display: "" }}
				>
					<li>
						<input
							id="s1"
							type="checkbox"
							className="switch"
							onChange={handleShowAdSwitch}
						/>
						<label htmlFor="s1" id="showAdsLabel">
							Show Ads
						</label>
					</li>
					<li>
						<input
							id="s2"
							type="checkbox"
							className="switch"
							onChange={handleAutoScrollSwitch}
						/>
						<label htmlFor="s2" id="autoScrollLabel">
							Auto Scroll
						</label>
					</li>
				</ul>
				<div id="metrics_container">
					<div className="lifeTimeActivityContainer">
						<h3>Lifetime Activity</h3>
						<div className="three_fields">
							<div className="container adsFoundLifeTime">
								<p className="count">{totalAds}</p>
								<p>Ads Found</p>
							</div>
							<div className="container advertusersFoundLifeTime">
								<p className="count">{totalAdsDomain}</p>
								<p>Advertisers Found</p>
							</div>
							<div className="container favoriteAdsLifeTime">
								<p className="count">{totalFavorites}</p>
								<p>Favorite Ads</p>
							</div>
						</div>
					</div>
					<div className="todaysActivityContainer">
						<h3>Today's Activity</h3>
						<div className="three_fields">
							<div className="container adsFoundToday">
								<p className="count">{todaysTotalAds}</p>
								<p>Ads Found</p>
							</div>
							<div className="container advertusersFoundToday">
								<p className="count">{todaysTotalAdsDomain}</p>
								<p>Advertisers Found</p>
							</div>
							<div className="container favoriteAdsToday">
								<p className="count">{todaysTotalFavorites}</p>
								<p>Favorite Ads</p>
							</div>
						</div>
					</div>
				</div>
				<div
					id="errorField"
					style={{
						background: "#FEF4CA",
						display: "none",
						flexDirection: "row",
						color: "#6D5910",
						borderRadius: "12px",
					}}
				>
					<img
						src="info.png"
						alt="base-pic"
						style={{ padding: "10px 10px", width: "32px", height: "32px" }}
					/>
					<p style={{ fontSize: "14px", fontFamily: "Rubik" }}></p>
				</div>
				<p id="idText" style={{ display: "none" }}>
					ID:{" "}
				</p>
				<div
					className="button-switch"
					id="button-switch"
					style={{ display: "none", position: "fixed", left: "250px", top: "97px" }}
				></div>
				<p id="secondThing" onClick={handleOpenOptionPage}>
					<p id="seeCollectedAdsText">See Collected Ads</p>
				</p>
			</div>
		</>
	);
};

export default PopupLayout;
