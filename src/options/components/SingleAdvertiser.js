import React from "react";

const SingleAdvertiser = ({ ads, handleAdvertiserClick }) => {
	return (
		<div
			className="singleAdvertiser"
			style={{ cursor: "pointer" }}
			onClick={() => handleAdvertiserClick(ads?.[0]?.page_id)}
		>
			<div className="profileContainer">
				<img src={ads?.[0]?.logoUrl} alt="profile pic" />
				<span className="title">
					<span>{ads?.[0]?.name}</span>
				</span>
			</div>
			<div className="adsContainer">
				<span className="count">{ads?.length}</span>
				<span className="text">Ads Found</span>
			</div>
		</div>
	);
};

export default SingleAdvertiser;
