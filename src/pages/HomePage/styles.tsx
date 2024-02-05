import styled from 'styled-components';

export const Container = styled.main`
	display: flex;
	flex-direction: row;
	max-height: 100vh;
	overflow: hidden;
`;

export const NotesArea = styled.section`
	flex: 1;
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
	margin: 5px;
	overflow: auto;
`;

export const NoteContainer = styled.article`
	display: flex;
	flex-direction: column;
	background-color: ${(props) => props.theme.primary.main};
	height: 350px;
	margin: 10px 5px;
	border-radius: 7px;
	flex: 0.5;
	overflow: hidden;
`;

export const NoteTitle = styled.h3`
	color: ${(props) => props.theme.primary.contrastText};
	font-size: ${(props) => props.theme.fontSize.mediumTitle};
	margin: 5px 10px;
`;

export const NoteContent = styled.p`
	color: ${(props) => props.theme.primary.contrastText};
	font-size: ${(props) => props.theme.fontSize.normalText};
	margin: 5px 10px;
`;

export const EmptyListContainer = styled.section`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 100%;
	gap: 5px;
	margin-top: 40px;
`;

export const EmptyListText = styled.h3`
	color: ${(props) => props.theme.primary.main};
	font-size: ${(props) => props.theme.fontSize.mediumTitle};
	text-align: center;
`;
