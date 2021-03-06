import React from "react";

import {SimpleTopAppBar, TopAppBarFixedAdjust} from "@rmwc/top-app-bar";
import '@material/top-app-bar/dist/mdc.top-app-bar.css';
import '@material/icon-button/dist/mdc.icon-button.css';

import '@rmwc/icon/icon.css';

export const AppBar = (props) => {
	return (
		<div>
			<SimpleTopAppBar
				title={<span>Quicker Picker Upper</span>}
				navigationIcon
				onNav={props.toggleDrawer}
				className={["AppBar"]}
				fixed
			/>
			<TopAppBarFixedAdjust/>
		</div>
	);
};
