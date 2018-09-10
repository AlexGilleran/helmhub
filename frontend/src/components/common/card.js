import React from 'react';
import styled from 'styled-components';

import {media} from '../grid';

const Card = styled.div`
	background: #FFF;
	border-radius: 8px;
	box-shadow: 0 16px 24px 2px rgba(0,0,0,.14), 0 6px 30px 5px rgba(0,0,0,.12), 0 8px 10px -5px rgba(0,0,0,.2);
	padding: 1em 0.3em;

	${media.sm`
		margin-left: 0.5em;
		margin-right: 0.5em;
		padding: 1.5em 1em;
	`}
`;

export default (props) => {
	return (
		<Card className={props.className}>
			{props.children}
		</Card>
	);
};