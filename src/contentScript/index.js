import { AUTO_SCROLL_ON_MESSAGE, AUTO_SCROLL_OFF_MESSAGE, SHOW_AD_OFF_MESSAGE, SHOW_AD_ON_MESSAGE, GET_CURRENT_URL, STORAGE_KEY_AUTO_COLLECT } from "../common/constant";
import { getDataFromStorage, setDataInStorage } from "../common/storageUtil";
import { STORAGE_KEY_FB_AD, STORAGE_KEY_TODAYS_TOTAL_ADS, STORAGE_KEY_TODAYS_TOTAL_FAVORITES, STORAGE_KEY_TODAYS_TOTAL_AD_DOMAIN, STORAGE_KEY_TOTAL_ADS, STORAGE_KEY_TOTAL_FAVORITES, STORAGE_KEY_TOTAL_AD_DOMAIN, STORAGE_KEY_SETTINGS_AUTO_SCROLL, STORAGE_KEY_SETTINGS_SHOW_AD } from "../common/constant";
console.log("contentScript hello");

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

function showAdFn(from) {
    console.log(from);
    if (from === "SHOW_AD_ON_MESSAGE") {
        showAdState = true;
        var headofdoc = document.getElementsByTagName("head")[0];
        var mainCss = `
            div [data-pagelet*="FeedUnit"]{
                visibility: hidden;
            }
            .visible {
                visibility: visible;
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
        setTimeout(function () {
            console.log("timeout called");
            document.querySelectorAll('div[data-pagelet*="FeedUnit"]').forEach(function (singlePost) {
                if (singlePost.querySelector(".ad-library-box")) {
                    return;
                }

                let targetText = (singlePost.querySelector("a[aria-label='Sponsored']") ?? singlePost.querySelector("a[aria-label='label']") ?? singlePost.querySelector("a.oajrlxb2.g5ia77u1.qu0x051f.esr5mh6w.e9989ue4.r7d6kgcz.rq0escxv.nhd2j8a9.nc684nl6.p7hjln8o.kvgmc6g5.cxmmr5t8.oygrvhab.hcukyx3x.jb3vyjys.rz4wbd8a.qt6c0cv9.a8nywdso.i1ao9s8h.esuyzwwr.f1sip0of.lzcic4wl.gmql0nx0.gpro0wi8.b1v8xokw"))?.innerText;

                var filteredAd = currentAdsArray.filter((ad) => singlePost.innerHTML.includes(ad.name) || singlePost.innerHTML.includes(ad.url));

                if (checkSponsored(targetText) && filteredAd.length > 0) {
                    // this is ad post
                    singlePost.style.visibility = "visible";
                    singlePost.classList.add("visible");
                    singlePost.classList.add("ad");
                    singlePost.classList.remove("not-ad");
                    singlePost.style.display = "block";

                    console.log("filteredAd: ", filteredAd);

                    var href = `https://www.facebook.com/ads/library/?active_status=all&ad_type=all&view_all_page_id=${filteredAd?.[0].page_id}`;
                    var adLibraryLayoutDiv = document.createElement("div");
                    adLibraryLayoutDiv.innerHTML = `
						<div style="display: flex; margin: -5px;" class="ad-library-box">
							<div class="ad_library_container" style="display: flex; justify-content: center; align-items: center;">
								<a class="ad_library_button" target="_blank" href=${href} style="display: inline-block; color: #fff; background: #4362BE, padding: 5px 10px; border: 2px solid #4362BE;
								border-radius: 5px; cursor: pointer;" >
									View Ad Library
								</a>

								<span class="save_ad" style=" dispaly: flex; justify-content: center; align-items: center; background: #fff; color: #4362BE; border: 2px solid #4362BE; border-radius: 5px; padding: 5px 10px; cursor: pointer; " >
									<span class="folder_icon" style="display: inline-block;">
										<svg xmlns="http://www.w3.org/2000/svg" width="14.677" height="12.332" viewBox="0 0 14.677 12.332">
	<path id="Path_124282" data-name="Path 124282" d="M9.483,5.1H2.307a.936.936,0,0,0-.694.309.954.954,0,0,0-.242.725l.6,6.641a.943.943,0,0,0,.935.863s.865-.1,5.8,0,5.454.949,5.454.949H2.9a1.886,1.886,0,0,1-1.871-1.726l-.6-6.641A1.9,1.9,0,0,1,.757,4.973L.719,4.147A1.888,1.888,0,0,1,2.6,2.25h3.45a1.87,1.87,0,0,1,1.328.556l.778.785a1.87,1.87,0,0,0,1.329.556h3.742a1.871,1.871,0,0,1,1.388.618A1.909,1.909,0,0,1,15.1,6.216l-.937,8.366s-.748-.211-.249-5.692.249-2.761.249-2.761a.954.954,0,0,0-.242-.725.936.936,0,0,0-.693-.309ZM6.711,3.477l.667.671H2.307a1.861,1.861,0,0,0-.643.114l-.006-.133A.944.944,0,0,1,2.6,3.2h3.45a.935.935,0,0,1,.664.278Z" transform="translate(-0.427 -2.25)" fill="#434344" fill-rule="evenodd"/>
	</svg>
									</span>
									<span class="folder_tick_icon" style="display: none;">
										<svg xmlns="http://www.w3.org/2000/svg" width="18.34" height="12.332" viewBox="0 0 18.34 12.332">
	<g id="Group_13776" data-name="Group 13776" transform="translate(-530.667 -28.712)">
		<path id="Path_124282" data-name="Path 124282" d="M9.483,5.1H2.307a.936.936,0,0,0-.694.309.954.954,0,0,0-.242.725l.6,6.641a.943.943,0,0,0,.935.863h5.8v.949H2.9a1.886,1.886,0,0,1-1.871-1.726l-.6-6.641A1.9,1.9,0,0,1,.757,4.973L.719,4.147A1.888,1.888,0,0,1,2.6,2.25h3.45a1.87,1.87,0,0,1,1.328.556l.778.785a1.87,1.87,0,0,0,1.329.556h3.742a1.871,1.871,0,0,1,1.388.618A1.909,1.909,0,0,1,15.1,6.216l-.241,2.674h-.945L14.16,6.13a.954.954,0,0,0-.242-.725.936.936,0,0,0-.693-.309ZM6.711,3.477l.667.671H2.307a1.861,1.861,0,0,0-.643.114l-.006-.133A.944.944,0,0,1,2.6,3.2h3.45a.935.935,0,0,1,.664.278Z" transform="translate(530.24 26.462)" fill="#434344" fill-rule="evenodd"/>
		<g id="folder-check" transform="translate(539.682 34.261)">
		<path id="Path_124283" data-name="Path 124283" d="M32.7,22.747a.848.848,0,0,1,0,1.2l-5.085,5.085a.848.848,0,0,1-1.2,0L23.872,26.49a.849.849,0,0,1,1.2-1.2l1.943,1.944L31.5,22.747a.848.848,0,0,1,1.2,0Z" transform="translate(-23.623 -22.498)" fill="#434344" fill-rule="evenodd"/>
		</g>
	</g>
	</svg>
									</span>
									<span style="margin-left: 5px; display: inline-block;">Save Ad</span>
								</span>
							</div>
							<div style="width: 0px; height: 24px; border: 1px solid rgb(242, 243, 248); margin-left: 5px; margin-top: 10px;">
							</div>
							<div style="width: 0px; height: 24px; border: 1px solid rgb(242, 243, 248); margin-left: 2px; margin-top: 10px;"></div>
						</div>
						`;
                    var parent = singlePost.querySelector(".ll8tlv6m.j83agx80.btwxx1t3.n851cfcs.hv4rvrfc.dati1w0a.pybr56ya");
                    var child = singlePost.querySelector(".nqmvxvec.j83agx80.jnigpg78.cxgpxx05.dflh9lhu.sj5x9vvc.scb9dxdr.odw8uiq3");
                    if (singlePost.querySelectorAll(".ad_library_container").length == 0) {
                        parent.insertBefore(adLibraryLayoutDiv, child);
                    }
                } else {
                    singlePost.style.display = "none";
                    singlePost.classList.add("not-ad");
                    singlePost.classList.remove("ad");
                }
            });
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

