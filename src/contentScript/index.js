// var token,
//     absolute_url_to_star_png = chrome.runtime.getURL("star.png"),
//     absolute_url_to_star2_png = chrome.runtime.getURL("star2.png");

// chrome.storage.local.get(["token"], function (e) {
//     token = e.token;
//     var t = document.createElement("script");
//     (t.innerHTML =
//         'let ads_endpoint = "' +
//         ads_endpoint.toString() +
//         '"; let favourite_posts_endpoint = "' +
//         favourite_posts_endpoint +
//         '";let token = "' +
//         token.toString() +
//         '";let star_url = "' +
//         absolute_url_to_star_png +
//         '"; let star2_url = "' +
//         absolute_url_to_star2_png +
//         '";'),
//         (t.innerHTML += `let time_to_check_for_posts = ${time_to_check_for_posts}; let min_amount_of_posts_to_refresh = ${min_amount_of_posts_to_refresh}; let ad_library_link = ["${ad_library_link[0]}", "${ad_library_link[1]}"];`),
//         document.body.appendChild(t);
// });

// var styles = document.createElement("style");
// styles.innerHTML =
//     ".ad_library_container{\
//         cursor: pointer;\
//         background: transparent;\
//         border: 1px solid #6046FF;\
//         box-sizing: border-box;\
//         color: #6046FF;\
//         border-radius: 12px;\
//         text-align: center;\
//         padding-top: 12px;\
//         padding-bottom: 9px;\
//         height:42px;\
//         width:133px;\
//         text-decoration: none; \
//     }\
//     .ad_library_button{\
//         font-family: Rubik;\
//         font-style: normal;\
//         font-weight: normal;\
//         font-size: 18px;\
//         line-height: 16px;\
//         text-decoration: none; \
//         color: #6046FF;\
//     }\
//     .ad_library_button:hover{\
//         text-decoration: none; \
//         color: #4229e3;\
//     }\
//     .favorites_button{\
//         background:orange;\
//         border:none;\
//         cursor: pointer;\
//         border-radius:100px;\
//         background-color:transparent;\
//     }\
//     .star_image{\
//         width:26.61px;\
//         height:25.35px;\
//     }\
// ";
// document.body.appendChild(styles),

