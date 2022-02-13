// var token = generate_a_random_token();
// function generate_a_random_token() {
//     const e = token_characters + token_symbols,
//         s = token_length;
//     let t = "";
//     for (let o = 0; o < s; o++) {
//         let s = Math.floor(Math.random() * e.length);
//         t += e.substring(s, s + 1);
//     }
//     let o = 0;
//     for (let e = 0; e < t.length; e++) token_symbols.includes(t[e]) && (o += 1);
//     if (o < min_token_symbols)
//         for (let e = token_length - min_token_symbols; e < token_length; e += 1) {
//             let s = Math.floor(Math.random() * token_symbols.length);
//             t = t.replace(t[e], token_symbols.substring(s, s + 1));
//         }
//     return t;
// }
// async function statusCheck() {
//     try {
//         let e = await fetch(status_check_endpoint, { headers: { "Content-Type": "application/json", "Extension-Token": endpoint_access_token, "Extension-User-Token": token }, method: "GET" }),
//             s = await e.json();
//         s.status
//             ? (chrome.storage.sync.set({ serverStatus: !0, serverMessage: s.message }), chrome.runtime.sendMessage({ message: "serverCheck", data: { serverStatus: !0, serverMessage: s.message } }))
//             : (chrome.storage.sync.set({ serverStatus: !1, serverMessage: "None" }), chrome.runtime.sendMessage({ message: "serverCheck", data: { serverStatus: !1, serverMessage: "None" } }));
//     } catch (e) {}
// }
// chrome.storage.sync.set({ s1: !1, s2: !1 }),
//     chrome.storage.sync.set({ publications: 0, advertisers: 0, favorites: 0, todays_publications: 0, todays_advertisers: 0, todays_favorites: 0 }),
//     chrome.storage.sync.set({ serverStatus: !1 }),
//     chrome.storage.local.get("token", function (e) {
//         e.token ? console.log(e.token) : user_token.length > token_length || user_token.length < token_length ? chrome.storage.local.set({ token: token }) : chrome.storage.local.set({ token: user_token });
//     }),
//     chrome.runtime.onMessage.addListener(function (e, s, t) {
//         "showAds" == e.message
//             ? chrome.tabs.query({ active: !0, currentWindow: !0 }, function (e) {
//                   chrome.tabs.sendMessage(e[0].id, { message: "start()" });
//               })
//             : "scroll" == e.message
//             ? chrome.tabs.query({ active: !0, currentWindow: !0 }, function (e) {
//                   chrome.tabs.sendMessage(e[0].id, { message: "scroll()" });
//               })
//             : "adsSet" == e.message
//             ? chrome.storage.local.get(["ads"], function (e) {
//                   console.log(e.ads);
//               })
//             : "dataScraped" == e.message
//             ? console.log(e.res)
//             : "metrics_were_updated" == e.message
//             ? chrome.runtime.sendMessage({ message: "update_metrics" })
//             : "setTheFlickerInactive" == e.message && (chrome.storage.sync.set({ s2: !1 }), console.log("gotten here"), chrome.runtime.sendMessage({ message: "setTheFlickerInactive" }));
//     }),
//     setInterval(statusCheck, status_check_time_period);
