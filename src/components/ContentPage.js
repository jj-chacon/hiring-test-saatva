import React from "react";
import Moment from "react-moment";

export default class ContentPage extends React.Component {
	render() {
		return (
			<article>
				<div className="container-fluid">
					<div className="row">
						<div className="col-sm">
							<h1 className="header">
								{" "}
								{this.props.content.title}
							</h1>
						</div>
					</div>
					<div className="row">
						<div className="col-sm">
							<div className="p-3">
								{" "}
								<p>{this.props.content.description}</p>
							</div>
						</div>
					</div>
					<div className="row hero d-flex justify-content-center">
						<img
							src={this.props.content.urlToImage}
							className="img-thumbnail"
							alt={this.props.content.title}
						/>
					</div>
					<div className="row">
						<div className="col-sm">
							<div className="author">
								<p>
									{this.props.content.author} <br />
									<Moment
										parse="YYYY-MM-DD"
										format="MMMM D, YYYY"
									>
										{" "}
										{this.props.content.publishedAt}{" "}
									</Moment>
								</p>
							</div>
						</div>
					</div>

					<div className="row">
						<div
							className="col-sm"
							dangerouslySetInnerHTML={{
								__html: this.props.content.long_description
							}}
						/>
					</div>
				</div>
			</article>
		);
	}
}
