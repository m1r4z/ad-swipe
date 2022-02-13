let ads_endpoint = "https://app.adsaver.io/api/ad_publications/insert/";
let favourite_posts_endpoint = "https://app.adsaver.io/api/ad_publications/favorites/save/";
let favourite_posts_endpoint_unsave = "https://app.adsaver.io/api/ad_publications/favorites/unsave/";
let endpoint_access_token = "sdfkljsbdfgoipoasji2318743460r9edlfgjhpre896544534854368tfd34lfgkjbpfgepofdgsoidfsopdfjspodfjsidfjgphjmweorwjeoir5487623423jkdflgdkf874538953459834";
let token_characters = `0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz`; // list of all characters allowed in token
let token_symbols = `^_-`; // list of all symbols allowed in token
let token_length = 12; // user token length
let min_token_symbols = 2; // minimal ammount of symbols to include in the token
let user_token = ""; // must be exactly (token_length) characters long.
// after changing this parameter(user_token). reinstall the extension
let status_check_endpoint = 'https://app.adsaver.io/api/system_status/';
let status_check_time_period = 60000; // time in milliseconds before every status check.
let dashboard_link = "https://app.adsaver.io/?user_token=";
var ad_library_link = ["https://www.facebook.com/ads/library/?active_status=all&ad_type=all&country=ALL&view_all_page_id=", "&sort_data[direction]=desc&sort_data[mode]=relevancy_monthly_grouped&search_type=page"];
// 1 minute = 60,000 ms.
let time_to_check_for_posts = 60000; // time in milliseconds before every posts auto-scroll check.
let min_amount_of_posts_to_refresh = 5; // amount of posts on the web-page needed for the page to be refreshed when auto-scrolling when there are no more adverts
