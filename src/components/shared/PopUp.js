import React from "react";

const Popup = ({ children, close }) => {
	return (
		<div id="popup-container">
			<div
				className="transparent-background"
				onClick={() => {
					close();
				}}></div>
			<div className="main-info-container">{children}</div>
		</div>
	);
};

export default Popup;
