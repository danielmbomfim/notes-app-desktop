import styled from 'styled-components';

export const Container = styled.main`
	display: flex;
	flex-direction: column;
	height: 100vh;
`;

export const InputsArea = styled.section`
	display: flex;
	flex-direction: column;
	flex: 1;
	background-color: ${(props) => props.theme.secondary};
`;

export const TitleInput = styled.input.attrs({
	type: 'text'
})`
	background-color: transparent;
	border-width: 0px;
	color: ${(props) => props.theme.details};
	font-size: 30px;
	margin: 10px 5px 15px 5px;
	outline: none;
`;

export const ContentInput = styled.textarea`
	flex: 1;
	background-color: transparent;
	border-width: 0px;
	color: ${(props) => props.theme.details};
	font-size: 20px;
	margin: 5px;
	outline: none;
	resize: none;
`;
