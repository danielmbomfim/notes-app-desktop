import styled from 'styled-components';

export const Trigger = styled.button<{ visible: boolean }>`
	position: relative;
	background-color: transparent;
	border: none;
	margin: 10px;
	margin-left: auto;
	padding: 5px 15px;
	display: ${(props) => (props.visible ? 'initial' : 'none')};
`;

export const UserOptionsContainer = styled.div`
	position: absolute;
	background-color: #fff;
	max-width: 400px;
	top: 100%;
	right: 10px;
	border-radius: 3px;
	box-shadow: 0 2px 10px rgba(0, 0, 0, 0.4);
	display: none;
`;

export const UserOption = styled.div`
	padding: 5px 10px 5px 10px;
	min-width: 100px;
	text-align: right;
	white-space: nowrap;
	border-radius: 3px;
	gap: 5px;

	&:hover {
		background-color: #dadce0;
	}
`;
