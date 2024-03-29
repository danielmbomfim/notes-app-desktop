import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import Header from '../../components/Header';
import notesService from '../../services/notesService';
import { EditionPageParams, PopoverOption } from '../../types';
import { Container, InputsArea, TitleInput, ContentInput } from './styles';
import FixedButton from '../../components/FixedButton';

export default function EditionPage(): React.ReactElement {
	const { id: noteId } = useParams<EditionPageParams>();
	const navigate = useNavigate();
	const [title, setTitle] = useState('');
	const [content, setContent] = useState('');
	const menuOptions: PopoverOption[] = [
		{
			label: 'Salvar alterações',
			action: updateNote
		},
		{
			label: 'Deletar anotação',
			action: removeNote
		}
	];

	useEffect(() => {
		notesService.getNote(noteId as string).then((note) => {
			setTitle(note.title);
			setContent(note.content);
		});
	}, [noteId]);

	function updateNote() {
		notesService.updateNote({
			id: noteId as string,
			title,
			content
		});
	}

	function removeNote() {
		notesService.deleteNote(noteId as string);
		navigate('/');
	}

	return (
		<Container>
			<Header
				title="Editar anotação"
				onGoBack={updateNote}
				options={menuOptions}
			/>
			<InputsArea>
				<TitleInput
					placeholder="Título"
					value={title}
					onChange={(evt) => setTitle(evt.target.value)}
				/>
				<ContentInput
					placeholder="Sua anotação"
					value={content}
					onChange={(evt) => setContent(evt.target.value)}
				/>
			</InputsArea>
			<FixedButton icon={faCheck} onClick={updateNote} />
		</Container>
	);
}
