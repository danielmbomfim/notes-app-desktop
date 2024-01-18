import styled from 'styled-components';

export const Container = styled.nav`
	display: flex;
	background-color: ${(props) => props.theme.primary};
	height: 50px;
	align-items: center;
	color: ${(props) => props.theme.details};
	font-size: 20px;
`;

export const Button = styled.button`
	background-color: transparent;
	border: none;
	align-items: center;
	margin: 0 8px;
`;
