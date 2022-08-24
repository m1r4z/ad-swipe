const origOpen2 = XMLHttpRequest.prototype.open;
XMLHttpRequest.prototype.open = function () {
	this.addEventListener("load", function () {
		try {
			var ads = this.responseText.split("\n");
		} catch (e) {}
		try {
			ads.forEach(function (ad) {
				try {
					ad = JSON.parse(ad);
					if (
						ad.label == "CometNewsFeed_viewer$stream$CometNewsFeed_viewer_news_feed" ||
						typeof ad["data"]["viewer"]["news_feed"]["edges"][0]["category"] !==
							"undefined"
					) {
						if (
							ad.data.category == "SPONSORED" ||
							ad["data"]["viewer"]["news_feed"]["edges"][0]["category"] == "SPONSORED"
						) {
							if (ad.data.category == "SPONSORED") {
								console.log("SPONSORED");
								console.log("ad = ", ad);
								var post_id =
									ad?.["data"]?.["node"]?.["comet_sections"]?.["feedback"]?.[
										"story"
									]?.["feedback_context"]?.["feedback_target_with_context"]?.[
										"ufi_renderer"
									]?.["feedback"]?.["subscription_target_id"];
								var page_id =
									ad?.["data"]?.["node"]?.["comet_sections"]?.[
										"context_layout"
									]?.["story"]?.["comet_sections"]?.["actor_photo"]?.["story"]?.[
										"actors"
									][0]?.["id"];
								var name =
									ad?.["data"]?.["node"]?.["comet_sections"]?.[
										"context_layout"
									]?.["story"]?.["comet_sections"]?.["title"]?.["story"]?.[
										"actors"
									][0]?.["name"];
								var url =
									ad?.["data"]?.["node"]?.["comet_sections"]?.[
										"context_layout"
									]?.["story"]?.["comet_sections"]?.["title"]?.["story"]?.[
										"actors"
									][0]?.["url"];
								var text =
									ad?.["data"]?.["node"]?.["comet_sections"]?.["content"]?.[
										"story"
									]?.["comet_sections"]?.["message"]?.["story"]?.["message"]?.[
										"text"
									];
								var imageUrl =
									ad?.["data"]?.["node"]?.["comet_sections"]?.["content"]?.[
										"story"
									]?.["attachments"][0]?.["styles"]?.["attachment"]?.["media"]?.[
										"flexible_height_share_image"
									]?.["uri"];
								if (!imageUrl) {
									imageUrl =
										ad?.["data"]?.["node"]?.["comet_sections"]?.["content"]?.[
											"story"
										]?.["attachments"][0]?.["styles"]?.["attachment"]?.[
											"media"
										]?.["large_share_image"]?.["uri"];
								}
								var playableUrl =
									ad?.["data"]?.["node"]?.["comet_sections"]?.["content"]?.[
										"story"
									]?.["attachments"][0]?.["styles"]?.["attachment"]?.["media"]?.[
										"playable_url"
									];
								var playableUrlQualityHd =
									ad?.["data"]?.["node"]?.["comet_sections"]?.["content"]?.[
										"story"
									]?.["attachments"][0]?.["styles"]?.["attachment"]?.["media"]?.[
										"playable_url_quality_hd"
									];
								var footerDescriptionText =
									ad["data"]?.["node"]?.["comet_sections"]?.["content"]?.[
										"story"
									]?.["attachments"][0]?.["comet_footer_renderer"]?.[
										"attachment"
									]?.["description"]?.["text"];
								var footerDomainName =
									ad?.["data"]?.["node"]?.["comet_sections"]?.["content"]?.[
										"story"
									]?.["attachments"][0]?.["comet_footer_renderer"]?.[
										"attachment"
									]["source"]?.["text"];
								var footerTitleText =
									ad?.["data"]?.["node"]?.["comet_sections"]?.["content"]?.[
										"story"
									]?.["attachments"][0]?.["comet_footer_renderer"]?.[
										"attachment"
									]["title_with_entities"]?.["text"];
								var footerActionLink =
									ad?.["data"]?.["node"]?.["comet_sections"]?.["content"]?.[
										"story"
									]?.["attachments"][0]?.["comet_footer_renderer"]?.[
										"attachment"
									]["target"]?.["external_url"];
								var footerActionButtonName =
									ad?.["data"]?.["node"]?.["comet_sections"]?.["content"]?.[
										"story"
									]?.["attachments"][0]?.["comet_footer_renderer"]?.[
										"attachment"
									]["call_to_action_renderer"]?.["action_link"]?.[
										"stateful_title"
									];
								var likeCount =
									ad?.["data"]?.["node"]?.["comet_sections"]?.["feedback"]?.[
										"story"
									]?.["feedback_context"]?.["feedback_target_with_context"]?.[
										"ufi_renderer"
									]?.["feedback"]?.["comet_ufi_summary_and_actions_renderer"]?.[
										"feedback"
									]?.["reaction_count"]?.["count"];
								var commentCount =
									ad?.["data"]?.["node"]?.["comet_sections"]?.["feedback"]?.[
										"story"
									]?.["feedback_context"]?.["feedback_target"]?.[
										"display_comments_count"
									]?.["count"];
								var shareCount =
									ad?.["data"]?.["node"]?.["comet_sections"]?.["feedback"]?.[
										"story"
									]?.["feedback_context"]?.["feedback_target_with_context"]?.[
										"ufi_renderer"
									]?.["feedback"]?.["comet_ufi_summary_and_actions_renderer"]?.[
										"feedback"
									]?.["share_count"]?.["count"];
								var mediaType =
									ad?.["data"]?.["node"]?.["comet_sections"]?.["content"]?.[
										"story"
									]?.["attachments"][0]?.["styles"]?.["attachment"]?.["media"]?.[
										"__typename"
									];
								var thumbnailImage =
									ad?.["data"]?.["node"]?.["comet_sections"]?.["content"]?.[
										"story"
									]?.["attachments"][0]?.["styles"]?.["attachment"]?.["media"]?.[
										"thumbnailImage"
									]?.["uri"];
								var videoUrl =
									ad?.["data"]?.["node"]?.["comet_sections"]?.["content"]?.[
										"story"
									]?.["attachments"][0]?.["styles"]?.["attachment"]?.["url"];
								var actionTitle =
									ad?.["data"]?.["node"]?.["comet_sections"]?.["content"]?.[
										"story"
									]?.["attachments"][0]?.["comet_footer_renderer"]?.[
										"attachment"
									]?.["call_to_action_renderer"]?.["action_link"]?.["title"];
								var pageId =
									ad?.["data"]?.["node"]?.["comet_sections"]?.["content"]?.[
										"story"
									]?.["attachments"][0]?.["comet_footer_renderer"]?.[
										"attachment"
									]?.["call_to_action_renderer"]?.["action_link"]?.["page"]?.[
										"id"
									];
								var postUrl =
									ad?.["data"]?.["node"]?.["comet_sections"]?.[
										"context_layout"
									]?.["feedback"]?.["story"]?.["url"];
								var logoUrl =
									ad?.["data"]?.["node"]?.["comet_sections"]?.[
										"context_layout"
									]?.["story"]?.["comet_sections"]?.["actor_photo"]?.["story"]?.[
										"actors"
									][0]?.["profile_picture"]?.["uri"];
								var carouselNode =
									ad?.["data"]?.["node"]?.["comet_sections"]?.["content"]?.[
										"story"
									]?.["attachments"][0]?.["styles"]?.["attachment"]?.[
										"all_subattachments"
									];
								var footerActionLinks =
									ad?.["data"]?.["node"]?.["comet_sections"]?.["content"]?.[
										"story"
									]?.["attachments"][0]?.["comet_footer_renderer"]?.[
										"attachment"
									]?.["action_links"][0];
								var attachments =
									ad?.["data"]?.["node"]?.["comet_sections"]?.["content"]?.[
										"story"
									]?.["attachments"][0]?.["styles"]?.["attachment"]?.[
										"subattachments"
									];
								var attachmentsArrayOfObject = [];
								var date = new Date();
								if (attachments) {
									attachments.forEach(function (attachment) {
										var obj = {};
										obj["title"] = attachment?.["card_title"]?.["text"];
										obj["description"] =
											attachment?.["card_description"]?.["text"];
										obj["webLink"] =
											attachment?.["multi_share_media_card_renderer"]?.[
												"attachment"
											]?.["url"];
										obj["imageUrl"] =
											attachment?.["multi_share_media_card_renderer"]?.[
												"attachment"
											]?.["media"]?.["image"]?.["uri"];
										attachmentsArrayOfObject.unshift(obj);
									});
								}
								var thing = {
									post_id: post_id,
									page_id: page_id,
									name: name,
									url: url,
									text: text,
									imageUrl: imageUrl,
									footerDescriptionText: footerDescriptionText,
									footerDomainName: footerDomainName,
									footerTitleText: footerTitleText,
									footerActionLink: footerActionLink,
									footerActionButtonName: footerActionButtonName,
									likeCount: likeCount,
									commentCount: commentCount,
									shareCount: shareCount,
									logoUrl: logoUrl,
									mediaType: mediaType,
									thumbnailImage: thumbnailImage,
									videoUrl: videoUrl,
									actionTitle: actionTitle,
									pageId: pageId,
									postUrl: postUrl,
									carouselNode: carouselNode,
									footerActionLinks: footerActionLinks,
									isFavorite: false,
									attachmentObject: attachmentsArrayOfObject,
									date: date,
									playableUrl: playableUrl,
									playableUrlQualityHd: playableUrlQualityHd,
								};
								if (name) {
									window.dispatchEvent(
										new CustomEvent("getChromeDataForAdSwipe", {
											detail: JSON.stringify(thing),
										})
									);
								}
								console.log(thing);
								console.log(
									"**************getChromeDataForAdSwipe**********************"
								);
							} else {
								console.log("NOT SPONSORED");
							}
						} else {
						}
					}
				} catch (e) {}
			});
		} catch (e) {}
	});
	origOpen2.apply(this, arguments);
};
