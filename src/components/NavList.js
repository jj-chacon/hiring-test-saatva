import React from "react";
import NavItem from "./NavItem";

/**
 * navigation section
 */
export default class NavList extends React.Component {
	render() {
		return (
			<ul className="list-group">
				{this.props.articles.map((item, index) => (
					<NavItem
						key={index}
						image={item.urlToImage}
						title={item.title}
						index={index}
						active={index === this.props.active ? true : false}
						onUpdateActive={this.props.onUpdateActive}
					/>
				))}
			</ul>
		);
	}
}
