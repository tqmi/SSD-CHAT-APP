import './Layout.css';
import React, { Component } from 'react';

function Layout (props){
	
	return (
		<div className="Layout">
			<div className="col-15">
			{props.left}
			</div>
			<div className="col-70">
			{props.center}
			</div>
			<div className="col-15">
			{props.right}
			</div>
		</div>
	);
	
}

export default Layout;