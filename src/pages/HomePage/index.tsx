import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import Sidebar from '../../components/Sidebar';
import FixedButton from '../../components/FixedButton';
import database from '../../services/notesService';
import { useAuth } from '../../contexts/authContext';
import {
	Container,
	NotesArea,
	NoteContainer,
	NoteTitle,
	NoteContent,
	EmptyListContainer,
	EmptyListText
} from './styles';
import { Note, QueryParams } from '../../types';

export default function NotesPage(): React.ReactElement {
	const navigate = useNavigate();
	const { logged } = useAuth();
	const [notes, setNotes] = useState<Note[]>([]);
	const [searchText, setSearchText] = useState('');

	useEffect(() => {
		if (!logged) {
			setNotes([]);
			return;
		}

		const settings: QueryParams = {};

		if (searchText.length >= 3) {
			settings.text = searchText;
		}

		database.getNotes(settings).then(setNotes);
	}, [searchText, logged]);

	function _renderEmptyComponent() {
		return (
			<EmptyListContainer>
				<EmptyListText>Nenhuma anotação encontrada.</EmptyListText>
				{searchText.length === 0 && (
					<EmptyListText>
						Vá em frente e escreva a sua primeira anotação
					</EmptyListText>
				)}
			</EmptyListContainer>
		);
	}

	function _renderNote(item: Note): React.ReactElement {
		return (
			<NoteContainer
				key={item.id}
				onClick={() => navigate(`edition-page/${item.id}`)}
			>
				<NoteTitle>{item.title || 'Rascunho'}</NoteTitle>
				<NoteContent>{item.content}</NoteContent>
			</NoteContainer>
		);
	}

	return (
		<Container>
			<Sidebar
				onSearchTextChange={(evt) => setSearchText(evt.target.value)}
			/>
			{notes.length === 0 && _renderEmptyComponent()}
			{notes.length !== 0 && (
				<NotesArea>{notes.map(_renderNote)}</NotesArea>
			)}
			<FixedButton
				disabled={!logged}
				icon={faPlus}
				onClick={() => navigate('/new-notes-page')}
			/>
		</Container>
	);
}
