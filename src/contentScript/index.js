import { AUTO_SCROLL_ON_MESSAGE, AUTO_SCROLL_OFF_MESSAGE, SHOW_AD_OFF_MESSAGE, SHOW_AD_ON_MESSAGE } from "../common/constant";
import { getDataFromStorage, setDataInStorage } from "../common/storageUtil";
import { STORAGE_KEY_FB_AD, STORAGE_KEY_TODAYS_TOTAL_ADS, STORAGE_KEY_TODAYS_TOTAL_FAVORITES, STORAGE_KEY_TODAYS_TOTAL_AD_DOMAIN, STORAGE_KEY_TOTAL_ADS, STORAGE_KEY_TOTAL_FAVORITES, STORAGE_KEY_TOTAL_AD_DOMAIN} from "../common/constant"
console.log("contentScript hello");

var state = false;
var showAdState = false;

chrome.runtime.onMessage.addListener((request, sender, sendMessage) => {
    if (request.query === AUTO_SCROLL_ON_MESSAGE) {
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

function showAdFn(from){
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
        document.querySelectorAll('style').forEach(function(file){
            if(file.getAttribute('adswipe')){
                file.remove();
                //window.location.reload();
            }
        });
        setTimeout(function(){
            //window.location.reload();
        },5000);
    }

    (function showAdsOnly(){
        setTimeout(function () {
            document.querySelectorAll('div[data-pagelet*="FeedUnit"]').forEach(function(singlePost){
                // singlePost.querySelectorAll('a').forEach(function(anchor){
                //     if(anchor.getAttribute('href').match('ads')){
                //         singlePost.style.visibility = 'visible';
                //         singlePost.classList.add('visible');
                //         singlePost.classList.add('ad');
                //         singlePost.classList.remove('not-ad');
                //         singlePost.style.display = 'block';
                //         console.log('visible', singlePost);
                //     }else{
                //         singlePost.classList.remove('visible');
                //         singlePost.style.display = 'none';
                //         singlePost.classList.add('not-ad');
                //         singlePost.classList.remove('ad');
                //         console.log('hidden');
                //     }
                // });

                //previously below code was working

                // if(singlePost.querySelector('a[aria-label="Sponsored"]')){
                //     // this is ad post
                //     singlePost.style.visibility = 'visible';
                //     singlePost.classList.add('visible');
                //     singlePost.classList.add('ad');
                //     singlePost.style.display = 'block';
                //     // console.log('visible');
                // }else{
                //     singlePost.style.display = 'none';
                //     singlePost.classList.add('not-ad');
                //     // console.log('hidden');
                // }
            });
            if (showAdState) {
                showAdsOnly();
            }
        }, 3000);
    })()
}

function autoScrollFn(from) {
    if (from === "AUTO_SCROLL_ON_MESSAGE") {
        state = true;
    }
    if (from === "AUTO_SCROLL_OFF_MESSAGE") {
        state = false;

    }

    (function autoScroll() {
        setTimeout(function () {
            var height = document.documentElement.scrollHeight;
            window.scrollBy(0, 1000);
            if (state) {
                autoScroll();
            }
        }, 1000);
    })();
}


window.addEventListener(
    "getChromeDataForAdSwipe",
    function (e) {
        console.log(e.detail);
        var t = JSON.parse(e.detail);
        getDataFromStorage(STORAGE_KEY_FB_AD).then((response)=>{
            if(response){
                console.log(response);
                response = [...response, t];
            }else{
                response = [t];
            }
            setDataInStorage(STORAGE_KEY_FB_AD, response).then(()=>{
                console.log('Data inserted successfully');

                getDataFromStorage(STORAGE_KEY_TODAYS_TOTAL_ADS).then((response)=>{
                    response = ++response;
                    setDataInStorage(STORAGE_KEY_TODAYS_TOTAL_ADS, response).then(()=>{
                        console.log('Todays Total Ads Incremented');
                    })
                });
                getDataFromStorage(STORAGE_KEY_TODAYS_TOTAL_AD_DOMAIN).then((response)=>{
                    response = ++response;
                    setDataInStorage(STORAGE_KEY_TODAYS_TOTAL_AD_DOMAIN, response).then(()=>{
                        console.log('Todays Total Ads domain Incremented');
                    })
                });
                // getDataFromStorage(STORAGE_KEY_TODAYS_TOTAL_FAVORITES).then((response)=>{
                //     response = ++response;
                //     setDataInStorage(STORAGE_KEY_TODAYS_TOTAL_FAVORITES, response).then(()=>{
                //         console.log('Todays Total Ads Favorites Incremented');
                //     })
                // });
                getDataFromStorage(STORAGE_KEY_TOTAL_ADS).then((response)=>{
                    response = ++response;
                    setDataInStorage(STORAGE_KEY_TOTAL_ADS, response).then(()=>{
                        console.log('Total Ads Incremented');
                    })
                });
                getDataFromStorage(STORAGE_KEY_TOTAL_AD_DOMAIN).then((response)=>{
                    response = ++response;
                    setDataInStorage(STORAGE_KEY_TOTAL_AD_DOMAIN, response).then(()=>{
                        console.log('Total Ads Domain Incremented');
                    })
                });
                // getDataFromStorage(STORAGE_KEY_TOTAL_FAVORITES).then((response)=>{
                //     response = ++response;
                //     setDataInStorage(STORAGE_KEY_TOTAL_FAVORITES, response).then(()=>{
                //         console.log('Total Ads Favorites Incremented');
                //     })
                // });
            });
        });

        },
    !1
);

var r = document.createElement("script");
(r.innerHTML ="\
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
")

document.body.appendChild(r)