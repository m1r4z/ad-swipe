// function update_metrics() {
//     chrome.storage.sync.get(["publications"], function (e) {
//         (document.getElementById("ads_found_metric").innerHTML = numberWithCommas(e.publications)),
//             (document.getElementById("ads_found_metric").style.left = (4 - 0.4 * (document.getElementById("ads_found_metric").innerHTML.length - 1)).toString() + "em");
//     }),
//         chrome.storage.sync.get(["todays_publications"], function (e) {
//             (document.getElementById("ads_found_today_metric").innerHTML = numberWithCommas(e.todays_publications)),
//                 (document.getElementById("ads_found_today_metric").style.left = (4 - 0.4 * (document.getElementById("ads_found_today_metric").innerHTML.length - 1)).toString() + "em");
//         }),
//         chrome.storage.sync.get(["advertisers"], function (e) {
//             (document.getElementById("advertisers_found_metric").innerHTML = numberWithCommas(e.advertisers)),
//                 (document.getElementById("advertisers_found_metric").style.left = (11 - 0.2 * (document.getElementById("advertisers_found_metric").innerHTML.length - 1)).toString() + "em");
//         }),
//         chrome.storage.sync.get(["todays_advertisers"], function (e) {
//             (document.getElementById("advertisers_found_today_metric").innerHTML = numberWithCommas(e.todays_advertisers)),
//                 (document.getElementById("advertisers_found_today_metric").style.left = (11 - 0.2 * (document.getElementById("advertisers_found_today_metric").innerHTML.length - 1)).toString() + "em");
//         }),
//         chrome.storage.sync.get(["favorites"], function (e) {
//             (document.getElementById("favorite_ads_metric").innerHTML = numberWithCommas(e.favorites)),
//                 (document.getElementById("favorite_ads_metric").style.left = (18 - 0.2 * (document.getElementById("favorite_ads_metric").innerHTML.length - 1)).toString() + "em");
//         }),
//         chrome.storage.sync.get(["todays_favorites"], function (e) {
//             (document.getElementById("favorite_ads_today_metric").innerHTML = numberWithCommas(e.todays_favorites)),
//                 (document.getElementById("favorite_ads_today_metric").style.left = (18 - 0.2 * (document.getElementById("favorite_ads_today_metric").innerHTML.length - 1)).toString() + "em");
//         });
// }
// function alertTheUser(e) {
//     (document.getElementsByTagName("body")[0].style.height = "600px"),
//         (document.getElementById("idText").style.top = "575px"),
//         (document.getElementById("errorField").style.display = "flex"),
//         e.length < 56
//             ? (document.getElementById("errorField").childNodes[1].innerHTML = e)
//             : ((document.getElementById("errorField").childNodes[1].innerHTML = e), (document.getElementById("errorField").childNodes[1].style.marginTop = "4px"));
// }
// function numberWithCommas(e) {
//     return e.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
// }
// document.addEventListener("DOMContentLoaded", function () {
//     console.log(new Date()),
//         chrome.tabs.query({ active: !0, currentWindow: !0 }, function (e) {
//             chrome.tabs.sendMessage(e[0].id, { message: "check_if_present" }, function (t) {
//                 if (chrome.runtime.lastError || e[0].url.split("//")[1].split("www.facebook.com")[1].length > 2)
//                     return (
//                         chrome.storage.local.get(["token"], function (e) {
//                             document.getElementById("secondThing") && (document.getElementById("secondThing").href = dashboard_link + e.token),
//                                 (document.getElementById("idText").innerHTML += e.token),
//                                 (document.getElementById("idText").style.left = (28 - 1.2 * e.token.length).toString() + "em");
//                         }),
//                         chrome.storage.sync.get(["publications"], function (e) {
//                             (document.getElementById("ads_found_metric").innerHTML = numberWithCommas(e.publications)),
//                                 (document.getElementById("ads_found_metric").style.left = (4 - 0.4 * (document.getElementById("ads_found_metric").innerHTML.length - 1)).toString() + "em");
//                         }),
//                         chrome.storage.sync.get(["serverStatus", "serverMessage"], function (e) {
//                             e.serverStatus && alertTheUser(e.serverMessage);
//                         }),
//                         chrome.storage.sync.get(["todays_publications"], function (e) {
//                             (document.getElementById("ads_found_today_metric").innerHTML = numberWithCommas(e.todays_publications)),
//                                 (document.getElementById("ads_found_today_metric").style.left = (4 - 0.4 * (document.getElementById("ads_found_today_metric").innerHTML.length - 1)).toString() + "em");
//                         }),
//                         chrome.storage.sync.get(["advertisers"], function (e) {
//                             (document.getElementById("advertisers_found_metric").innerHTML = numberWithCommas(e.advertisers)),
//                                 (document.getElementById("advertisers_found_metric").style.left = (11 - 0.2 * (document.getElementById("advertisers_found_metric").innerHTML.length - 1)).toString() + "em");
//                         }),
//                         chrome.storage.sync.get(["todays_advertisers"], function (e) {
//                             (document.getElementById("advertisers_found_today_metric").innerHTML = numberWithCommas(e.todays_advertisers)),
//                                 (document.getElementById("advertisers_found_today_metric").style.left = (11 - 0.2 * (document.getElementById("advertisers_found_today_metric").innerHTML.length - 1)).toString() + "em");
//                         }),
//                         chrome.storage.sync.get(["favorites"], function (e) {
//                             (document.getElementById("favorite_ads_metric").innerHTML = numberWithCommas(e.favorites)),
//                                 (document.getElementById("favorite_ads_metric").style.left = (18 - 0.2 * (document.getElementById("favorite_ads_metric").innerHTML.length - 1)).toString() + "em");
//                         }),
//                         chrome.storage.sync.get(["todays_favorites"], function (e) {
//                             (document.getElementById("favorite_ads_today_metric").innerHTML = numberWithCommas(e.todays_favorites)),
//                                 (document.getElementById("favorite_ads_today_metric").style.left = (18 - 0.2 * (document.getElementById("favorite_ads_today_metric").innerHTML.length - 1)).toString() + "em"),
//                                 (document.getElementById("metrics_container").style.display = "block"),
//                                 (document.getElementById("logo").style.display = "block");
//                         }),
//                         (document.getElementById("firstThing").style.display = "none"),
//                         (document.getElementById("showAdsLabel").style.display = "none"),
//                         void (document.getElementById("autoScrollLabel").style.display = "none")
//                     );
//                 !chrome.runtime.lastError &&
//                     e[0].url.split("//")[1].split("www.facebook.com")[1].length < 2 &&
//                     (chrome.storage.local.get(["token"], function (e) {
//                         document.getElementById("secondThing") && (document.getElementById("secondThing").href = dashboard_link + e.token),
//                             (document.getElementById("idText").innerHTML += e.token),
//                             (document.getElementById("idText").style.left = (28 - 1.2 * e.token.length).toString() + "em");
//                     }),
//                     chrome.storage.sync.get(["serverStatus", "serverMessage"], function (e) {
//                         e.serverStatus && alertTheUser(e.serverMessage);
//                     }),
//                     chrome.storage.sync.get(["s1"], function (e) {
//                         console.log(e.s1), (document.getElementById("s1").checked = e.s1);
//                     }),
//                     chrome.storage.sync.get(["s2"], function (e) {
//                         console.log(e.s2),
//                             (document.getElementById("s2").checked = e.s2),
//                             (document.getElementById("firstThing").style.display = "flex"),
//                             document.getElementById("secondThing") && (document.getElementById("secondThing").style.display = "block");
//                     }),
//                     chrome.storage.sync.get(["publications"], function (e) {
//                         (document.getElementById("ads_found_metric").innerHTML = numberWithCommas(e.publications)),
//                             (document.getElementById("ads_found_metric").style.left = (4 - 0.4 * (document.getElementById("ads_found_metric").innerHTML.length - 1)).toString() + "em");
//                     }),
//                     chrome.storage.sync.get(["todays_publications"], function (e) {
//                         (document.getElementById("ads_found_today_metric").innerHTML = numberWithCommas(e.todays_publications)),
//                             (document.getElementById("ads_found_today_metric").style.left = (4 - 0.4 * (document.getElementById("ads_found_today_metric").innerHTML.length - 1)).toString() + "em");
//                     }),
//                     chrome.storage.sync.get(["advertisers"], function (e) {
//                         (document.getElementById("advertisers_found_metric").innerHTML = numberWithCommas(e.advertisers)),
//                             (document.getElementById("advertisers_found_metric").style.left = (11 - 0.2 * (document.getElementById("advertisers_found_metric").innerHTML.length - 1)).toString() + "em");
//                     }),
//                     chrome.storage.sync.get(["todays_advertisers"], function (e) {
//                         (document.getElementById("advertisers_found_today_metric").innerHTML = numberWithCommas(e.todays_advertisers)),
//                             (document.getElementById("advertisers_found_today_metric").style.left = (11 - 0.2 * (document.getElementById("advertisers_found_today_metric").innerHTML.length - 1)).toString() + "em");
//                     }),
//                     chrome.storage.sync.get(["favorites"], function (e) {
//                         (document.getElementById("favorite_ads_metric").innerHTML = numberWithCommas(e.favorites)),
//                             (document.getElementById("favorite_ads_metric").style.left = (18 - 0.2 * (document.getElementById("favorite_ads_metric").innerHTML.length - 1)).toString() + "em");
//                     }),
//                     chrome.storage.sync.get(["todays_favorites"], function (e) {
//                         (document.getElementById("favorite_ads_today_metric").innerHTML = numberWithCommas(e.todays_favorites)),
//                             (document.getElementById("favorite_ads_today_metric").style.left = (18 - 0.2 * (document.getElementById("favorite_ads_today_metric").innerHTML.length - 1)).toString() + "em"),
//                             (document.getElementById("metrics_container").style.display = "block"),
//                             (document.getElementById("logo").style.display = "block");
//                     }),
//                     document.getElementById("s1").addEventListener("click", function () {
//                         chrome.runtime.sendMessage({ message: "showAds" }),
//                             chrome.storage.sync.get(["s1"], function (e) {
//                                 console.log(e.s1), chrome.storage.sync.set({ s1: !e.s1 });
//                             });
//                     }),
//                     document.getElementById("s2").addEventListener("click", function () {
//                         chrome.runtime.sendMessage({ message: "scroll" }),
//                             chrome.storage.sync.get(["s2"], function (e) {
//                                 console.log(e.s2), chrome.storage.sync.set({ s2: !e.s2 });
//                             });
//                     }),
//                     (document.getElementById("gotoFacebookLabel").style.display = "none"),
//                     (document.getElementById("button-switch").style.display = "block"));
//             });
//         });
// }),
//     chrome.runtime.onMessage.addListener(function (e, t, n) {
//         "update_metrics" == e.message || "metrics_were_updated" == e.message
//             ? update_metrics()
//             : "serverCheck" == e.message
//             ? e.data.serverStatus && alertTheUser(e.data.serverMessage)
//             : "setTheFlickerInactive" == e.message
//             ? (console.log("gotten here!"), chrome.storage.sync.set({ s2: !1 }), (document.getElementById("s2").checked = !1))
//             : (console.log(e.message), (document.getElementById("errorField").childNodes[1].innerHTML = "Something went wrong.. Refresh the popup.."));
//     });





// const storageChangeListener = (changes, area) => {
// 		console.log(changes, area);
// 		if (area === "local" && changes[STORAGE_KEY_GET_PROGRESS]) {
// 			setProgressData(changes[STORAGE_KEY_GET_PROGRESS]?.newValue?.results);
// 		} else if (area === "local" && changes[STORAGE_KEY_GET_RESULT]) {
// 			setResults(changes[STORAGE_KEY_GET_RESULT]?.newValue?.results);
// 		}
// 	};

// 	useEffect(() => {
// 		//console.log("miraz");
// 		addStorageChangeListener(storageChangeListener);
// 		return () => removeStorageChangeListener(storageChangeListener);
// 	}, []);