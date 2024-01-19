import styled from 'styled-components';

export const Container = styled.button`
	border: none;
	position: fixed;
	justify-content: center;
	align-items: center;
	right: 25px;
	bottom: 25px;
	width: 60px;
	height: 60px;
	background-color: ${(props) => props.theme.alert};
	border-radius: 40px;
`;
