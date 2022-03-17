import ReactDOM from "react-dom";
import {
	AUTO_SCROLL_ON_MESSAGE,
	AUTO_SCROLL_OFF_MESSAGE,
	SHOW_AD_OFF_MESSAGE,
	SHOW_AD_ON_MESSAGE,
	GET_CURRENT_URL,
	STORAGE_KEY_AUTO_COLLECT,
} from "../common/constant";
import { getDataFromStorage, setDataInStorage } from "../common/storageUtil";
import {
	STORAGE_KEY_FB_AD,
	STORAGE_KEY_TODAYS_TOTAL_ADS,
	STORAGE_KEY_TODAYS_TOTAL_FAVORITES,
	STORAGE_KEY_TODAYS_TOTAL_AD_DOMAIN,
	STORAGE_KEY_TOTAL_ADS,
	STORAGE_KEY_TOTAL_FAVORITES,
	STORAGE_KEY_TOTAL_AD_DOMAIN,
	STORAGE_KEY_SETTINGS_AUTO_SCROLL,
	STORAGE_KEY_SETTINGS_SHOW_AD,
} from "../common/constant";
import AdLibraryButtons from "./AdLibraryButtons";

var state = false;
var showAdState = false;
var currentAdsArray = [];

chrome.runtime.onMessage.addListener((request, sender, sendMessage) => {
	if (request?.query === GET_CURRENT_URL) {
		sendMessage({ ...request, url: window.location.href });
	} else if (request.query === AUTO_SCROLL_ON_MESSAGE) {
		autoScrollFn("AUTO_SCROLL_ON_MESSAGE");
	}
	if (request.query === AUTO_SCROLL_OFF_MESSAGE) {
		autoScrollFn("AUTO_SCROLL_OFF_MESSAGE");
	}
	if (request.query === SHOW_AD_ON_MESSAGE) {
		showAdFn("SHOW_AD_ON_MESSAGE");
	}
	if (request.query === SHOW_AD_OFF_MESSAGE) {
		showAdFn("SHOW_AD_OFF_MESSAGE");
	}
});

getDataFromStorage(STORAGE_KEY_SETTINGS_SHOW_AD).then((response) => {
	if (response) {
		showAdFn("SHOW_AD_ON_MESSAGE");
	}
});
getDataFromStorage(STORAGE_KEY_SETTINGS_AUTO_SCROLL).then((response) => {
	if (response) {
		autoScrollFn("AUTO_SCROLL_ON_MESSAGE");
	}
});

function checkSponsored(target) {
	console.log("target ", target);
	if (!target) {
		return false;
	}
	var text = "Sponsored";
	var j = 0;
	var flag = false;

	for (var i = 0; i < target.length; i++) {
		if (target.charAt(i).toLowerCase() == text.charAt(j).toLowerCase()) {
			if (text.charAt(j) == "d") {
				flag = true;
			}
			j++;
		}
	}
	console.log("flag ", flag);
	return flag;
}

