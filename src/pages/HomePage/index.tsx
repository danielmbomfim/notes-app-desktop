import { useState } from 'react';
import NewNoteButton from '../../components/NewNoteButton';
import {
	NotesArea,
	NoteContainer,
	NoteTitle,
	NoteContent,
	EmptyListContainer,
	EmptyListText
} from './styles';
import { Note } from '../../types';

export default function NotesPage(): React.ReactElement {
	const [notes] = useState<Note[]>([
		{ id: 1, title: 'teste', content: 'teste' }
	]);

	function _renderEmptyComponent() {
		return (
			<EmptyListContainer>
				<EmptyListText>Nenhuma anotação encontrada.</EmptyListText>
				<EmptyListText>
					Vá em frente e escreva a sua primeira anotação
				</EmptyListText>
			</EmptyListContainer>
		);
	}

	function _renderNote(item: Note): React.ReactElement {
		return (
			<NoteContainer>
				<NoteTitle>{item.title}</NoteTitle>
				<NoteContent>{item.content}</NoteContent>
			</NoteContainer>
		);
	}

	return (
		<>
			<NotesArea>
				{notes.length === 0
					? _renderEmptyComponent()
					: notes.map(_renderNote)}
			</NotesArea>
			<NewNoteButton />
		</>
	);
}
