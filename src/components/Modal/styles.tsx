import styled from 'styled-components';

export const Overlay = styled.div`
	position: absolute;
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.5);
	z-index: 9999;
`;

export const Container = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	background-color: ${(props) => props.theme.secondary};
	border-radius: 8px;
	padding: 20px 20px;
	gap: 10px;
`;

export const Text = styled.p`
	font-size: 18px;
	color: ${(props) => props.theme.details};
`;

export const ButtonsArea = styled.div`
	display: flex;
	flex-direction: row;
	gap: 5px;
	align-self: flex-end;
`;

export const Button = styled.button`
	border: none;
	background-color: ${(props) => props.theme.alert};
	color: ${(props) => props.theme.primary};
	font-size: 14px;
	padding: 5px 14px;
	border-radius: 5px;
`;