(function showButtonsOnFeed() {
	document.querySelectorAll("div[aria-posinset]").forEach(function (singlePost) {
		//console.log("showButtonsOnFeed: I am here");
		if (singlePost.querySelector(".ad-library-box") || singlePost.querySelector(".not-ad")) {
			console.log("showButtonsOnFeed: skipping");
			return;
		}

		let targetText = (
			singlePost.querySelector("a[aria-label='Sponsored']") ??
			singlePost.querySelector("a[aria-label='label']") ??
			singlePost.querySelector(
				"a.oajrlxb2.g5ia77u1.qu0x051f.esr5mh6w.e9989ue4.r7d6kgcz.rq0escxv.nhd2j8a9.nc684nl6.p7hjln8o.kvgmc6g5.cxmmr5t8.oygrvhab.hcukyx3x.jb3vyjys.rz4wbd8a.qt6c0cv9.a8nywdso.i1ao9s8h.esuyzwwr.f1sip0of.lzcic4wl.gmql0nx0.gpro0wi8.b1v8xokw"
			)
		)?.innerText;

		var filteredAd = currentAdsArray.filter(
			(ad) => singlePost.innerHTML.includes(ad.name) || singlePost.innerHTML.includes(ad.url)
		);
		console.log("filteredAd: ", filteredAd, " checkSponsored: " + checkSponsored(targetText));

		if (checkSponsored(targetText) && filteredAd.length > 0) {
			console.log("showButtonsOnFeed: this is an ad post");

			var adLibraryLayoutDiv = document.createElement("div");
			adLibraryLayoutDiv.setAttribute("id", "ad_swipe_ad_library");
			var parent = singlePost.querySelector(
				".ll8tlv6m.j83agx80.btwxx1t3.n851cfcs.hv4rvrfc.dati1w0a.pybr56ya"
			);
			var child = singlePost.querySelector(
				".nqmvxvec.j83agx80.jnigpg78.cxgpxx05.dflh9lhu.sj5x9vvc.scb9dxdr.odw8uiq3"
			);
			if (singlePost.querySelectorAll(".ad_library_container").length == 0) {
				parent.insertBefore(adLibraryLayoutDiv, child);
			}

			ReactDOM.render(
				<AdLibraryButtons filteredAd={filteredAd} />,
				singlePost.querySelector("#ad_swipe_ad_library")
			);
		} else if (checkSponsored(targetText)) {
			console.log("showButtonsOnFeed: hiding");
			singlePost.style.display = "none";
		}
	});

	setTimeout(function () {
		console.log("timeout called");
		showButtonsOnFeed();
	}, 3000);
})();

function showAdFn(from) {
	console.log(from);
	if (from === "SHOW_AD_ON_MESSAGE") {
		showAdState = true;
		var headofdoc = document.getElementsByTagName("head")[0];
		var mainCss = `
            div [aria-posinset]{
                display: none;
            }
            .visible {
                display: block;
            }
        `;
		var s = document.createElement("style");
		s.setAttribute("type", "text/css");
		s.setAttribute("adswipe", "true");
		s.appendChild(document.createTextNode(mainCss));
		headofdoc.appendChild(s);
	}

	if (from === "SHOW_AD_OFF_MESSAGE") {
		showAdState = false;
		document.querySelectorAll("style").forEach(function (file) {
			if (file.getAttribute("adswipe")) {
				file.remove();
				window.location.reload();
			}
		});
		setTimeout(function () {
			window.location.reload();
		}, 5000);
	}

	(function showAdsOnly() {
		document.querySelectorAll("div[aria-posinset]").forEach(function (singlePost) {
			if (singlePost.querySelector(".ad-library-box")) {
				// this is ad post
				singlePost.style.visibility = "visible";
				if (!singlePost.classList.contains("visible")) {
					singlePost.classList.add("visible");
					singlePost.classList.add("ad");
					singlePost.classList.remove("not-ad");
					singlePost.style.display = "block";
				}
				return;
			} else if (singlePost.querySelector(".not-ad")) {
				return;
			}

			let targetText = (
				singlePost.querySelector("a[aria-label='Sponsored']") ??
				singlePost.querySelector("a[aria-label='label']") ??
				singlePost.querySelector(
					"a.oajrlxb2.g5ia77u1.qu0x051f.esr5mh6w.e9989ue4.r7d6kgcz.rq0escxv.nhd2j8a9.nc684nl6.p7hjln8o.kvgmc6g5.cxmmr5t8.oygrvhab.hcukyx3x.jb3vyjys.rz4wbd8a.qt6c0cv9.a8nywdso.i1ao9s8h.esuyzwwr.f1sip0of.lzcic4wl.gmql0nx0.gpro0wi8.b1v8xokw"
				)
			)?.innerText;

			var filteredAd = currentAdsArray.filter(
				(ad) =>
					singlePost.innerHTML.includes(ad.name) || singlePost.innerHTML.includes(ad.url)
			);

			console.log("filteredAd: ", filteredAd);

			if (checkSponsored(targetText) && filteredAd.length > 0) {
				// this is ad post
				singlePost.classList.add("visible");
				singlePost.style.display = "block";
				singlePost.classList.add("ad");
				singlePost.classList.remove("not-ad");
			} else {
				singlePost.style.display = "none";
				singlePost.classList.add("not-ad");
				singlePost.classList.remove("ad");
			}
		});
		setTimeout(function () {
			console.log("timeout called");
			if (showAdState) {
				showAdsOnly();
			}
		}, 3000);
	})();
}

