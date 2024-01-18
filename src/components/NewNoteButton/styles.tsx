import styled from 'styled-components';

export const Container = styled.button`
	border: none;
	position: absolute;
	justify-content: center;
	align-items: center;
	right: 20px;
	bottom: 15px;
	width: 60px;
	height: 60px;
	background-color: ${(props) => props.theme.alert};
	border-radius: 40px;
	elevation: 3;
`;
