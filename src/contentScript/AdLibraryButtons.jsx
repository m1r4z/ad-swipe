const AdLibraryButtons = ({ filteredAd }) => {
	let href = `https://www.facebook.com/ads/library/?active_status=all&ad_type=all&view_all_page_id=${filteredAd?.[0].page_id}`;

	const handleOnClickSaveAd = (e) => {
		window.dispatchEvent(
			new CustomEvent("handleSaveAd", {
				detail: JSON.stringify(filteredAd?.[0]),
			})
		);
	};

	return (
		<div style={{ display: "flex", margin: "-5px" }} className="ad-library-box">
			<div
				className="ad_library_container"
				style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
			>
				<a
					className="ad_library_button"
					target="_blank"
					href={href}
					style={{
						textDecoration: "none",
						display: "inline-block",
						color: "#fff",
						background: "#4362BE",
						padding: "5px 10px",
						border: "2px solid #4362BE",
						borderRadius: "5px",
						cursor: "pointer",
						marginRight: "10px",
						whiteSpace: "nowrap",
					}}
				>
					View Ad Library
				</a>

				<button
					id={`save_ad_btn-${filteredAd?.[0]?.post_id}`}
					onClick={handleOnClickSaveAd}
					className="save_ad"
					style={{
						dispaly: "flex",
						justifyContent: "center",
						alignItems: "center",
						background: "#fff",
						color: "#4362BE",
						border: "2px solid #4362BE",
						borderRadius: "5px",
						padding: "5px 10px",
						cursor: "pointer",
						whiteSpace: "nowrap",
					}}
					disabled={filteredAd?.[0]?.isCollected}
				>
					<span
						className={`folder_icon-${filteredAd?.[0]?.post_id}`}
						style={{ display: filteredAd?.[0]?.isCollected ? "none" : "inline-block" }}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="14.677"
							height="12.332"
							viewBox="0 0 14.677 12.332"
						>
							<path
								id="Path_124282"
								data-name="Path 124282"
								d="M9.483,5.1H2.307a.936.936,0,0,0-.694.309.954.954,0,0,0-.242.725l.6,6.641a.943.943,0,0,0,.935.863s.865-.1,5.8,0,5.454.949,5.454.949H2.9a1.886,1.886,0,0,1-1.871-1.726l-.6-6.641A1.9,1.9,0,0,1,.757,4.973L.719,4.147A1.888,1.888,0,0,1,2.6,2.25h3.45a1.87,1.87,0,0,1,1.328.556l.778.785a1.87,1.87,0,0,0,1.329.556h3.742a1.871,1.871,0,0,1,1.388.618A1.909,1.909,0,0,1,15.1,6.216l-.937,8.366s-.748-.211-.249-5.692.249-2.761.249-2.761a.954.954,0,0,0-.242-.725.936.936,0,0,0-.693-.309ZM6.711,3.477l.667.671H2.307a1.861,1.861,0,0,0-.643.114l-.006-.133A.944.944,0,0,1,2.6,3.2h3.45a.935.935,0,0,1,.664.278Z"
								transform="translate(-0.427 -2.25)"
								fill="#434344"
								fill-rule="evenodd"
							/>
						</svg>
					</span>
					<span
						className={`folder_tick_icon-${filteredAd?.[0]?.post_id}`}
						style={{ display: filteredAd?.[0]?.isCollected ? "inline-block" : "none" }}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="18.34"
							height="12.332"
							viewBox="0 0 18.34 12.332"
						>
							<g
								id="Group_13776"
								data-name="Group 13776"
								transform="translate(-530.667 -28.712)"
							>
								<path
									id="Path_124282"
									data-name="Path 124282"
									d="M9.483,5.1H2.307a.936.936,0,0,0-.694.309.954.954,0,0,0-.242.725l.6,6.641a.943.943,0,0,0,.935.863h5.8v.949H2.9a1.886,1.886,0,0,1-1.871-1.726l-.6-6.641A1.9,1.9,0,0,1,.757,4.973L.719,4.147A1.888,1.888,0,0,1,2.6,2.25h3.45a1.87,1.87,0,0,1,1.328.556l.778.785a1.87,1.87,0,0,0,1.329.556h3.742a1.871,1.871,0,0,1,1.388.618A1.909,1.909,0,0,1,15.1,6.216l-.241,2.674h-.945L14.16,6.13a.954.954,0,0,0-.242-.725.936.936,0,0,0-.693-.309ZM6.711,3.477l.667.671H2.307a1.861,1.861,0,0,0-.643.114l-.006-.133A.944.944,0,0,1,2.6,3.2h3.45a.935.935,0,0,1,.664.278Z"
									transform="translate(530.24 26.462)"
									fill="#434344"
									fill-rule="evenodd"
								/>
								<g id="folder-check" transform="translate(539.682 34.261)">
									<path
										id="Path_124283"
										data-name="Path 124283"
										d="M32.7,22.747a.848.848,0,0,1,0,1.2l-5.085,5.085a.848.848,0,0,1-1.2,0L23.872,26.49a.849.849,0,0,1,1.2-1.2l1.943,1.944L31.5,22.747a.848.848,0,0,1,1.2,0Z"
										transform="translate(-23.623 -22.498)"
										fill="#434344"
										fill-rule="evenodd"
									/>
								</g>
							</g>
						</svg>
					</span>
					<span style={{ marginLeft: "5px", display: "inline-block" }}>Save Ad</span>
				</button>
			</div>
		</div>
	);
};

export default AdLibraryButtons;