function autoScrollFn(from) {
	if (from === "AUTO_SCROLL_ON_MESSAGE") {
		state = true;
	}
	if (from === "AUTO_SCROLL_OFF_MESSAGE") {
		state = false;
	}

	(function autoScroll() {
		window.scrollBy({
			top: 1000,
			left: 0,
			behavior: "smooth",
		});
		setTimeout(function () {
			// var height = document.documentElement.scrollHeight;
			if (state) {
				autoScroll();
			}
		}, 1000);
	})();
}

function collectFbAds(ad) {
	getDataFromStorage(STORAGE_KEY_FB_AD).then((response) => {
		let isFound, isAdDomainFound;
		response?.forEach((each) => {
			if (each?.page_id == ad?.page_id) {
				isAdDomainFound = true;
				if (each?.post_id == ad?.post_id) {
					isFound = true;
				}
			}
		});

		if (response) {
			console.log(response);

			if (!isFound) response = [...response, ad];
			else return;
		} else {
			response = [ad];
		}

		setDataInStorage(STORAGE_KEY_FB_AD, response).then(() => {
			console.log("Data inserted successfully");

			getDataFromStorage(STORAGE_KEY_TODAYS_TOTAL_ADS).then((response) => {
				response = ++response;
				setDataInStorage(STORAGE_KEY_TODAYS_TOTAL_ADS, response).then(() => {
					console.log("Todays Total Ads Incremented");
				});
			});
			getDataFromStorage(STORAGE_KEY_TODAYS_TOTAL_AD_DOMAIN).then((response) => {
				if (isAdDomainFound) return;
				response = ++response;
				setDataInStorage(STORAGE_KEY_TODAYS_TOTAL_AD_DOMAIN, response).then(() => {
					console.log("Todays Total Ads domain Incremented");
				});
			});

			getDataFromStorage(STORAGE_KEY_TOTAL_ADS).then((response) => {
				response = ++response;
				setDataInStorage(STORAGE_KEY_TOTAL_ADS, response).then(() => {
					console.log("Total Ads Incremented");
				});
			});

			getDataFromStorage(STORAGE_KEY_TOTAL_AD_DOMAIN).then((response) => {
				if (isAdDomainFound) return;
				response = ++response;
				setDataInStorage(STORAGE_KEY_TOTAL_AD_DOMAIN, response).then(() => {
					console.log("Total Ads Domain Incremented");
				});
			});
		});
	});
}

window.addEventListener("handleSaveAd", (e) => {
	let obj = JSON.parse(e?.detail);
	console.log("handleSaveAd: ", obj);

	//obj = currentAdsArray?.filter((ad) => obj?.post_id === ad?.post_id)?.[0];

	if (obj) {
		collectFbAds({ ...obj, isCollected: true });
		document.querySelector(`.folder_icon-${obj?.post_id}`).style.display = "none";
		document.querySelector(`.folder_tick_icon-${obj?.post_id}`).style.display = "inline-block";
		document.querySelector(`#save_ad_btn-${obj?.post_id}`).setAttribute("disabled", "true");
	}
});