window.addEventListener(
    "getChromeDataForAdSwipe",
    function (e) {
        getDataFromStorage(STORAGE_KEY_AUTO_COLLECT).then((response) => {
            console.log(e.detail);
            if (!response) {
                console.log("ad will not collect!!");
                return;
            } else {
                console.log("ad will collect!!");
            }
            var t = JSON.parse(e.detail);

            currentAdsArray.push(t);

            getDataFromStorage(STORAGE_KEY_FB_AD).then((response) => {
                if (response) {
                    console.log(response);
                    response = [...response, t];
                } else {
                    response = [t];
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
                        response = ++response;
                        setDataInStorage(STORAGE_KEY_TODAYS_TOTAL_AD_DOMAIN, response).then(() => {
                            console.log("Todays Total Ads domain Incremented");
                        });
                    });
                    // getDataFromStorage(STORAGE_KEY_TODAYS_TOTAL_FAVORITES).then((response)=>{
                    //     response = ++response;
                    //     setDataInStorage(STORAGE_KEY_TODAYS_TOTAL_FAVORITES, response).then(()=>{
                    //         console.log('Todays Total Ads Favorites Incremented');
                    //     })
                    // });
                    getDataFromStorage(STORAGE_KEY_TOTAL_ADS).then((response) => {
                        response = ++response;
                        setDataInStorage(STORAGE_KEY_TOTAL_ADS, response).then(() => {
                            console.log("Total Ads Incremented");
                        });
                    });
                    getDataFromStorage(STORAGE_KEY_TOTAL_AD_DOMAIN).then((response) => {
                        response = ++response;
                        setDataInStorage(STORAGE_KEY_TOTAL_AD_DOMAIN, response).then(() => {
                            console.log("Total Ads Domain Incremented");
                        });
                    });
                    // getDataFromStorage(STORAGE_KEY_TOTAL_FAVORITES).then((response)=>{
                    //     response = ++response;
                    //     setDataInStorage(STORAGE_KEY_TOTAL_FAVORITES, response).then(()=>{
                    //         console.log('Total Ads Favorites Incremented');
                    //     })
                    // });
                });
            });
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
