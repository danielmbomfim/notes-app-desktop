import styled from 'styled-components';

export const Container = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	gap: 5px;
	background-color: rgba(255, 255, 255, 0.3);
	width: 240px;
	height: 40px;
	padding: 0 10px;
	margin: 10px 15px;
	border-radius: 15px;
`;

export const Input = styled.input.attrs({
	type: 'text'
})`
	flex: 1;
	background: transparent;
	border: none;
	outline: none;
	color: ${(props) => props.theme.details};
	font-size: 16px;
`;