window.addEventListener("handleFavoriteAd", (e) => {
	let obj = JSON.parse(e?.detail);
	console.log("favorite: ", obj);
	getDataFromStorage(STORAGE_KEY_TOTAL_FAVORITES).then((response) => {
		if (obj?.isFavorite) {
			response = --response;
		} else {
			response = ++response;
		}
		setDataInStorage(STORAGE_KEY_TOTAL_FAVORITES, response).then(() => {
			console.log("Total Ads Favorites changed");
		});
	});

	getDataFromStorage(STORAGE_KEY_TODAYS_TOTAL_FAVORITES).then((response) => {
		if (obj?.isFavorite) {
			response = --response;
		} else {
			response = ++response;
		}
		setDataInStorage(STORAGE_KEY_TODAYS_TOTAL_FAVORITES, response).then(() => {
			console.log("Today total Ads Favorites changed");
		});
	});

	getDataFromStorage(STORAGE_KEY_FB_AD).then((response) => {
		var newData = response.map((singleAd) => {
			if (singleAd?.post_id == obj?.post_id) {
				//console.log(`.folder_icon-${obj?.post_id}`, singleAd?.isFavorite);
				if (!singleAd?.isFavorite) {
					document.querySelector(`.folder_icon-${obj?.post_id}`).style.display = "none";
					document.querySelector(`.folder_tick_icon-${obj?.post_id}`).style.display =
						"inline-block";
					document
						.querySelector(`#save_ad_btn-${obj?.post_id}`)
						.setAttribute("disabled", "true");
				}
				return { ...singleAd, isFavorite: !singleAd?.isFavorite };
			} else {
				return singleAd;
			}
		});

		setDataInStorage(STORAGE_KEY_FB_AD, newData).then(() => {
			console.log(" data changed");
		});
	});
});

window.addEventListener(
	"getChromeDataForAdSwipe",
	(e) => {
		getDataFromStorage(STORAGE_KEY_AUTO_COLLECT).then((response) => {
			console.log("getChromeDataForAdSwipe ", e.detail);

			var t = JSON.parse(e.detail);

			if (!response) {
				console.log("ad will not collect!!");
				currentAdsArray.push({ ...t, isCollected: false });
				return;
			} else {
				currentAdsArray.push({ ...t, isCollected: true });
				console.log("ad will collect!!");
			}

			collectFbAds({ ...t, isCollected: true });
		});
	},
	!1
);

