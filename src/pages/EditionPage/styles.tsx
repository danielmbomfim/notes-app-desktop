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
	margin: 15px;
	padding: 10px;
	background-color: ${(props) => props.theme.primary.main};
	border-radius: 7px;
`;

export const TitleInput = styled.input.attrs({
	type: 'text'
})`
	background-color: transparent;
	border-width: 0px;
	color: ${(props) => props.theme.primary.contrastText};
	font-size: ${(props) => props.theme.fontSize.mediumTitle};
	margin: 10px 5px 15px 5px;
`;

export const ContentInput = styled.textarea`
	flex: 1;
	background-color: transparent;
	border-width: 0px;
	color: ${(props) => props.theme.primary.contrastText};
	font-size: ${(props) => props.theme.fontSize.normalText};
	margin: 5px;
	resize: none;
`;
