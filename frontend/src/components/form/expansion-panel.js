import React from 'react';
import MaterialExpansionPanel from 'material-expansion-panel';
import styled from 'styled-components';
import IconButton from 'material-ui/IconButton';
import ActionHome from 'material-ui/svg-icons/action/home';

const ExpPanel = styled.div`
	background: #FFF;
	width: 100%;
	height: ${props => props.open ? 'auto' : '2.5em'};
	overflow: ${props => props.open ? 'auto' : 'hidden'};
	margin: ${props => props.open ? '16px 0' : '0'};
	box-shadow: 0 -1px 0 #e5e5e5, 0 0 2px rgba(0, 0, 0, 0.12), 0 1px 4px rgba(0, 0, 0, 0.24);
	border-bottom: 1px solid #e0e0e0;
	overflow: hidden;
	position: relative;
	transition: all .3s ;
`;

const Actions = styled.div`
	height: 32px;
	padding: 8px 24px 0 0;
	color: #9E9E9E;
	float: right;
`;

const Title = styled.div`
	height: 24px;
	padding: 12px 0 0 24px;
	color: #424242;
	float: left;
`;

const TitleText = styled.div`
	height: 20px;
	display: inline-block;
	font-size: 15px;
	margin-left: 16px;
	padding-top: 4px;
`;

const Icon = styled(IconButton) `
	transition: transform .3s;
	transform: ${props => props.open ? 'rotate(180deg)' : 'rotate(0deg)'};
`;

const ActionButtonBar = styled.div`
	width: 100%;
	border-top: 1px solid #e0e0e0;
	padding: 16px 0;
	
	button {
		margin-right: 8px;
	}
`;

const PanelContent = styled.div`
	padding: 16px 24px;
`;

const PanelTitle = styled.div`
	height: 48px;
	width: 100%;
	cursor: pointer;
	background: ${props => props.open ? '#EEEEEE' : 'transparent'}
`;

// const Wrapper = styled.div`
// 	.expPanel .actions {
// 	}
// 	.expPanel .title {
// 	}
// 	.expPanel .title i {
// 		float: left;
// 	}
// 	.expPanel .title .text {
// 	}
// 	.expPanel .expIcon {
// 	}
// 	.expPanel .expIcon.open {
// 	}
// 	.expPanel .actionButtonBar {
// 	}
// 	.expPanel .actionButtonBar button {
// 	}
// 	.expPanel .panelContent {
// 	}
// 	.expPanel .panelTitle {
// 	}
// 	.expPanel .panelTitle:open {
// 		background: #EEEEEE;
// 	}
// 	.clear {
// 		clear: both;
// 	}
// 	.panelExpanded .actionButtonBar button {
// 		float: right;
// 	}
// `;

export default class ExpansionPanel extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			title: this.props.title,
			expandedTitle: this.props.expandedTitle,
			open: false
		};
	}

	actionIconsClick(event, callback, additionalParams) {
		event.stopPropagation();
		if (!callback) {
			this.toggleExpand(event);
		} else {
			callback(additionalParams);
		}
	}

	toggleExpand(event) {
		event.preventDefault();
		this.setState({
			open: !this.state.open
		});
		// this.panel.classList.toggle('open');
		// this.expandButton.classList.toggle('open');
	}

	render() {
		var aIcons;
		if (this.props.actionIcons) {
			aIcons = this.props.actionIcons.map((aIcon, index) => {
				return <button key={'icon-' + index} className="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect" onClick={(event) => { this.actionIconsClick(event, aIcon.callback, aIcon.additionalParams) }}>
					<i className="material-icons">{aIcon.icon}</i>
				</button>
			});
		}
		var aButtons;
		var aButtonBar;
		if (this.props.actionButtons) {
			aButtons = this.props.actionButtons.map((button, index) => {
				return <button key={'button-' + index}
					className="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect"
					onClick={(e) => {
						if (button.toggleExpand)
							this.toggleExpand(e);
						button.callback ? button.callback(button.additionalParams) : null;
					}}>
					{button.buttonText}
				</button>;
			});
			aButtonBar = <div className="actionButtonBar">
				{aButtons}
				<div className="clear"></div>
			</div>;
		}
		return (
			<ExpPanel open={this.state.open} ref={(panel) => { this.panel = panel }}>
				<PanelTitle onClick={(event) => { this.toggleExpand(event) }}>
					<Title>
						{/*<i className="material-icons">{this.props.titleIcon}</i>*/}
						<TitleText>
							{this.state.open ? this.state.title : this.state.expandedTitle}
						</TitleText>
					</Title>
					<Actions>
						{aIcons}

						<Icon
							open={this.state.open}
							onClick={(event) => { this.actionIconsClick(event) }}
							ref={(expand) => { this.expandButton = expand }}
						>
							<ActionHome />
						</Icon>
						{/*<button className="expIcon" onClick={(event) => { this.actionIconsClick(event) }} ref={(expand) => { this.expandButton = expand }}>
								<i className="material-icons">expand_more</i>
							</button>*/}
					</Actions>
				</PanelTitle>
				<div>
					<PanelContent>
						{this.props.children}
					</PanelContent>
					{aButtonBar}
				</div>
			</ExpPanel>
		);
	}
}