import styled from 'styled-components';

export const Container = styled.nav`
	display: flex;
	background-color: ${(props) => props.theme.primary.main};
	height: 50px;
	align-items: center;
	color: ${(props) => props.theme.primary.contrastText};
	font-size: ${(props) => props.theme.fontSize.mediumTitle};
`;

export const Button = styled.button`
	background-color: transparent;
	border: none;
	align-items: center;
	margin: 0 8px;
`;
