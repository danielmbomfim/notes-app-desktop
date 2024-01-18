import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import FixedButton from '../../components/FixedButton';
import database from '../../services/database';
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
	const navigate = useNavigate();
	const [notes, setNotes] = useState<Note[]>([]);

	useEffect(() => {
		database.getNotes().then(setNotes);
	}, []);

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
			<NoteContainer
				key={item.id}
				onClick={() => navigate(`edition-page/${item.id}`)}
			>
				<NoteTitle>{item.title}</NoteTitle>
				<NoteContent>{item.content}</NoteContent>
			</NoteContainer>
		);
	}

	return (
		<main>
			<NotesArea>
				{notes.length === 0
					? _renderEmptyComponent()
					: notes.map(_renderNote)}
			</NotesArea>
			<FixedButton
				icon={faPlus}
				onClick={() => navigate('/new-notes-page')}
			/>
		</main>
	);
}
