import './Layout.css';
import React, { Component } from 'react';

class Layout extends Component{
	render() {
		return (
		  <div className="Layout">
			  <div className="col-15">
			  {this.props.left}
			  </div>
			  <div className="col-70">
			  {this.props.center}
			  </div>
			  <div className="col-15">
			  {this.props.right}
			  </div>
		  </div>
		);
	  }
}

export default Layout;