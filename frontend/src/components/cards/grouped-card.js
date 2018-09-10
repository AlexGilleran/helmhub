import React from 'react';
import { Card } from 'material-ui/Card';
import styled from 'styled-components';

const hoc = card => styled(card)`
	&:first-child {
		margin-top: 1em;
	}

	&:last-child {
		margin-bottom: 1em;
	}
`;

export default hoc(Card);
export { hoc };
