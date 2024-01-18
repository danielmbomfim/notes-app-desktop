import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import database from '../../services/database';
import { Container, TitleInput, ContentInput } from './styles';
import { PopoverOption } from '../../types';

export default function NewNotePage(): React.ReactElement {
	const navigate = useNavigate();
	const [title, setTitle] = useState('');
	const [content, setContent] = useState('');
	const menuOptions: PopoverOption[] = [
		{
			label: 'Salvar anotação',
			action: saveData
		},
		{
			label: 'Descartar anotação',
			action: () => navigate('/')
		}
	];

	function saveData() {
		database.createNote({ title, content });
	}

	return (
		<>
			<Header
				title="Nova anotação"
				onGoBack={saveData}
				options={menuOptions}
			/>
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
