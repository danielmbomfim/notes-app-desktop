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
	background-color: ${(props) => props.theme.secondary};
	height: 350px;
	margin: 10px 5px;
	border-radius: 10px;
	flex: 0.5;
	overflow: hidden;
`;

export const NoteTitle = styled.h3`
	color: ${(props) => props.theme.details};
	font-size: 25px;
	margin: 5px 10px;
`;

export const NoteContent = styled.p`
	color: ${(props) => props.theme.details};
	font-size: 15px;
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
	color: ${(props) => props.theme.primary};
	font-size: 20px;
	text-align: center;
`;
