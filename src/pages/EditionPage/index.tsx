import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../../components/Header';
import database from '../../services/database';
import { EditionPageParams } from '../../types';
import { Container, TitleInput, ContentInput } from './styles';

export default function EditionPage(): React.ReactElement {
	const params = useParams<EditionPageParams>();
	const [title, setTitle] = useState('');
	const [content, setContent] = useState('');
	console.log(title, content);

	useEffect(() => {
		database.getNote(parseInt(params.id as string)).then((note) => {
			setTitle(note.title);
			setContent(note.content);
		});
	}, [params.id]);

	function updateNote() {
		database.updateNote({
			id: parseInt(params.id as string),
			title,
			content
		});
	}

	return (
		<>
			<Header title="Editar anotação" onGoBack={updateNote} />
			<Container>
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
			</Container>
		</>
	);
}
