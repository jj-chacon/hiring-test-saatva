import React from "react";
import NavList from "./NavList";
import ContentPage from "./ContentPage";
import { Collapse } from "reactstrap";

/**
 *  use proxy to return CORS aws
 */
export const fetchArticles = () => {
	return fetch(
		"http://chaconjulio.com/proxy/index.php?url=https://s3-us-west-2.amazonaws.com/saatva-hiring/news.json"
	).then(response => {
		return response.json();
	});
};

/**
 *  debounce functions
 */
const debounce = (fn, delay) => {
	var timer = null;
	return function() {
		var context = this,
			args = arguments;
		clearTimeout(timer);
		timer = setTimeout(function() {
			fn.apply(context, args);
		}, delay);
	};
};

/**
 *  The page layout and loading of data
 */
export default class Page extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			isLoaded: false,
			articles: [],
			current: null,
			mobileCollapsed: true,
			isMobile: null
		};
		this.toggle = this.toggle.bind(this);
		this.onUpdateActive = this.onUpdateActive.bind(this);
		this.onResize = this.onResize.bind(this);
	}

	toggle = () => {
		this.setState({ mobileCollapsed: !this.state.mobileCollapsed });
	};

	onUpdateActive = idx => {
		this.setState({ current: idx });
		if (this.state.isMobile) {
			this.setState({ mobileCollapsed: false });
		}
	};

	componentDidMount() {
		fetchArticles().then(json => {
			this.setState({
				isLoaded: true,
				articles: json.articles,
				current: 0,
				mobileCollapsed: true,
				isMobile: window.innerWidth <= 760
			});
		});

		window.addEventListener("resize", debounce(this.onResize, 300));
	}

	componentWillUnmount() {
		window.removeEventListener("resize", debounce(this.onResize, 300));
	}

	onResize() {
		let currIsMobile = window.innerWidth <= 760;
		if (currIsMobile !== this.state.isMobile) {
			console.log("changing");
			this.setState({ isMobile: window.innerWidth <= 760 });
		}

		if (!currIsMobile && !this.state.mobileCollapsed) {
			this.toggle();
		}

		if (currIsMobile && this.state.mobileCollapsed) {
			this.toggle();
		}
	}

	render() {
		return (
			<div>
				<header className="navbar navbar-expand-lg fixed-top navbar-dark bg-dark">
					<span className="navbar-brand">SAATVA NEWS </span>
					<div className="">
						{this.state.isMobile && (
							<div
								className="navbar-toggler"
								onClick={this.toggle}
							>
								<span className="navbar-toggler-icon"></span>
							</div>
						)}
					</div>
				</header>

				<div className="container-fluid">
					<div className="row flex-xl-nowrap">
						<div className="col-12 col-md-3 col-xl-3 page-sidebar">
							<div className="scroller">
								<Collapse isOpen={this.state.mobileCollapsed}>
									{this.state.articles.length > 0 && (
										<NavList
											articles={this.state.articles}
											active={this.state.current}
											onUpdateActive={this.onUpdateActive}
										/>
									)}
								</Collapse>
							</div>
						</div>

						<div className="col-12 col-md-9 col-xl-9 page-content">
							{this.state.articles.length > 0 && (
								<ContentPage
									content={
										this.state.articles[this.state.current]
									}
								/>
							)}
						</div>
					</div>
				</div>
			</div>
		);
	}
}
