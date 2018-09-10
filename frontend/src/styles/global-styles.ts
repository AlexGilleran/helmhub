import { media } from "../components/grid";

export default `
	body {
		margin: 0;
		background-color: #ddd;
		font-size: 1em;
		overflow-y: scroll !important;
		overflow: hidden;
		font-family: Roboto,sans-serif;
		line-height: 1.3;

		${media.sm`
			font-size: 1.2em;
		`}
	}

	a {
		color: #337ab7;
		text-decoration: none;
		cursor: pointer;

		&:hover {
			text-decoration: underline;
		}
	}
`;
