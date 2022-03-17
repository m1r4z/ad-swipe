import React from "react";
import SingleAdvertiser from "./SingleAdvertiser";

const AdvertiserContainer = ({ fbAds, handleAdvertiserClick }) => {
	return (
		<div className="advertiser-container">
			{Object.entries(
				fbAds?.reduce(
					(obj, ad) => ({ ...obj, [ad?.page_id]: [...(obj[ad?.page_id] ?? []), ad] }),
					{}
				) ?? {}
			)?.map((advertiser) => {
				return (
					<SingleAdvertiser
						key={advertiser?.[0]}
						ads={advertiser?.[1]}
						handleAdvertiserClick={handleAdvertiserClick}
					/>
				);
			})}
		</div>
	);
};

export default AdvertiserContainer;
