import React from "react";

/**
 * Navigation item
 */
export default class NavItem extends React.Component {
	constructor(props) {
		super(props);
		this.state = { rollover: false };
	}

	changeActive = () => {
		if (!this.props.active) {
			this.props.onUpdateActive(this.props.index);
		}
	};

	onOver = () => {
		this.setState(state => {
			return { rollover: true };
		});
	};

	onOut = () => {
		this.setState(state => {
			return { rollover: false };
		});
	};

	render() {
		return (
			<li
				className="list-group-item bgImg menu-item"
				style={{
					backgroundImage: this.props.active
						? "url(" + this.props.image + ")"
						: ""
				}}
			>
				<div
					style={{
						backgroundImage: this.state.rollover
							? "url(" + this.props.image + ")"
							: ""
					}}
					className="h-100 bgImg "
					onClick={this.changeActive}
					onMouseOver={this.onOver}
					onMouseOut={this.onOut}
				>
					<div className="row txt h-100 justify-content-center align-items-center darken-overlay">
						{this.props.title}
					</div>
				</div>
			</li>
		);
	}
}
