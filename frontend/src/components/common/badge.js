import React from 'react';
import styled from 'styled-components';

const BadgeRoot = styled.span`
	display: inline-block;
	min-width: 10px;
	padding: 0.35em 0.5em 0.3em 0.5em;
	font-size: 0.45em;
	font-weight: 700;
	color: #fff;
	line-height: 1;
	vertical-align: middle;
	white-space: nowrap;
	text-align: center;
	background-color: #777;
	border-radius: 1em;
`;

export default function Badge(props) {
	return (
		<BadgeRoot>
			{props.children}
		</BadgeRoot>
	);
}