var r = document.createElement("script");
r.innerHTML =
	"\
    const origOpen2 = XMLHttpRequest.prototype.open;\
    XMLHttpRequest.prototype.open = function() {\
        this.addEventListener('load', function() {\
            try {\
                var ads = this.responseText.split(\"\\n\");\
            } catch (e) { }\
            try {\
                ads.forEach(function(ad) {\
                    try {\
                        ad = JSON.parse(ad);\
                        if (ad.label == \"CometNewsFeed_viewer$stream$CometNewsFeed_viewer_news_feed\" || typeof(ad[\"data\"][\"viewer\"][\"news_feed\"][\"edges\"][0][\"category\"]) !== \"undefined\") {\
                            if (ad.data.category == \"SPONSORED\" || ad[\"data\"][\"viewer\"][\"news_feed\"][\"edges\"][0][\"category\"] == \"SPONSORED\") {\
                                if (ad.data.category == \"SPONSORED\") {\
                                    console.log('SPONSORED');\
                                    console.log('ad = ',ad);\
                                    var post_id = ad?.['data']?.['node']?.['comet_sections']?.['feedback']?.['story']?.['feedback_context']?.['feedback_target_with_context']?.['ufi_renderer']?.['feedback']?.['subscription_target_id'];\
                                    var page_id = ad?.['data']?.['node']?.['comet_sections']?.['context_layout']?.['story']?.['comet_sections']?.['actor_photo']?.['story']?.['actors'][0]?.['id'];\
                                    var name = ad?.['data']?.['node']?.['comet_sections']?.['context_layout']?.['story']?.['comet_sections']?.['title']?.['story']?.['actors'][0]?.['name'];\
                                    var url = ad?.['data']?.['node']?.['comet_sections']?.['context_layout']?.['story']?.['comet_sections']?.['title']?.['story']?.['actors'][0]?.['url'];\
                                    var text = ad?.['data']?.['node']?.['comet_sections']?.['content']?.['story']?.['comet_sections']?.['message']?.['story']?.['message']?.['text'];\
                                    var imageUrl = ad?.['data']?.['node']?.['comet_sections']?.['content']?.['story']?.['attachments'][0]?.['styles']?.['attachment']?.['media']?.['flexible_height_share_image']?.['uri'];\
                                    if(!imageUrl){\
                                        imageUrl = ad?.['data']?.['node']?.['comet_sections']?.['content']?.['story']?.['attachments'][0]?.['styles']?.['attachment']?.['media']?.['large_share_image']?.['uri'];\
                                    }\
                                    var playableUrl = ad?.['data']?.['node']?.['comet_sections']?.['content']?.['story']?.['attachments'][0]?.['styles']?.['attachment']?.['media']?.['playable_url'];\
                                    var playableUrlQualityHd = ad?.['data']?.['node']?.['comet_sections']?.['content']?.['story']?.['attachments'][0]?.['styles']?.['attachment']?.['media']?.['playable_url_quality_hd'];\
                                    var footerDescriptionText = ad['data']?.['node']?.['comet_sections']?.['content']?.['story']?.['attachments'][0]?.['comet_footer_renderer']?.['attachment']?.['description']?.['text'];\
                                    var footerDomainName = ad?.['data']?.['node']?.['comet_sections']?.['content']?.['story']?.['attachments'][0]?.['comet_footer_renderer']?.['attachment']['source']?.['text'];\
                                    var footerTitleText = ad?.['data']?.['node']?.['comet_sections']?.['content']?.['story']?.['attachments'][0]?.['comet_footer_renderer']?.['attachment']['title_with_entities']?.['text'];\
                                    var footerActionLink = ad?.['data']?.['node']?.['comet_sections']?.['content']?.['story']?.['attachments'][0]?.['comet_footer_renderer']?.['attachment']['target']?.['external_url'];\
                                    var footerActionButtonName = ad?.['data']?.['node']?.['comet_sections']?.['content']?.['story']?.['attachments'][0]?.['comet_footer_renderer']?.['attachment']['call_to_action_renderer']?.['action_link']?.['stateful_title'];\
                                    var likeCount = ad?.['data']?.['node']?.['comet_sections']?.['feedback']?.['story']?.['feedback_context']?.['feedback_target_with_context']?.['ufi_renderer']?.['feedback']?.['comet_ufi_summary_and_actions_renderer']?.['feedback']?.['reaction_count']?.['count'];\
                                    var commentCount = ad?.['data']?.['node']?.['comet_sections']?.['feedback']?.['story']?.['feedback_context']?.['feedback_target']?.['display_comments_count']?.['count'];\
                                    var shareCount = ad?.['data']?.['node']?.['comet_sections']?.['feedback']?.['story']?.['feedback_context']?.['feedback_target_with_context']?.['ufi_renderer']?.['feedback']?.['comet_ufi_summary_and_actions_renderer']?.['feedback']?.['share_count']?.['count'];\
                                    var mediaType = ad?.['data']?.['node']?.['comet_sections']?.['content']?.['story']?.['attachments'][0]?.['styles']?.['attachment']?.['media']?.['__typename'];\
                                    var thumbnailImage = ad?.['data']?.['node']?.['comet_sections']?.['content']?.['story']?.['attachments'][0]?.['styles']?.['attachment']?.['media']?.['thumbnailImage']?.['uri'];\
                                    var videoUrl = ad?.['data']?.['node']?.['comet_sections']?.['content']?.['story']?.['attachments'][0]?.['styles']?.['attachment']?.['url'];\
                                    var actionTitle = ad?.['data']?.['node']?.['comet_sections']?.['content']?.['story']?.['attachments'][0]?.['comet_footer_renderer']?.['attachment']?.['call_to_action_renderer']?.['action_link']?.['title'];\
                                    var pageId = ad?.['data']?.['node']?.['comet_sections']?.['content']?.['story']?.['attachments'][0]?.['comet_footer_renderer']?.['attachment']?.['call_to_action_renderer']?.['action_link']?.['page']?.['id'];\
                                    var postUrl = ad?.['data']?.['node']?.['comet_sections']?.['context_layout']?.['feedback']?.['story']?.['url'];\
                                    var logoUrl = ad?.['data']?.['node']?.['comet_sections']?.['context_layout']?.['story']?.['comet_sections']?.['actor_photo']?.['story']?.['actors'][0]?.['profile_picture']?.['uri'];\
                                    var carouselNode = ad?.['data']?.['node']?.['comet_sections']?.['content']?.['story']?.['attachments'][0]?.['styles']?.['attachment']?.['all_subattachments'];\
                                    var footerActionLinks = ad?.['data']?.['node']?.['comet_sections']?.['content']?.['story']?.['attachments'][0]?.['comet_footer_renderer']?.['attachment']?.['action_links'][0];\
                                    var attachments = ad?.['data']?.['node']?.['comet_sections']?.['content']?.['story']?.['attachments'][0]?.['styles']?.['attachment']?.['subattachments'];\
                                    var attachmentsArrayOfObject = [];\
                                    var date = new Date();\
                                    if(attachments){\
                                        attachments.forEach(function(attachment){\
                                            var obj = {};\
                                            obj['title'] = attachment?.['card_title']?.['text'];\
                                            obj['description'] = attachment?.['card_description']?.['text'];\
                                            obj['webLink'] = attachment?.['multi_share_media_card_renderer']?.['attachment']?.['url'];\
                                            obj['imageUrl'] = attachment?.['multi_share_media_card_renderer']?.['attachment']?.['media']?.['image']?.['uri'];\
                                            attachmentsArrayOfObject.unshift(obj);\
                                        });\
                                    }\
                                    var thing = {\
                                        post_id: post_id,\
                                        page_id: page_id,\
                                        name: name,\
                                        url: url,\
                                        text: text,\
                                        imageUrl: imageUrl,\
                                        footerDescriptionText: footerDescriptionText,\
                                        footerDomainName: footerDomainName,\
                                        footerTitleText: footerTitleText,\
                                        footerActionLink: footerActionLink,\
                                        footerActionButtonName: footerActionButtonName,\
                                        likeCount: likeCount,\
                                        commentCount: commentCount,\
                                        shareCount: shareCount,\
                                        logoUrl: logoUrl,\
                                        mediaType: mediaType,\
                                        thumbnailImage: thumbnailImage,\
                                        videoUrl: videoUrl,\
                                        actionTitle: actionTitle,\
                                        pageId: pageId,\
                                        postUrl: postUrl,\
                                        carouselNode: carouselNode,\
                                        footerActionLinks: footerActionLinks,\
                                        isFavorite: false,\
                                        attachmentObject: attachmentsArrayOfObject,\
                                        date: date,\
                                        playableUrl: playableUrl,\
                                        playableUrlQualityHd: playableUrlQualityHd,\
                                    };\
                                    if(name){\
                                        window.dispatchEvent(new CustomEvent(\"getChromeDataForAdSwipe\", {\
                                            detail: JSON.stringify(thing)\
                                        }));\
                                    }\
                                    console.log(thing);\
                                    console.log('**************getChromeDataForAdSwipe**********************');\
                                } else {\
                                    console.log('NOT SPONSORED');\
                                }\
                            }\
                            else{\
                            }\
                        }\
                    } catch (e) { }\
                });\
            } catch (e) { }\
        });\
        origOpen2.apply(this, arguments);\
    };\
";

document.body.appendChild(r);