// setTimeout(function () {
//     let e = !1,
//         t = !1;
//     var n,
//         r,
//         a,
//         o = [];
//     function s() {
//         function e(e) {
//             return e < 10 ? "0" + e : e;
//         }
//         return (d = new Date()), (dash = "-"), (colon = ":"), d.getFullYear() + dash + e(d.getMonth() + 1) + dash + e(d.getDate()) + " " + e(d.getHours()) + colon + e(d.getMinutes()) + colon + e(d.getSeconds());
//     }
//     chrome.storage.sync.get("s1", function (e) {
//         1 == e.s1 && chrome.runtime.sendMessage({ message: "showAds" });
//     });
//     chrome.storage.sync.get("s2", function (e) {
//         1 == e.s2 && chrome.runtime.sendMessage({ message: "scroll" });
//     });
//     window.addEventListener(
//         "getChromeData",
//         function (e) {
//             var t = JSON.parse(e.detail);
//             t.browser_datetime = s() + " " + new Date().toString().match(/([A-Z]+[\+-][0-9]+)/)[1];
//             t.name, t.url, t.post_id, t.page_id;
//             (t = { post_id: t.post_id, page_id: t.page_id, browser_datetime: t.browser_datetime, post_raw_data: t.post_raw_data }),
//                 fetch(ads_endpoint, { headers: { "Content-Type": "application/json", "Extension-Token": endpoint_access_token, "Extension-User-Token": token }, method: "POST", body: JSON.stringify(t) })
//                     .then((e) => e.json())
//                     .then((e) => {
//                         try {
//                             e &&
//                                 (chrome.storage.sync.set({
//                                     publications: e.publications,
//                                     advertisers: e.advertisers,
//                                     favorites: e.favorites,
//                                     todays_publications: e.todays_publications,
//                                     todays_advertisers: e.todays_advertisers,
//                                     todays_favorites: e.todays_favorites,
//                                 }),
//                                 chrome.runtime.sendMessage({ message: "metrics_were_updated" }));
//                         } catch (e) {}
//                     });
//         },
//         !1
//     );
//     window.addEventListener(
//         "stopTheScroll",
//         function () {
//             clearInterval(n), (t = !1), chrome.runtime.sendMessage({ message: "setTheFlickerInactive" });
//         },
//         !1
//     );
//     window.addEventListener(
//         "sendFavorites",
//         function (e) {
//             var t = JSON.parse(e.detail);
//             (t.browser_datetime = s() + " " + new Date().toString().match(/([A-Z]+[\+-][0-9]+)/)[1]),
//                 (url = 1 == t.state ? favourite_posts_endpoint : favourite_posts_endpoint_unsave),
//                 (t = { ad_publication: t.ad_publication, browser_datetime: t.browser_datetime }),
//                 (t = JSON.stringify(t)),
//                 fetch(url, { headers: { "Content-Type": "application/json", "Extension-Token": endpoint_access_token, "Extension-User-Token": token }, method: "POST", body: t })
//                     .then((e) => e.json())
//                     .then((e) => {
//                         try {
//                             e &&
//                                 (chrome.storage.sync.set({
//                                     publications: e.publications,
//                                     advertisers: e.advertisers,
//                                     favorites: e.favorites,
//                                     todays_publications: e.todays_publications,
//                                     todays_advertisers: e.todays_advertisers,
//                                     todays_favorites: e.todays_favorites,
//                                 }),
//                                 chrome.runtime.sendMessage({ message: "metrics_were_updated" }));
//                         } catch (e) {}
//                     });
//         },
//         !1
//     );
//     window.addEventListener(
//         "sendPayload",
//         function (e) {
//             var t = JSON.parse(e.detail);
//             t.post_id, t.page_id;
//             (t.browser_datetime = s() + " " + new Date().toString().match(/([A-Z]+[\+-][0-9]+)/)[1]),
//                 chrome.storage.local.get(["token"], function (e) {
//                     fetch(ads_endpoint, { headers: { "Content-Type": "application/json", "Extension-Token": endpoint_access_token, "Extension-User-Token": e.token }, method: "POST", body: JSON.stringify(t) })
//                         .then((e) => e.json())
//                         .then((e) => {
//                             try {
//                                 e &&
//                                     (chrome.storage.sync.set({
//                                         publications: e.publications,
//                                         advertisers: e.advertisers,
//                                         favorites: e.favorites,
//                                         todays_publications: e.todays_publications,
//                                         todays_advertisers: e.todays_advertisers,
//                                         todays_favorites: e.todays_favorites,
//                                     }),
//                                     chrome.runtime.sendMessage({ message: "metrics_were_updated" }));
//                             } catch (e) {}
//                         });
//                 });
//         },
//         !1
//     );
//     (r = document.createElement("script")),
//     ((a = document.createElement("script")).innerHTML =
//         'var seenAds = [];\
//         var statesOfTheAds = [];\
//         var firstArrayOfButtons = [];\
//         var secondArrayOfButtons = [];\
//         var showOnlyAds = false;\
//         var postsInnerHtml = [];\
//         var lastTimerId = 0;\
//         var scroll_is_on = false;\
//         function resetTheTimer(){\
//             if(lastTimerId) {\
//                 clearTimeout(lastTimerId);\
//             }\
//             lastTimerId = setTimeout(runAutoScrollChecks, time_to_check_for_posts);\
//         }\
//         function runAutoScrollChecks() {\
//             if(seenAds.length > min_amount_of_posts_to_refresh) {\
//                 window.location.reload();\
//             } else {\
//                 scroll_is_on = false;\
//                 window.dispatchEvent(new CustomEvent("stopTheScroll"));\
//             }\
//         }\
//         function wait_and_attach(each, toCheckFor, state) {\
//             setTimeout(() => {\
//                 firstArrayOfButtons.forEach((button, index) => {\
//                     try {\
//                         if (toCheckFor.includes(button.name) || toCheckFor.includes(button.url)) {\
//                             if(state) {\
//                                 each.innerHTML = toCheckFor;\
//                             }\
//                             if(scroll_is_on == true) {\
//                                 resetTheTimer();\
//                             }\
//                             var border = document.createElement("div");\
//                             border.style.width = "0px";\
//                             border.style.height = "24px";\
//                             border.style.border = "1px solid #F2F3F8";\
//                             border.style.marginLeft = "5px";\
//                             border.style.marginTop = "10px";\
//                             var border2 = document.createElement("div");\
//                             border2.style.width = "0px";\
//                             border2.style.height = "24px";\
//                             border2.style.border = "1px solid #F2F3F8";\
//                             border2.style.marginLeft = "2px";\
//                             border2.style.marginTop = "10px";\
//                             var final_div = document.createElement("div");\
//                             final_div.style.display = "flex";\
//                             final_div.style.margin = "-5px";\
//                             var parent = each.querySelector(".pybr56ya.dati1w0a.hv4rvrfc.n851cfcs.btwxx1t3.j83agx80.ll8tlv6m");\
//                             var child = each.querySelector(".nqmvxvec.j83agx80.jnigpg78.cxgpxx05.dflh9lhu.sj5x9vvc.scb9dxdr.odw8uiq3");\
//                             var btn = firstArrayOfButtons[index].button;\
//                             final_div.appendChild(btn);\
//                             final_div.appendChild(border);\
//                             firstArrayOfButtons.splice(index, 1);\
//                             var btn2 = secondArrayOfButtons[index].button;\
//                             btn2.style.marginLeft = "2px";\
//                             final_div.appendChild(btn2);\
//                             final_div.appendChild(border2);\
//                             secondArrayOfButtons.splice(index, 1);\
//                             parent.insertBefore(final_div, child);\
//                             seenAds.push(each);\
//                         }\
//                     } catch(e) {}\
//                 });\
//             }, 2500);\
//         }\
//         let scripts = document.querySelectorAll("script");\
//         scripts.forEach(function(each) {\
//             if (each.innerText.includes("subscription_target_id") && each.innerText.includes("SPONSORED")) {\
//                 var post_id = each.innerText.split("subscription_target_id")[1].split(\'"\')[2].split(\',\')[0].replace(\'"\', "");\
//                 if (post_id !== "SPONSORED") {\
//                     var name = each.innerText.split(\',"name":"\')[1].split(\'",\')[0];\
//                     var url = each.innerText.split("\\"profile_url\\":\\"")[1].replace(/\\\\/g, "").split("\\",")[0];\
//                     var page_id = each.innerText.split(\'Page","id":"\').length < 2 ? each.innerText.split(\'User","id":"\')[1].split(\'"}\')[0].split(",")[0].replace(\'"\', "") : each.innerText.split(\'Page","id":"\')[1].split(\'"}\')[0].split(",")[0].replace(\'"\', "");\
//                     var thing = {\
//                         post_id: post_id,\
//                         page_id: page_id,\
//                         post_raw_data: each.innerText\
//                     };\
//                     createAButton(post_id, page_id, false, name, url);\
//                     window.dispatchEvent(new CustomEvent("sendPayload", {\
//                         detail: JSON.stringify(thing)\
//                     }));\
//                 }\
//             }\
//         });\
//         function runACheck() {\
//             let everyPost = document.querySelectorAll(\'[data-pagelet^="FeedUnit"]\');\
//             everyPost.forEach((post) => {\
//                 var temp = post.innerHTML;\
//                 if (showOnlyAds == true) {\
//                     wait_and_attach(post, temp, true);\
//                     post.innerHTML = "";\
//                 } else {\
//                     wait_and_attach(post, post.innerHTML, false);\
//                 }\
//             });\
//         }\
//         var mutObserver11 = new MutationObserver(function(mutations) {\
//             mutations.forEach(function(mutation) {\
//                 var isAd = 0;\
//                 if (mutation.addedNodes.length < 1) return;\
//                 if (mutation.addedNodes[0].innerHTML == \'\') return;\
//                 each = mutation.addedNodes[0];\
//                 var temp = each.innerHTML;\
//                 if (showOnlyAds == true) {\
//                     wait_and_attach(each, temp, true);\
//                     each.innerHTML = "";\
//                 } else {\
//                     wait_and_attach(each, each.innerHTML, false);\
//                 }\
//             });\
//         });\
//         var feeditself = document.querySelector(\'[role="feed"]\');\
//         mutObserver11.observe(feeditself, {\
//             childList: true\
//         });\
//         runACheck();\
//         function createAButton(post_id, page_id, postState, name, url) {\
//             try {\
//                 var btn1 = document.createElement("button");\
//                 statesOfTheAds.push(!postState);\
//                 btn1.className = "favorites_button";\
//                 var lnght = seenAds.length;\
//                 var img_url = postState == false ? star_url : star2_url;\
//                 btn1.innerHTML = \'<img src=" \' + img_url + \' " class="star_image">\';\
//                 btn1.addEventListener("click", function() {\
//                     btn1.style.backgroundColor = "rgba(255, 165, 0, 0.5)";\
//                     setTimeout(function() {\
//                         btn1.style.backgroundColor = "transparent";\
//                     }, 300);\
//                     btn1.innerHTML = btn1.innerHTML == \'<img src="\' + star2_url +\'" class="star_image">\' ?  \'<img src="\' + star_url +\'" class="star_image">\' :  \'<img src="\' + star2_url +\'" class="star_image">\';\
//                     var thing = {\
//                         ad_publication: post_id,\
//                         state: statesOfTheAds[lnght]\
//                     };\
//                     window.dispatchEvent(new CustomEvent("sendFavorites", {\
//                         detail: JSON.stringify(thing)\
//                     }));\
//                     statesOfTheAds[lnght] = !statesOfTheAds[lnght];\
//                 }, false);\
//                 btn1.addEventListener("mouseenter", function(){\
//                     btn1.style.backgroundColor = "rgba(255, 165, 0, 0.1)";\
//                 }); \
//                 btn1.addEventListener("mouseleave", function(){\
//                     btn1.style.backgroundColor = "transparent";\
//                 }); \
//                 secondArrayOfButtons.push({button: btn1, url: url, name: name});\
//                 var div = document.createElement("div");\
//                 var btn = document.createElement("a");\
//                 btn.className = "ad_library_button";\
//                 div.className = "ad_library_container";\
//                 btn.innerHTML = "Ad Library";\
//                 btn.target = "_blank";\
//                 btn.href = ad_library_link[0] + page_id.toString() + ad_library_link[1];\
//                 div.appendChild(btn);\
//                 firstArrayOfButtons.push({button: div, url: url, name: name});\
//             } catch (e) {\
//             }\
//         }\
//     '),
//     (r.innerHTML =
//         "\
//         const origOpen = XMLHttpRequest.prototype.open;\
//         XMLHttpRequest.prototype.open = function() {\
//             this.addEventListener('load', function() {\
//                 try {\
//                     var ads = this.responseText.split(\"\\n\");\
//                 } catch (e) { }\
//                 try {\
//                     ads.forEach(function(ad) {\
//                         try {\
//                             ad = JSON.parse(ad);\
//                             if (ad.label == \"CometNewsFeed_viewer$stream$CometNewsFeed_viewer_news_feed\" || typeof(ad[\"data\"][\"viewer\"][\"news_feed\"][\"edges\"][0][\"category\"]) !== \"undefined\") {\
//                                 if (ad.data.category == \"SPONSORED\" || ad[\"data\"][\"viewer\"][\"news_feed\"][\"edges\"][0][\"category\"] == \"SPONSORED\") {\
//                                     if (ad.data.category == \"SPONSORED\") {\
//                                         var post_id = ad['data']['node']['comet_sections']['feedback']['story']['feedback_context']['feedback_target_with_context']['ufi_renderer']['feedback']['subscription_target_id'];\
//                                         var page_id = ad['data']['node']['comet_sections']['context_layout']['story']['comet_sections']['actor_photo']['story']['actors'][0]['id'];\
//                                         var name = ad['data']['node']['comet_sections']['context_layout']['story']['comet_sections']['title']['story']['actors'][0]['name'];\
//                                         var url = ad['data']['node']['comet_sections']['context_layout']['story']['comet_sections']['title']['story']['actors'][0]['url'];\
//                                         createAButton(\
//                                             post_id.toString(),\
//                                             page_id.toString(),\
//                                             false, \
//                                             name.toString(),\
//                                             url.toString()\
//                                         );\
//                                         var thing = {\
//                                             post_id: post_id,\
//                                             page_id: page_id,\
//                                             name: name,\
//                                             url: url,\
//                                             post_raw_data: JSON.stringify(ad)\
//                                         };\
//                                         window.dispatchEvent(new CustomEvent(\"getChromeData\", {\
//                                             detail: JSON.stringify(thing)\
//                                         }));\
//                                     } else {\
//                                         var post_id = ad['data'][\"viewer\"][\"news_feed\"][\"edges\"][0]['node']['comet_sections']['feedback']['story']['feedback_context']['feedback_target_with_context']['ufi_renderer']['feedback']['subscription_target_id'];\
//                                         var page_id = ad['data'][\"viewer\"][\"news_feed\"][\"edges\"][0]['node']['comet_sections']['context_layout']['story']['comet_sections']['actor_photo']['story']['actors'][0]['id'];\
//                                         var name = ad['data'][\"viewer\"][\"news_feed\"][\"edges\"][0]['node']['comet_sections']['context_layout']['story']['comet_sections']['title']['story']['actors'][0]['name'];\
//                                         var url = ad['data'][\"viewer\"][\"news_feed\"][\"edges\"][0]['node']['comet_sections']['context_layout']['story']['comet_sections']['title']['story']['actors'][0]['url'];\
//                                         createAButton(\
//                                             post_id.toString(),\
//                                             page_id.toString(),\
//                                             false, \
//                                             name.toString(),\
//                                             url.toString()\
//                                         );\
//                                         var thing = {\
//                                             post_id: post_id,\
//                                             page_id: page_id,\
//                                             name: name,\
//                                             url: url,\
//                                             post_raw_data: JSON.stringify(ad)\
//                                         };\
//                                         window.dispatchEvent(new CustomEvent(\"getChromeData\", {\
//                                             detail: JSON.stringify(thing)\
//                                         }));\
//                                     }\
//                                 }\
//                             }\
//                         } catch (e) { }\
//                     });\
//                 } catch (e) { }\
//             });\
//             origOpen.apply(this, arguments);\
//         };\
//     "),
//     document.body.appendChild(a),
//     document.body.appendChild(r),
//     chrome.runtime.onMessage.addListener(function (r, a, s) {
//         if ("start()" == r.message)
//             s({ status: !0 }),
//                 1 == (e = !e)
//                     ? (function () {
//                             document.querySelectorAll('[data-pagelet^="FeedUnit"]').forEach((e) => {
//                                 try {
//                                     if (e.innerHTML.includes("ad_library_container")) return;
//                                     o.forEach((t, n) => {
//                                         if (e.innerHTML.includes(t.name) || e.innerHTML.includes(t.url)) {
//                                             var r = document.createElement("div");
//                                             (r.style.width = "0px"), (r.style.height = "24px"), (r.style.border = "1px solid #F2F3F8"), (r.style.marginLeft = "5px"), (r.style.marginTop = "10px");
//                                             var a = document.createElement("div");
//                                             (a.style.width = "0px"), (a.style.height = "24px"), (a.style.border = "1px solid #F2F3F8"), (a.style.marginLeft = "2px"), (a.style.marginTop = "10px");
//                                             var s = document.createElement("div");
//                                             (s.style.display = "flex"), (s.style.margin = "-5px");
//                                             var i = e.querySelector(".pybr56ya.dati1w0a.hv4rvrfc.n851cfcs.btwxx1t3.j83agx80.ll8tlv6m"),
//                                                 d = e.querySelector(".nqmvxvec.j83agx80.jnigpg78.cxgpxx05.dflh9lhu.sj5x9vvc.scb9dxdr.odw8uiq3"),
//                                                 c = o[n].button;
//                                             s.appendChild(c), s.appendChild(r), o.splice(n, 1);
//                                             var l = secondArrayOfButtons[n].button;
//                                             (l.style.marginLeft = "2px"), s.appendChild(l), s.appendChild(a), secondArrayOfButtons.splice(n, 1), i.insertBefore(s, d);
//                                         }
//                                     });
//                                     try {
//                                         e.innerHTML.includes("ad_library_container") || (e.innerHTML = "");
//                                     } catch (e) {}
//                                 } catch (e) {}
//                             });
//                             var e = document.createElement("script");
//                             (e.innerHTML = "showOnlyAds = true;"), document.body.appendChild(e);
//                         })()
//                     : window.location.reload();
//         else if ("scroll()" == r.message) {
//             var i;
//             if ((s({ status: !0 }), 1 == (t = !t)))
//                 ((i = document.createElement("script")).innerHTML = "scroll_is_on = true;"),
//                     (n = setInterval(function () {
//                         var e,
//                             t = window.pageYOffset || document.documentElement.scrollTop;
//                         (t += ((e = 400), Math.floor(Math.random() * e) + 500)), scroll(0, t);
//                     }, 800)),
//                     (i.innerHTML += `var IntervalForScroll = ${n}`),
//                     document.body.appendChild(i);
//             else clearInterval(n), ((i = document.createElement("script")).innerHTML = "clearTimeout(lastTimerId); scroll_is_on = false;"), document.body.appendChild(i);
//         } else "check_if_present" == r.message && s({ message: "im_here" });
//     });
// }, 500);
